import { useState, useEffect } from 'react';
import get from 'lodash/get';

function getValidationMessages(value, validate, isEmpty) {
  if (typeof validate !== 'function' || isEmpty) {
    return [[], []];
  }
  const validationResult = validate(value);
  if (Array.isArray(validationResult)) {
    if (validationResult.length > 1 && Array.isArray(validationResult[0])) {
      return validationResult;
    }
    return [validationResult, []];
  }
  return validationResult ? [[validationResult], []] : [[], []];
}

function getValueAccessor(accessor) {
  if (typeof accessor === 'string') {
    return value => get(value, accessor);
  }
  if (typeof accessor === 'function') {
    return accessor;
  }
  return defaultAccessor;
}

function defaultAccessor(value) {
  return get(value, 'target.value', value);
}

function useFormField({
  accessor,
  adapter,
  emptyValue,
  initialValue = '',
  isRequired = false,
  validate,
  validateRequired = isEmpty
} = {}) {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setTouched] = useState(false);
  const [requiredValidationError, setRequiredValidationError] = useState(() =>
    validateRequired(initialValue)
  );
  const isEmpty = !!requiredValidationError;
  const [isOutOfSync, setOutOfSync] = useState(false);
  const [validationState, setValidationState] = useState(() =>
    getValidationMessages(initialValue, validate, isEmpty)
  );
  const isValid = !validationState[0].length;
  const valueAccessor = getValueAccessor(accessor);

  const validateValue = value => {
    const requiredValidationResult = validateRequired(value);
    setRequiredValidationError(requiredValidationResult);
    const newValidationState = getValidationMessages(
      value,
      validate,
      !!requiredValidationResult
    );
    setValidationState(newValidationState);
    return getIsAcceptable(
      isRequired,
      !!requiredValidationResult,
      !newValidationState[0].length
    );
  };
  const updateValue = value => {
    setOutOfSync(false);
    setValue(value);
    validateValue(value);
  };
  const handleChange = param => {
    setTouched(true);
    const value = valueAccessor(param);
    updateValue(value);
  };
  function handleReset() {
    setTouched(false);
    updateValue(initialValue);
  }
  const handleClear = () => {
    setTouched(true);
    const value = typeof emptyValue !== 'undefined' ? emptyValue : initialValue;
    updateValue(value);
  };
  const handleChangeValueOnly = param => {
    setOutOfSync(true);
    const value = valueAccessor(param);
    setValue(value);
  };
  const handleSubmitAttempt = () => {
    setOutOfSync(false);
    setTouched(true);
    return validateValue(value);
  };

  useEffect(() => {
    if (!isTouched && !isOutOfSync && initialValue !== value) {
      handleReset();
    }
  }, [isTouched, isOutOfSync, initialValue, value, setValue]);

  const field = {
    isEmpty,
    isRequired,
    isTouched,
    isValid,
    isAcceptable: getIsAcceptable(isRequired, isEmpty, isValid, isOutOfSync),
    handleChange,
    handleChangeValueOnly,
    handleReset,
    handleClear,
    handleSubmitAttempt,
    successfulValidations: validationState[1],
    validationErrors: validationState[0],
    value
  };
  if (typeof requiredValidationError === 'string') {
    field.requiredValidationError = requiredValidationError;
  }

  return typeof adapter === 'function'
    ? {
        ...adapter(field),
        ...field
      }
    : field;
}

function getIsAcceptable(isRequired, isEmpty, isValid, isOutOfSync) {
  return !isOutOfSync && ((!isRequired && isEmpty) || (!isEmpty && isValid));
}

function isEmpty(value) {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  return (
    typeof value === 'undefined' ||
    value === null ||
    (Array.isArray(value) && !value.length)
  );
}

function useFormWithFields({
  onSubmit,
  onFailedSubmit = defaultOnFailedSubmit,
  fields
} = {}) {
  const [isSubmitAttempted, setSubmitAttempted] = useState(false);
  const isSubmittable = !fields.find(isNotAcceptable);
  const handleSubmit = event => {
    const isSubmittable = fields.reduce(
      (isSubmittable, field) => field.handleSubmitAttempt() && isSubmittable,
      true
    );
    if (!isSubmittable) {
      setSubmitAttempted(true);
      onFailedSubmit(event);
    } else if (typeof onSubmit === 'function') {
      onSubmit(event);
    }
  };

  return {
    isSubmittable,
    isSubmitAttempted,
    handleSubmit
  };
}

function isNotAcceptable(field) {
  return !field.isAcceptable;
}

function defaultOnFailedSubmit(e) {
  e.preventDefault();
}

export { useFormField, useFormWithFields };

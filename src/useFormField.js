import { useState } from 'react';
import get from 'lodash/get';

export default function useFormField(
  fieldName,
  { accessor, validate, initialValue = '', isRequired = false } = {}
) {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setTouched] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [successfulValidations, setSuccessfulValidations] = useState([]);
  const isInvalid = !!validationErrors.length;

  const handleChange = param => {
    setTouched(true);
    const value = getValue(param, accessor);
    setValue(value);
    if (typeof validate === 'function') {
      const [validationErrors, successfulValidations] = getValidationMessages(
        value,
        validate
      );
      setValidationErrors(validationErrors);
      setSuccessfulValidations(successfulValidations);
    }
  };

  return {
    isInvalid,
    isRequired,
    isTouched,
    isTouchedAndInvalid: isTouched && isInvalid,
    isValid: !isInvalid,
    handleChange,
    handleReset: () => {},
    handleClear: () => {},
    successfulValidations,
    validationErrors,
    value
  };
}

function getValue(value, accessor) {
  if (typeof accessor === 'string') {
    return get(value, accessor);
  }
  if (typeof accessor === 'function') {
    return accessor(value);
  }
  return get(value, 'target.value', value);
}

function getValidationMessages(value, validate) {
  const validationResult = validate(value);
  if (Array.isArray(validationResult)) {
    if (validationResult.length > 1 && Array.isArray(validationResult[0])) {
      return validationResult;
    }
    return [validationResult, []];
  }
  return validationResult ? [[validationResult], []] : [[], []];
}

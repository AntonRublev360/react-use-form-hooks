import { useState } from 'react';

export default function useFormWithFields({
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
  const handleReset = () => {
    fields.forEach(field => field.handleReset());
  };
  const handleClear = () => {
    fields.forEach(field => field.handleClear());
  };

  return {
    isSubmittable,
    isSubmitAttempted,
    handleSubmit,
    handleReset,
    handleClear
  };
}

function isNotAcceptable(field) {
  return !field.isAcceptable;
}

function defaultOnFailedSubmit(e) {
  e.preventDefault();
}

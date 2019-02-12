import React from 'react';
import classnames from 'classnames';

export default function Input({
  isInvalid,
  isRequired,
  isTouched,
  isValid,
  label,
  handleBlur,
  handleChange,
  type,
  value
}) {
  return (
    <label>
      {label}
      {isRequired && '*'}
      <input
        className={classnames('input', {
          'input--touched': isTouched,
          'input--valid': isValid,
          'input--invalid': isInvalid
        })}
        type={type}
        value={value}
        required={isRequired}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </label>
  );
}

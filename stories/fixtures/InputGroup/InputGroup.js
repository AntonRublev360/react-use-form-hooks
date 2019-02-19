import React from 'react';
import classnames from 'classnames';
import './InputGroup.css';

export default function InputGroup({
  Tag = 'input',
  isEmpty,
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
    <label
      className={classnames('input-group', {
        'input-group--empty': isEmpty,
        'input-group--touched': isTouched,
        'input-group--valid': isValid,
        'input-group--invalid': !isValid
      })}
    >
      <span
        className="input-group__label"
      >
        {label}
        {isRequired && '*'}
      </span>
      <Tag
        className="input-group__input"
        type={type}
        value={value}
        required={isRequired}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="input-group__checkmark">
        {'✓'}
      </span>
    </label>
  );
}

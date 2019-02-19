import React from 'react';
import classnames from 'classnames';
import './ValidationErrors.css';

export default function ValidationErrors({
  className,
  validationErrors
}) {
  return (
    <ul className={classnames('validation-errors', className)}>
      {validationErrors.map(error => (
        <li className="validation-errors__item" key={error}>
          {'✕ '}
          {error}
        </li>
      ))}
    </ul>
  );
}

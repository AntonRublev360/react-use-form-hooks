import React from 'react';
import classnames from 'classnames';
import './SuccessfulValidations.css';

export default function SuccessfulValidations({
  className,
  successfulValidations,
  isValid
}) {
  return (
    <ul className={classnames('successful-validations', className, {
      'successful-validations--valid': isValid
    })}>
      {successfulValidations.map(validation => (
        <li className="successful-validations__item" key={validation}>
          {'✓ '}
          {validation}
        </li>
      ))}
    </ul>
  );
}

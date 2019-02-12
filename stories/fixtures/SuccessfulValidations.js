import React from 'react';
import classnames from 'classnames';

export default function SuccessfulValidations({
  className,
  successfulValidations
}) {
  return (
    <ul className={classnames('successful-validations', className)}>
      {successfulValidations.map(validation => (
        <li className="successful-validations__item" key={validation}>
          {validation}
        </li>
      ))}
    </ul>
  );
}

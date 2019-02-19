import React from 'react';
import './InputDemoWrapper.css';

export default function InputDemoWrapper({
  children,
  fieldConfig,
  fieldProps
}) {
  return (
    <React.Fragment>
      <div className="input-demo-wrapper__input">
        {children}
      </div>
      <div className="input-demo-wrapper__info-cont">
        <pre className="input-demo-wrapper__input__info">
          {`const ${stringifyWithFunctions(fieldProps)} = useFormField(${
            stringifyWithFunctions(fieldConfig)
          });`}
        </pre>
      </div>
    </React.Fragment>
  );
}

function stringifyWithFunctions(obj) {
  return JSON.stringify(obj, stringifyReplacerWithFunctions, 2);
}

function stringifyReplacerWithFunctions(key, value) {
  return typeof value === 'function'
    ? compactFunctionCode(value.toString())
    : value;
}

function compactFunctionCode(code) {
  const startCode = code.slice(0, code.indexOf('{') + 1);
  return `${startCode}...}`;
}

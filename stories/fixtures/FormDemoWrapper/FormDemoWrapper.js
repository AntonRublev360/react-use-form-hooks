import React from 'react';
import './FormDemoWrapper.css';

export default function FormDemoWrapper({
  children
}) {
  return (
    <div className="form-demo-wrapper">
      {children}
    </div>
  );
}

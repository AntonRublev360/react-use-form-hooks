import React from 'react';
import './SubmitButton.css';

export default function SubmitButton({
  children,
  ...props
}) {
  return (
    <button
      className="submit-button"
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
}

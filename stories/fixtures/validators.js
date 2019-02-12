import validator from 'validator';

const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 128;

export function validateStringLength(value, min = 0, max) {
  if (validator.isLength(String(value), min, max)) {
    return null;
  }
  return `Value must be between ${min} and ${max} characters long`;
}

export function validateEmail(value) {
  if (validator.isEmail(String(value))) {
    return null;
  }
  return 'Value must be a valid email address';
}

export function validateNotEmpty(value) {
  if (
    value !== null &&
    typeof value !== 'undefined' &&
    !validator.isEmpty(String(value))
  ) {
    return null;
  }
  return 'Value must not be empty';
}

export function validateStrongPassword(value) {
  const stringValue = String(value);
  const errorMessages = [];
  const succesfulValidations = [];
  
  if (
    !validator.isLength(stringValue, {
      min: MIN_PASSWORD_LENGTH
    })
  ) {
    errorMessages.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
  } else {
    succesfulValidations.push(`At least ${MIN_PASSWORD_LENGTH} characters long`);
  }

  if (
    !validator.isLength(stringValue, {
      max: MAX_PASSWORD_LENGTH
    })
  ) {
    errorMessages.push(`Password must be at most ${MAX_PASSWORD_LENGTH} characters long`);
  } else {
    succesfulValidations.push(`At most ${MAX_PASSWORD_LENGTH} characters long`);
  }

  if (!validator.matches(stringValue, /^\S*$/g)) {
    errorMessages.push('Password must not include spaces');
  } else {
    succesfulValidations.push(`No spaces`);
  }

  if (!validator.matches(stringValue, /.*[A-Z]+.*/g)) {
    errorMessages.push('Password must include at least one uppercase letter');
  } else {
    succesfulValidations.push('At least one uppercase letter');
  }

  if (!validator.matches(stringValue, /.*[a-z]+.*/g)) {
    errorMessages.push('Password must include at least one lowercase letter');
  } else {
    succesfulValidations.push('At least one lowercase letter');
  }

  if (!validator.matches(stringValue, /.*[0-9]+.*/g)) {
    errorMessages.push('Password must include at least one digit');
  } else {
    succesfulValidations.push('At least one digit');
  }

  return [errorMessages, succesfulValidations];
}

export function validatePasswordsMatch(value, valueToMatch) {
  if (value === valueToMatch) {
    return null;
  }
  return 'Passwords must match';
}

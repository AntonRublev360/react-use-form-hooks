# react-use-form-hooks
React hooks for managing form state.
Uses React Hooks API to manage common form elements state.
The hooks are meant to be generic and usefull.

Requires `react@^16.8.0 react-dom@^16.8.0` as peer dependencies.

## Features

- Keeps field value state
- Keeps field touched state
- Keeps field validation state
- Executes validation and exposes validation errors
- Will support async validation (TODO)

## Installation

npm
```
npm i --save react-use-form-hooks
```

yarn
```
yarn add react-use-form-hooks
```

## Usage

[Live demo](https://AntonRublev360.github.io/react-use-form-hooks/)

Example:
```js
import React from 'react';
import { useFormField, useFormWithFields } from 'react-use-form-hooks';

export default () => {
  const fieldOne = useFormField({
    initialValue: '',
    isRequired: true,
    validate: doValidationSomehow
  });

  const fieldTwo = useFormField();

  const form = useFormWithFields({
    onSubmit: doSomethingWithAcceptableFormData,
    fields: [fieldOne, fieldTwo]
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <MyInput
        label="Field One"
        type="text"
        value={fieldOne.value}
        required={fieldOne.isRequired}
        onChange={fieldOne.handleChange}
        isValid={fieldOne.isValid}
        isTouched={fieldOne.isTouched}
        validationErrors={fieldOne.validationErrors}
        successfulValidations={fieldOne.successfulValidations}
      />
      <MyInput
        label="Field Two"
        type="can be anything really"
        value={fieldTwo.value}
        required={fieldTwo.isRequired}
        onChange={fieldTwo.handleChange}
        isValid={fieldTwo.isValid}
        isTouched={fieldTwo.isTouched}
        validationErrors={fieldTwo.validationErrors}
        successfulValidations={fieldTwo.successfulValidations}
      />
      <button type="submit" disabled={!form.isSubmittable}>
        Submit
      </button>
    </form>
  );
}
```

## API

The module exports two hooks: `useFormField` and `useFormWithFields`.

### useFormField

```js
const field = useFormField(params);
```

Returns object with following fields:
```js
{
  isEmpty, // boolean; indicates whether field value is empty
  isRequired, // boolean
  isTouched, // boolean; indicates whether field value has been changed
  isValid, // boolean; indicates whether field value is valid
  isAcceptable, // boolean; indicates whether field is known to be OK to be used in form data submission
  handleChange, // function; should be called on controlled input change if it should be validated immediately
  handleChangeValueOnly, // function; should be called on controlled input change if it should NOT be validated immediately. Field will be validated on blur or submission attempt instead
  handleReset, // function; reset field to initial state
  handleClear, // function; clear field value
  handleSubmitAttempt, // function: Called by useFormWithFields hook. May be called manually on form submit attempt if useFormWithFields is not used
  successfulValidations, // array of successful validations results
  validationErrors, // array of failed validation results / validation error messages
  value //any; field value
}
```

#### Parameters

```js
{
  accessor, // function or string, optional
  adapter, // function, optional
  emptyValue, // any, optional
  initialValue, // any, optional, default is empty string
  isRequired, // boolean, optional, default is false
  validate, // function, optional
  validateRequired // function, optional
}
```

##### accessor

Optional. Used to extract field value out of object passed as a parameter to `handleChange` and `handleChangeValueOnly` handlers.

If accessor is a string, it is used as a path to object's value.

If accessor is a function it is expected to return the new value.

Note: if no acessor is provided, the hook will first attempt to treat parameter as event and resolve it's 'target.value' path. In case if 'target.value' path returns undefined, the raw param will used as value.

#### adapter

Optional. Used to supplement field values. For example, to produce a shape that can be fed to bootstap components.
The function only needs to return the new fields.

#### emptyValue

Optional. Value that will be set on field clear with `handleClear`.

#### initialValue

Optional. Defaults to empty string. Initial value. Will also be set on field reset with `handleReset`.

#### isRequired

Optional. If true, field will be treated as not OK for submission when empty.

#### validate

Optional. Function that is used to validation the field.

[More on validation here](#Validation)

#### validateRequired

Optional. Function that is used to check if field is empty. Should return error message or any truthy value if field is empty and a falsy value otherwise. Defaults to a function that returns truthy for `undefined`, `null`, `''` and [] values.

### useFormWithFields

```js
const field1 = useFormField(params);
const field2 = useFormField(params);
const form = useFormWithFields({
    onSubmit: submitValidFormDataSomehow,
    fields: [field1, field2]
  });
```

Returns object with following fields:
```js
{
  isSubmittable, // boolean; indicates whether all form fields are OK
  isSubmitAttempted, // boolean; indicates whether handleSubmit has been called at least once
  handleSubmit // function to be called on form submission attempt
}
```

#### Parameters

```js
{
  onSubmit, // function; called on submit attempt if all fields are OK
  onFailedSubmit, // function; called on submit attempt if at least one field is not OK
  fields // array of return values of useFormField hooks
}
```

##### onSubmit

Optional. If supplied, it will be called with the param (usually event) passed to the `handleSubmit` handler only if all fields listed in `fields` param are OK.

##### onFailedSubmit

Optional. If supplied, it will be called with the param (usually event) passed to the `handleSubmit` handler only if at least one field listed in `fields` param is not OK.
Defaults to function that prevents default event handling.

##### fields

Required. Array of objects produced by `useFormField` hooks.

### Validation

#### Simple form

`validate` function may return an error message if validation fails and any falsy value if it succeeds.

Example:
```js
validate: value => value.length < 5
  ? 'Value must be at least 5 characters long'
  : null
```

When above validation fails, the field shape will have keys:
```js
{
  successfulValidations: [],
  validationErrors: ['Value must be at least 5 characters long'],
  isInvalid: true,
  isValid: false,
  ...other
}
```
When above validation succeeds, the field shape will have keys:
```js
{
  successfulValidations: [],
  validationErrors: [],
  isInvalid: false,
  isValid: true,
  ...other
}
```
Note: since in this form `validate` only returns errorMessage on failure, `successfulValidations` will always be an empty array.


#### Multiple errors

There may be multiple problems with the value that is being validated and it may be a good idea to let user know of all of them instead of presenting only one at a time.

`validate` function may return an array of validation error messages.

A good example is a password field:
```js
validate: password => {
  const errorMessages = [];
  if (password.length < 5) {
    errorMessages.push('Password must be at least 5 characters long');
  }
  if (!RegExp(/.*[A-Z]+.*/g).test(password)) {
    errorMessages.push('Password must include at least one uppercase letter');
  }
  if (!RegExp(/.*[a-z]+.*/g).test(password)) {
    errorMessages.push('Password must include at least one lowercase letter');
  }
  return errorMessages;
}
```

When above validation fails, the field shape will have keys:
```js
// ex. value = 'test';
{
  successfulValidations: [],
  validationErrors: [
    'Password must be at least 5 characters long',
    'Password must include at least one uppercase letter'
  ],
  isInvalid: true,
  isValid: false,
  ...other
}
```
When above validation succeeds, the field shape will have keys:
```js
{
  successfulValidations: [],
  validationErrors: [],
  isInvalid: false,
  isValid: true,
  ...other
}
```
Note: since in this form `validate` only returns errorMessages, `successfulValidations` will always be an empty array.

#### Successful Validations

If you would like to be explicit about what validations suceeded, `validate` function may return an array with two items in it: `[validationErrors, successfulValidations]`.
First item is an array of validation error messages.
The second item is an array of successful validation messages.

Example:
```js
validate: password => {
  const errorMessages = [];
  const successfulValidations = [];
  if (password.length < 5) {
    errorMessages.push('Password must be at least 5 characters long');
  } else {
    successfulValidations.push('Password is long enough');
  }
  if (!RegExp(/.*[A-Z]+.*/g).test(password)) {
    errorMessages.push('Password must include at least one uppercase letter');
  } else {
    successfulValidations.push('Password has an uppercase letter');
  }
  if (!RegExp(/.*[a-z]+.*/g).test(password)) {
    errorMessages.push('Password must include at least one lowercase letter');
  } else {
    successfulValidations.push('Password has a lowercase letter');
  }
  return [errorMessages, successfulValidations];
}
```
When above validation fails, the field shape will have keys:
```js
// ex. value = 'test';
{
  successfulValidations: [
    'Password has a lowercase letter'
  ],
  validationErrors: [
    'Password must be at least 5 characters long',
    'Password must include at least one uppercase letter'
  ],
  isInvalid: true,
  isValid: false,
  ...other
}
```
When above validation succeeds, the field shape will have keys:
```js
{
  successfulValidations: [
    'Password is long enough',
    'Password has an uppercase letter',
    'Password has a lowercase letter'
  ],
  validationErrors: [],
  isInvalid: false,
  isValid: true,
  ...other
}
```

#### Async validation

In some cases validation requires an async operation. For example, making an API call to check if username is taken.

COMING SOON

#### Validating dependant fields

Sometimes, field validation depends on another field. A simple example is a password repeat field that needs to compare repeat field value to password field value.

This is where `react hooks` shine: if both fields are in scope of the same functional component, value of one field can be accessed in `validate` function of another.

Example:
```js
function PasswordsMatch(props) {
  const password = useFormField(); // no validation for simplicity
  const passwordRepeat = useFormField({
    validate: value => value !== password
      ? 'Passwords must match'
      : null
  });
}
```

To validate both fields:
```js
function PasswordsMatch(props) {
  const password = useFormField({
    validate: validateMatchesPasswordRepeat
  });
  const passwordRepeat = useFormField({
    validate: validateMatchesPassword
  });

  function validateMatchesPasswordRepeat(value) {
    return value !== passwordRepeat
      ? 'Passwords must match'
      : null;
  }

  function validateMatchesPassword(value) {
    return value !== password
      ? 'Passwords must match'
      : null;
  }
}
```

## Development and contributions

yarn
```
git clone https://github.com/AntonRublev360/react-use-form-hooks.git
cd react-use-form-hooks
yarn install
yarn start
```

npm
```
git clone https://github.com/AntonRublev360/react-use-form-hooks.git
cd react-use-form-hooks
npm i
npm start
```

## License

MIT

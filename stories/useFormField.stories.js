import React from 'react'
import { storiesOf } from '@storybook/react'
import useFormField from '../src/useFormField'
import Input from './fixtures/Input';
import ValidationErrors from './fixtures/ValidationErrors';
import SuccessfulValidations from './fixtures/SuccessfulValidations';
import { validateEmail, validateStrongPassword } from './fixtures/validators';

function FormSample() {
  const email = useFormField('email', {
    validate: validateEmail
  })
  const password = useFormField('password', {
    validate: validateStrongPassword
  })
  return (
    <form>
      <Input
        {...email}
        type="text"
        label="Email"
      />
      <ValidationErrors {...email} />
      <SuccessfulValidations {...email} />
      <Input
        {...password}
        type="password"
        label="Password"
      />
      <ValidationErrors {...password} />
      <SuccessfulValidations {...password} />
      <button
        type="submit"
        disabled={email.isInvalid || password.isInvalid}
      >
        {'Submit'}
      </button>
      <div>
        <label>
          {'email'}
          <textarea
            rows="10"
            cols="50"
            readOnly
            value={JSON.stringify(email, null, 2)}
          />
        </label>
        <label>
          {'password'}
          <textarea
            rows="10"
            cols="50"
            readOnly
            value={JSON.stringify(password, null, 2)}
          />
        </label>
      </div>
    </form>
  );
}

storiesOf('useFormField', module)
  .add('default', () => <FormSample />)

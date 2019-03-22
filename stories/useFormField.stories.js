import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment';
import useFormField from '../src/useFormField'
import useFormWithFields from '../src/useFormWithFields';
import InputGroup from './fixtures/InputGroup/InputGroup';
import ValidationErrors from './fixtures/ValidationErrors/ValidationErrors';
import SuccessfulValidations from './fixtures/SuccessfulValidations/SuccessfulValidations';
import InputDemoWrapper from './fixtures/InputDemoWrapper/InputDemoWrapper';
import FormDemoWrapper from './fixtures/FormDemoWrapper/FormDemoWrapper';
import SubmitButton from './fixtures/SubmitButton/SubmitButton';
import { validateEmail, validateStrongPassword, validateStringLength, validateDateInThePast } from './fixtures/validators';

const emailOptions = {
  isRequired: true,
  validate: validateEmail
};

const passwordOptions = {
  isRequired: true,
  validate: validateStrongPassword
};

const notesOptions = {
  initialValue: 'This field validates on blur. The value length must be between 5 and 15 characters long.',
  emptyValue: '',
  validate: (v) => validateStringLength(v, 5, 15)
};

const favouriteDateOptions = {
  isRequired: false,
  initialValue: moment().format('YYYY-MM-DD'),
  emptyDate: '',
  validate: validateDateInThePast
};

function FormSample() {
  const email = useFormField(emailOptions);
  const password = useFormField(passwordOptions);
  const notes = useFormField(notesOptions);
  const favouriteDate = useFormField(favouriteDateOptions);
  const form = useFormWithFields({
    onSubmit: (e) => {
      e.preventDefault();
      alert('Submitted')
    },
    fields: [
      email,
      password,
      notes,
      favouriteDate
    ]
  });
  return (
    <form onSubmit={form.handleSubmit}>
      <FormDemoWrapper>
        <InputDemoWrapper
          fieldConfig={emailOptions}
          fieldProps={email}
        >
          <InputGroup
            {...email}
            type="email"
            label="Email"
          />
          <ValidationErrors {...email} />
          <SuccessfulValidations {...email} />
        </InputDemoWrapper>
        <InputDemoWrapper
          fieldConfig={passwordOptions}
          fieldProps={password}
        >
          <InputGroup
            {...password}
            type="password"
            label="Password"
          />
          <ValidationErrors {...password} />
          <SuccessfulValidations {...password} />
        </InputDemoWrapper>
        <InputDemoWrapper
          fieldConfig={notesOptions}
          fieldProps={notes}
        >
          <InputGroup
            {...notes}
            Tag="textarea"
            type="text"
            label="Notes"
            handleChange={notes.handleChangeValueOnly}
            handleBlur={notes.handleChange}
          />
          <ValidationErrors {...notes} />
          <SuccessfulValidations {...notes} />
        </InputDemoWrapper>
        <InputDemoWrapper
          fieldConfig={favouriteDateOptions}
          fieldProps={favouriteDate}
        >
          <InputGroup
            {...favouriteDate}
            type="date"
            label="Fav. Date"
            handleChange={favouriteDate.handleChangeValueOnly}
            handleBlur={favouriteDate.handleChange}
          />
          <ValidationErrors {...favouriteDate} />
          <SuccessfulValidations {...favouriteDate} />
        </InputDemoWrapper>
        <SubmitButton
    
        >
          {'Submit'}
        </SubmitButton>
      </FormDemoWrapper>
    </form>
  );
}

storiesOf('useFormField', module)
  .add('default', () => <FormSample />)

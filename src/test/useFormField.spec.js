import { act } from 'react-dom/test-utils';
import createRenderHook from './createRenderHook';
import getLastCallResult from './getLastCallResult';
import useFormField from '../useFormField';

describe('useFormField react hook', () => {
  const renderHook = createRenderHook(useFormField);
  const renderSpy = jest.fn();

  describe('without params', () => {
    beforeEach(() => {
      renderHook({}, renderSpy);
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    it('returns handleChange function', () => {
      expect(renderSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          handleChange: expect.any(Function)
        })
      );
    });

    it('returns handleReset function', () => {
      expect(renderSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          handleReset: expect.any(Function)
        })
      );
    });

    it('returns handleClear function', () => {
      renderSpy.mock.results[renderSpy.mock.results.length - 1];
      expect(renderSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          handleClear: expect.any(Function)
        })
      );
    });

    it('returns handleSubmitAttempt function', () => {
      renderSpy.mock.results[renderSpy.mock.results.length - 1];
      expect(renderSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          handleSubmitAttempt: expect.any(Function)
        })
      );
    });

    describe('after handleChange is invoked with value "test"', () => {
      const newValue = 'test';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChange is invoked with event: { target: { value: "eventTest" } }', () => {
      const newValue = 'eventTest';
      const syntheticEvent = {
        target: {
          value: newValue
        }
      };

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(syntheticEvent);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with "someValue"', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('someValue');
        });
      });

      testReturnValue(renderSpy, 'value', 'someValue');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns true', () => {
        expect(isSubmittable).toBe(true);
      });
    });
  });

  describe('with accessor function = (v) => v.someKey.toUpperCase()', () => {
    const accessor = v => v.someKey.toUpperCase();
    beforeEach(() => {
      renderHook(
        {
          accessor
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange invoked with value { someKey: "test" }', () => {
      const newValue = { someKey: 'test' };

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', 'TEST');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChangeValueOnly is invoked with { someKey: "test" }', () => {
      const newValue = { someKey: 'test' };

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', 'TEST');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });
  });

  describe('with accessor = "someKey.anotherKey"', () => {
    const accessor = 'someKey.anotherKey';
    beforeEach(() => {
      renderHook(
        {
          accessor
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked with value { someKey: { anotherKey: "test" } }', () => {
      const newValue = { someKey: { anotherKey: 'test' } };

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', 'test');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChangeValueOnly is invoked with { someKey: { anotherKey: "test" } }', () => {
      const newValue = { someKey: { anotherKey: 'test' } };

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', 'test');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });
  });

  describe('with initialValue = "testInitialValue"', () => {
    beforeEach(() => {
      renderHook(
        {
          initialValue: 'testInitialValue'
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', 'testInitialValue');
    testReturnValue(renderSpy, 'isEmpty', false);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleReset is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', 'testInitialValue');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleClear is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', 'testInitialValue');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });
  });

  describe('with emptyValue = null', () => {
    beforeEach(() => {
      renderHook(
        {
          emptyValue: null
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleReset is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', null);
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });
  });

  describe('with isRequired = true', () => {
    beforeEach(() => {
      renderHook(
        {
          isRequired: true
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', true);
    testReturnValue(renderSpy, 'isTouched', false);

    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', false);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked with value "test"', () => {
      const newValue = 'test';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChange is invoked with value "   "', () => {
      const newValue = '   ';

      beforeEach(() => {
        getLastCallResult(renderSpy);
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue, '   ');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with "someValue"', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('someValue');
        });
      });

      testReturnValue(renderSpy, 'value', 'someValue');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns false', () => {
        expect(isSubmittable).toBe(false);
      });
    });
  });

  describe('with isRequired = true, and custom validateRequired', () => {
    beforeEach(() => {
      renderHook(
        {
          isRequired: true,
          validateRequired: v => v === null,
          emptyValue: null
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', false);
    testReturnValue(renderSpy, 'isRequired', true);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked with value "test"', () => {
      const newValue = 'test';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', null);
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with "someValue"', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('someValue');
        });
      });

      testReturnValue(renderSpy, 'value', 'someValue');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns true', () => {
        expect(isSubmittable).toBe(true);
      });
    });
  });

  describe('with isRequired = true, and custom validateRequired that returns errorMessage', () => {
    beforeEach(() => {
      renderHook(
        {
          isRequired: true,
          validateRequired: v => (v === '' ? 'Value must not be empty' : null)
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', true);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', false);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(
      renderSpy,
      'requiredValidationError',
      'Value must not be empty'
    );
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked with value "test"', () => {
      const newValue = 'test';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(
        renderSpy,
        'requiredValidationError',
        'Value must not be empty'
      );
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('someValue');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(
        renderSpy,
        'requiredValidationError',
        'Value must not be empty'
      );
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with "someValue"', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('someValue');
        });
      });

      testReturnValue(renderSpy, 'value', 'someValue');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(
        renderSpy,
        'requiredValidationError',
        'Value must not be empty'
      );
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', true);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(
        renderSpy,
        'requiredValidationError',
        'Value must not be empty'
      );
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns false', () => {
        expect(isSubmittable).toBe(false);
      });
    });
  });

  describe('with validate function returning single errorMessage', () => {
    beforeEach(() => {
      renderHook(
        {
          validate: v => (v === 'INVALID_VALUE' ? 'Value must be valid' : null)
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked with valid value', () => {
      const newValue = 'VALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChange is invoked with invalid value', () => {
      const newValue = 'INVALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleReset is invoked after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with valid value after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('VALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'VALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with invalid value after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('INVALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns true', () => {
        expect(isSubmittable).toBe(true);
      });
    });

    describe('after handleSubmitAttempt is invoked after handleChangeValueOnly with invalid value ', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('INVALID_VALUE');
        });
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);

      it('handleSubmitAttempt returns false', () => {
        expect(isSubmittable).toBe(false);
      });
    });
  });

  describe('with validate function and invalid initialValue', () => {
    beforeEach(() => {
      renderHook(
        {
          initialValue: 'INVALID_VALUE',
          validate: v => (v === 'INVALID_VALUE' ? 'Value must be valid' : null)
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
    testReturnValue(renderSpy, 'isEmpty', false);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', false);
    testReturnValue(renderSpy, 'isAcceptable', false);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked valid value', () => {
      const newValue = 'VALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('VALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'VALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns false', () => {
        expect(isSubmittable).toBe(false);
      });
    });
  });

  describe('with validate function that returns validationError on empty value', () => {
    beforeEach(() => {
      renderHook(
        {
          validate: v => (v !== 'VALID_VALUE' ? 'Value must be valid' : null)
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty value');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleReset is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('VALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'VALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleSubmitAttempt is invoked', () => {
      let isSubmittable;

      beforeEach(() => {
        act(() => {
          isSubmittable = getLastCallResult(renderSpy).handleSubmitAttempt();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty value');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', []);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);

      it('handleSubmitAttempt returns true', () => {
        expect(isSubmittable).toBe(true);
      });
    });
  });

  describe('with validate function returning an array of errorMessages', () => {
    beforeEach(() => {
      renderHook(
        {
          validate: v =>
            v === 'INVALID_VALUE'
              ? ['Value must be valid', 'Value must be very valid']
              : []
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked valid value', () => {
      const newValue = 'VALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChange is invoked invalid value', () => {
      const newValue = 'INVALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [
        'Value must be valid',
        'Value must be very valid'
      ]);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleReset is invoked after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with valid value after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('VALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'VALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [
        'Value must be valid',
        'Value must be very valid'
      ]);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with invalid value after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('INVALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });
  });

  describe('with validate function returning [[...validationErrors], [...successfullValidations]]', () => {
    const validationErrors = [
      'Value must be valid',
      'Value must be very valid'
    ];
    const successfulValidationsOnInvalid = ['At least you tried'];
    const successfulValidationsOnValid = ['Yay, all good'];
    beforeEach(() => {
      renderHook(
        {
          validate: v =>
            v === 'INVALID_VALUE'
              ? [validationErrors, successfulValidationsOnInvalid]
              : [[], successfulValidationsOnValid]
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty string');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');
    testRendersTimes(renderSpy, 1);

    describe('after handleChange is invoked valid value', () => {
      const newValue = 'VALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(
        renderSpy,
        'successfulValidations',
        successfulValidationsOnValid
      );
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleChange is invoked invalid value', () => {
      const newValue = 'INVALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(
        renderSpy,
        'successfulValidations',
        successfulValidationsOnInvalid
      );
      testReturnValue(renderSpy, 'validationErrors', validationErrors);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });

    describe('after handleReset is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleReset is invoked after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleReset();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleClear is invoked after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleClear();
        });
      });

      testReturnValue(renderSpy, 'value', '', 'empty string');
      testReturnValue(renderSpy, 'isEmpty', true);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', false);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', true);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with valid value after invalid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('INVALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('VALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'VALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(
        renderSpy,
        'successfulValidations',
        successfulValidationsOnInvalid
      );
      testReturnValue(renderSpy, 'validationErrors', validationErrors);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });

    describe('after handleChangeValueOnly is invoked with invalid value after valid value', () => {
      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange('VALID_VALUE');
        });
        act(() => {
          getLastCallResult(renderSpy).handleChangeValueOnly('INVALID_VALUE');
        });
      });

      testReturnValue(renderSpy, 'value', 'INVALID_VALUE');
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isValid', true);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(
        renderSpy,
        'successfulValidations',
        successfulValidationsOnValid
      );
      testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 3);
    });
  });

  describe('with adapter', () => {
    const adapter = ({ isTouched, isValid }) => ({
      isTouchedAndValid: isTouched && isValid,
      isTouchedAndInvalid: isTouched && !isValid
    });
    beforeEach(() => {
      renderHook(
        {
          adapter,
          validate: v => (v === 'INVALID_VALUE' ? 'Value must be valid' : null)
        },
        renderSpy
      );
    });

    testReturnValue(renderSpy, 'value', '', 'empty value');
    testReturnValue(renderSpy, 'isEmpty', true);
    testReturnValue(renderSpy, 'isRequired', false);
    testReturnValue(renderSpy, 'isTouched', false);
    testReturnValue(renderSpy, 'isTouchedAndValid', false);
    testReturnValue(renderSpy, 'isTouchedAndInvalid', false);
    testReturnValue(renderSpy, 'isValid', true);
    testReturnValue(renderSpy, 'isAcceptable', true);
    testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
    testReturnValue(renderSpy, 'validationErrors', [], 'empty array');
    testReturnValue(renderSpy, 'requiredValidationError');

    describe('after handleChange is invoked with invalid value', () => {
      const newValue = 'INVALID_VALUE';

      beforeEach(() => {
        act(() => {
          getLastCallResult(renderSpy).handleChange(newValue);
        });
      });

      testReturnValue(renderSpy, 'value', newValue);
      testReturnValue(renderSpy, 'isEmpty', false);
      testReturnValue(renderSpy, 'isRequired', false);
      testReturnValue(renderSpy, 'isTouched', true);
      testReturnValue(renderSpy, 'isTouchedAndValid', false);
      testReturnValue(renderSpy, 'isTouchedAndInvalid', true);
      testReturnValue(renderSpy, 'isValid', false);
      testReturnValue(renderSpy, 'isAcceptable', false);
      testReturnValue(renderSpy, 'successfulValidations', [], 'empty array');
      testReturnValue(renderSpy, 'validationErrors', ['Value must be valid']);
      testReturnValue(renderSpy, 'requiredValidationError');
      testRendersTimes(renderSpy, 2);
    });
  });
});

function testReturnValue(renderSpy, key, value, expected) {
  it(`returns ${key} = ${expected || value}`, () => {
    expectReturnValue(renderSpy, key, value);
  });
}

function expectReturnValue(renderSpy, key, value) {
  const result = getLastCallResult(renderSpy);
  expect(result).toHaveProperty(key, value);
}

function testRendersTimes(renderSpy, n) {
  it(`runs render ${n} time(s) (no excessive renders)`, () => {
    expect(renderSpy.mock.calls.length).toEqual(n);
  });
}

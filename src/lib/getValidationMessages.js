export default function getValidationMessages(value, validate, isEmpty) {
  if (typeof validate !== 'function' || isEmpty) {
    return [[], []];
  }
  const validationResult = validate(value);
  if (Array.isArray(validationResult)) {
    if (validationResult.length > 1 && Array.isArray(validationResult[0])) {
      return validationResult;
    }
    return [validationResult, []];
  }
  return validationResult ? [[validationResult], []] : [[], []];
}

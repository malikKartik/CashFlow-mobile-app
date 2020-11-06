export const inputChangeHandler = (input, e, type) => {
  let updatedInput = {...input};
  let updatedElement = {...updatedInput[type]};
  updatedElement['value'] = e;
  updatedElement['valid'] = checkValidation(
    updatedElement.value,
    updatedElement.validation,
  );

  updatedElement.touched = true;
  updatedInput[type] = updatedElement;
  let validity = true;
  for (let key in updatedInput) {
    validity = validity && updatedInput[key].valid;
  }

  return [validity, updatedInput];
};

const checkValidation = (value, rules) => {
  let isValid = true;
  if (!rules) return true;
  if (rules.required) {
    isValid = isValid && value.trim() !== '';
  }
  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength;
  }
  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength;
  }
  if (rules.regex) {
    isValid = isValid && value.match(rules.regex);
  }
  return isValid;
};

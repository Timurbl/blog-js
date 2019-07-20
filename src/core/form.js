import {Validators} from './validators'

export class Form {
  constructor(form, controls) {
    this.form = form;
    this.controls = controls
  }

  value() {
    const value = {};

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    });

    return value
  }

  isValid() {
    let isFormValid = true;

    Object.keys(this.controls).forEach(control => {
      const validators = this.controls[control];

      let isValid = true;
      let invalid = [];
      validators.forEach(validator => {
        isValid = validator(this.form[control].value) && isValid;
        if (!isValid) {
          invalid.push(validator)
        }
      });

      if (!isValid) {
        setError(this.form[control], invalid[0])
      } else {
        clearError(this.form[control])
      }

      isFormValid = isFormValid && isValid

    });

    return isFormValid
  }

  clear() {
    Object.keys(this.controls).forEach(control => {
      this.form[control].value = ''
    });
  }
}

function setError($control, param) {
  clearError($control);
  let error = param === Validators.required
    ? `<p class="validation-error">Введите значение</p>`
    : `<p class="validation-error">Введите не менее 15 символов</p>`;
  $control.classList.add('invalid');
  $control.insertAdjacentHTML('afterend', error)
}

function clearError($control) {
  $control.classList.remove('invalid');

  if ($control.nextSibling) {
    $control.closest('.form-control').removeChild($control.nextSibling)
  }
}
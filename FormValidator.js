class FormValidator {
  constructor(form, button) {
    this.form = form;
    this.button = button;
    this.errorMessages = {
      empty: 'Это обязательное поле',
      wrongLength: 'Должно быть от 2 до 30 символов',
      wrongUrl: 'Здесь должна быть ссылка'
    }
  }

  checkInputValidity(input) { //Метод показывает ошибку, если инпуты не проходят валидацию. Если проходят — скрывает ошибку.
    this.errorElem = input.nextElementSibling;

    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      this.errorElem.textContent = input.validationMessage;
      return this.errorElem
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      this.errorElem.textContent = input.validationMessage;
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.wrongUrl);
      this.errorElem.textContent = input.validationMessage;
      return false
    }

    this.errorElem.textContent = input.validationMessage;
    return input.checkValidity();
  }

  setSubmitButtonState(state) { //Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет
    this.button = this.form.querySelector('.popup__button');

    if (state) {
      this.button.removeAttribute('disabled');
      this.button.classList.add(`popup__button_valid`);
    } else {
      this.button.setAttribute('disabled', true);
      this.button.classList.remove(`popup__button_valid`);
    }
  }

  handlerInputForm(evt) { //Добавляет необходимые для валидации обработчики всем полям формы
    const currentForm = evt.currentTarget;

    this.checkInputValidity(evt.target);

    if (currentForm.checkValidity()) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  }

  cleanError() { //очистка ошибок
    const error = this.form.querySelectorAll('.error');
    error.forEach(function (popup) {
      popup.textContent = '';
    });
  }
}

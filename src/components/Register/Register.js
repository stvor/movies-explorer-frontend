import React from 'react';
import './Register.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';

function Register({ onRegister, isSending, requestStatus }) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();
  const isDisabled = !isValid || isSending;

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  React.useEffect(() => {
    resetFrom({}, {}, false);
  }, [resetFrom]);

  return (
    <section className="register">
      <Form
        formName="register"
        titleText="Добро пожаловать!"
        submitButtonText="Зарегистрироваться"
        questionText="Уже зарегистрированы?"
        linkPath="/signin"
        linkText="Войти"
        isSubmitDisabled={isDisabled}
        onSubmit={handleSubmit}
        requestStatus={requestStatus}
      >
        <label className="form__label">
          <span className="form__label-text">Имя</span>
          <input
            value={values.name || ''}
            onChange={handleChange}
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            className="form__input form__input_type_name"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="name-input-error form__input-error">
            {errors.name || ''}
          </span>
        </label>

        <label className="form__label">
          <span className="form__label-text">E-mail</span>
          <input
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            name="email"
            placeholder="E-mail"
            className="form__input form__input_type_email"
            required
          />
          <span className="email-input-error form__input-error">
            {errors.email || ''}
          </span>
        </label>

        <label className="form__label" >
          <span className="form__label-text">Пароль</span>
          <input
            value={values.password || ''}
            onChange={handleChange}
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input form__input_type_password"
            required
          />
          <span className="password-input-error form__input-error">
            {errors.password || ''}
          </span>
        </label>
      </Form>
    </section>
  );
}

export default Register;

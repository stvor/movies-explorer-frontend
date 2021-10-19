import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import Logo from '../../images/logo.svg';

function Form({
  children,
  formName,
  titleText,
  submitButtonText,
  questionText,
  linkPath,
  linkText,
  isSubmitDisabled,
  onSubmit,
  requestStatus: { type, text }
}) {
  const apiFeedbackClassName = `form__api-feedback form__api-feedback_type_${type}`;
  const submitButtonClassName = `form__submit ${
    isSubmitDisabled && "form__submit_inactive"
  }`;

  return(
    <form
    onSubmit={onSubmit}
    className="form"
    name={formName}
    action="#"
    >
      <Link to="/">
        <img
          className="form__logo"
          src={Logo}
          alt="Логотип сайта"
        />
      </Link>
      <h1 className="form__title">{titleText}</h1>

      {children}

      <span
        className={apiFeedbackClassName}
      >{text}</span>

      <button
        type="submit"
        className={submitButtonClassName}
        disabled={isSubmitDisabled}
      >{submitButtonText}</button>

      <div className="form__sign-in-wrap">
        <p className="form__sign-in-question">{`${questionText} `}
        <Link className="form__sign-in-link" to={linkPath}>{linkText}</Link></p>
      </div>
    </form>
  );
}

export default Form;

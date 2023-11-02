import React from 'react';
import './AuthTemplate.css';
import authTemplateLogo from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';

function AuthTemplate(props) {
  return (
    <section className='auth-template'>
      <form className='auth-template__form' onSubmit={props.onSubmit}>
        <div className='auth-template__inputs'>
          <Link to={'/'} className='app-link auth-template__main-link'>
            <img className='auth-template__logo' src={authTemplateLogo} alt='Логотип' />
          </Link>

          <h2 className='app-text auth-template__title'>{props.title}</h2>
          {
            props.formFields.map(field => (
              <div key={field.name} className='auth-template__field'>
                <label className='app-text auth-template__form-label'>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className='app-text auth-template__form-input'
                  placeholder={field.placeholder}
                  value={props.values[field.name]}
                  onChange={props.handleInputChange}
                  onInput={props.handleValidation}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  required={field.isRequired}
                  pattern={field.pattern}
                />
                <span className='app-text auth-template__form-error-message'>{props.errorMessages[field.name]}</span>
              </div>
            ))
          }
        </div>

        <div className='auth-template__buttons'>
          <span className='app-text auth-template__server-error-message'>{props.serverErrorMessage}</span>
          <button
            type='submit'
            className={
              `app-text 
            app-link 
            auth-template__submit-button
            ${props.isSubmitButtonDisabled && 'auth-template__submit-button--disabled'}`
            }
            disabled={props.isSubmitButtonDisabled}
          >
            {props.submitButtonText}
          </button>
          <p className='app-text auth-template__bottom-text'>
            {props.bottomText}
            <Link className='app-text app-link auth-template__bottom-link' to={props.bottomLinkRoute}>
              {props.bottomLinkText}
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default AuthTemplate;
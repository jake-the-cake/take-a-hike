import { useState } from "react"

interface RegistrationFormErrorProps {
  emailError?: string,
  usernameError?: string,
  passwordError?: string,
  confirmEmailError?: string,
  displayNameError?: string,
}

export const RegisterForm = () => {
  const [ errorMessage, setErrorMessage ]: [ RegistrationFormErrorProps, React.Dispatch<React.SetStateAction<RegistrationFormErrorProps>>] = useState({})
  return (
    <form className='form__container' action="#">
      <div className='form__input--stacked-labels'>
        <label htmlFor="">What's your email address?</label>
        <input type="text" id='email-input' />
        {
          errorMessage.emailError &&
            <div className="form__error--message">
              { errorMessage.emailError }
            </div>
        }
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">Pick a unique username for yourself!</label>
        <input type="text" id='username-input' />
        {
          errorMessage.usernameError &&
            <div className="form__error--message">
              { errorMessage.usernameError }
            </div>
        }
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">
          <ul className='form__label--list'>
            Create a password for your account:
            <li>Must be at least 6 characters.</li>
            <li>Must contain at least one (1) letter.</li>
            <li>Must contain at least one (1) number.</li>
          </ul>
        </label>
        <input type="password" id='password-input' />
        {
          errorMessage.passwordError &&
            <div className="form__error--message">
              { errorMessage.passwordError }
            </div>
        }
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">Please verify that password below.</label>
        <input type="password" id='confirm-password-input' />
        {
          errorMessage.confirmEmailError &&
            <div className="form__error--message">
              { errorMessage.confirmEmailError }
            </div>
        }
      </div>
      <div className='form__input--highlighted'>
        <label htmlFor="">Lastly, what should we call you?<span>(optional)</span></label>
        <input type="text" id='name-input' />
        {
          errorMessage.displayNameError &&
            <div className="form__error--message">
              { errorMessage.displayNameError }
            </div>
        }
      </div>
      <button>Sign Up</button>
    </form>
  )
}
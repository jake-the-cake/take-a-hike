import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UseAxios } from "../hooks/UseAxios"
import AES from 'crypto-js/aes'

interface RegistrationFormErrorProps {
  emailError?: string,
  usernameError?: string,
  passwordError?: string,
  confirmPasswordError?: string,
  displayNameError?: string,
}

export const RegisterForm = () => {
  const [ errorMessage, setErrorMessage ]: [ RegistrationFormErrorProps, React.Dispatch<React.SetStateAction<RegistrationFormErrorProps>>] = useState({})
  const navigate = useNavigate()
  
  const handleRegistration = async ( event: FormEvent ) => {
    event.preventDefault()

    interface PasswordValidationProps {
      () : {
        hashedValue: string,
        matchedValue: string
      }
    }

    const passwordValidation: PasswordValidationProps = () => {
      const originalPassword = ( document.getElementById('password-input') as HTMLInputElement ).value
      const confirmedPassword = ( document.getElementById('confirm-password-input') as HTMLInputElement ).value
      const hashedPassword = AES.encrypt( originalPassword, process.env.REACT_APP_ENCRYPTION_KEY as string ).toString()
      const returnValues = {
        hashedValue: '',
        matchedValue: ''
      }

      if ( originalPassword !== confirmedPassword ) {
        returnValues.hashedValue = hashedPassword
        returnValues.matchedValue = 'x'
      }
      else if ( originalPassword === '' ) {
        console.log('no password')
      }
      else if ( originalPassword.split(' ').length > 1 ) {
        returnValues.hashedValue = 'x 1'
        returnValues.matchedValue = 'x 1'
      }
      else if ( originalPassword.length < 6 ) {
        returnValues.hashedValue = 'x1'
        returnValues.matchedValue = 'x1'
      }
      else if ( originalPassword.match(/^(-*[\d].*)$/) === null || originalPassword.match(/^(.*[A-Za-z].*)$/) === null ) {
        returnValues.hashedValue = 'x'
        returnValues.matchedValue = 'x'
      }
      else {
        returnValues.hashedValue = hashedPassword
        returnValues.matchedValue = 'yes'
      }

      return returnValues
    }

    const newUser = await UseAxios({
      method: 'post',
      path: '/auth/register',
      data: {
        email: ( document.getElementById('email-input') as HTMLInputElement ).value,
        username: ( document.getElementById('username-input') as HTMLInputElement ).value,
        password: passwordValidation().hashedValue,
        confirmedPassword: passwordValidation().matchedValue,
        displayName: ( document.getElementById('name-input') as HTMLInputElement ).value
      }
    }).then(( res ) => {
      console.log(res.data)
      return res.data
    }).catch(( err ) => {
      console.error(err.response.data.errors)
      return err.response.data
    })
    
    if ( newUser.errors ) {
      const currentErrors: RegistrationFormErrorProps = {}
      newUser.errors.forEach( ({ error }: any) => {
        //
        // can this be done cleaner?
        //
        switch ( error.errorAt ) {
          case 'email':
            currentErrors.emailError = error.message
            break
          case 'username':
            currentErrors.usernameError = error.message
            break
          case 'password':
            currentErrors.passwordError = error.message
            break
          case 'confirm-password':
            currentErrors.confirmPasswordError = error.message
            break
          case 'name':
            currentErrors.displayNameError = error.message
            break
          default:
            break
        }
      })
      setErrorMessage( currentErrors )
    }
    else {
      navigate('./success')
    }
  }
  
  return (
    <form className='form__container' action="#" onSubmit={ handleRegistration }>
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
          errorMessage.confirmPasswordError &&
            <div className="form__error--message">
              { errorMessage.confirmPasswordError }
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
      <button>
        Sign Up
      </button>
    </form>
  )
}
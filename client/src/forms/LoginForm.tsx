import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UseAxios } from "../hooks/UseAxios"

export const LoginForm = () => {
  const [ errorMessage, setErrorMessage ]: [string , React.Dispatch<React.SetStateAction<string>>] = useState('')
  const navigate = useNavigate()

  const handleLogin = async ( event: FormEvent ) => {
    event.preventDefault()
    await UseAxios({
      data: {
        loginName: (document.getElementById('user-input') as HTMLInputElement).value,
        password: (document.getElementById('password-input') as HTMLInputElement).value
      },
      method: 'post',
      path: '/auth/login'
    }).then( res => {
      setErrorMessage( res.data.message )
      navigate('/')
    }).catch(( err: any ) => {
      console.error( err )
      setErrorMessage( err.response.data.message )
    })
  }

  return (
    <form className='form__container' action="#" onSubmit={ handleLogin }>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">What's your email address or username?</label>
        <input type="text" id='user-input' />
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">Enter your password below.</label>
        <input type="password" id='password-input' />
      </div>
      {
        errorMessage &&
          <div className="form__error--message">
            { errorMessage }
          </div>
      }
      <button>
        Login
      </button>
    </form>
  )
}
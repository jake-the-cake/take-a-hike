import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UseAxios } from "../hooks/UseAxios"
import CryptoJS from "crypto-js"

export const LoginForm = () => {
  const [ errorMessage, setErrorMessage ]: [string , React.Dispatch<React.SetStateAction<string>>] = useState('')
  const navigate = useNavigate()

  const handleLogin = async ( event: FormEvent ) => {
    event.preventDefault()
    const userInput = ( document.getElementById( 'user-input' ) as HTMLInputElement ).value
    const passwordInput = ( document.getElementById( 'password-input' ) as HTMLInputElement ).value

    const decrypt = ( hash: string ) => {
      const bytes  = CryptoJS.AES.decrypt( hash , `${ process.env.REACT_APP_ENCRYPTION_KEY }` )
      return bytes.toString( CryptoJS.enc.Utf8 )
    }

    const findUser = await UseAxios({
      method: 'post',
      path: '/auth/login',
      data: {
        loginName: userInput,
      }
    }).then( res => {
      setErrorMessage( res.data.message )
      return res.data
    }).catch(( err: any ) => {
      setErrorMessage( err.response.data.message )
    })
    if ( await findUser !== undefined && await findUser.response === 'PENDING' ) {
      const loginData = {
        username: await findUser.user,
        password: ''
      }
      if ( passwordInput === decrypt( await findUser.hash )) {
        loginData.password = await findUser.hash
      }
      else {
        console.log( await findUser)
        loginData.password = passwordInput
      }
      await UseAxios({
        method: 'post',
        path: '/auth/verify-login',
        data: loginData
      }).then( res => {
        navigate('/')
      }).catch(( err: any ) => {
        setErrorMessage( err.response.data.message )
      })
    }
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
import axios from "axios"
import { FormEvent } from "react"

export const LoginForm = () => {
  const handleLogin = async ( event: FormEvent ) => {
    event.preventDefault()
    console.log('clickity')
    const data = await axios.post('http://localhost:4200/auth/login', {
      loginName: (document.getElementById('user-input') as HTMLInputElement).value,
      password: (document.getElementById('password-input') as HTMLInputElement).value
    }).then(data => console.log(data.data)).catch(( err: any ) => console.error( err.message ))
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
      <button>
        Login
      </button>
    </form>
  )
}
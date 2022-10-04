export const LoginForm = () => {
  return (
    <form className='form__container' action="#">
      <div className='form__input--stacked-labels'>
        <label htmlFor="">What's your email address or username?</label>
        <input type="text" id='email-input' />
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">Enter your password below.</label>
        <input type="password" id='confirm-password-input' />
      </div>
      <button>Login</button>
    </form>
  )
}
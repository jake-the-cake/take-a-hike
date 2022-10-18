import { Link } from "react-router-dom"
import { MainCard } from "../components/MainCard/MainCard"
import { LoginForm } from "../forms/LoginForm"
import { homePage, loginPage } from "../objects/navHistoryObjects"

export const Login = () => {
  return (
    <MainCard
      title="Login to ELEVATE"
      subtitle="Enter your email and password in the form below to access your account."
      content={
        <>
          <LoginForm />
          <div className="form__footer--container">
            <div className="form__footer--text">
              Don't have an account? 
            </div>
            <Link className="form__footer--link" to={'/register'}>Get one for FREE</Link>
          </div>
        </>
      }
      history={[
        homePage,
        loginPage
      ]}
    />
  )
}
import { Link } from "react-router-dom"
import { MainCard } from "../components/MainCard/MainCard"
import { RegisterForm } from "../forms/RegisterForm"
import { homePage, loginPage } from "../objects/navHistoryObjects"

export const Login = () => {
  return (
    <MainCard
      title="Login to ELEVATE"
      subtitle="Enter your email and password in the form below to access your account."
      content={
        <>
          <RegisterForm />
          <div>
            Don't have an account? <Link to={'/register'}>Get a FREE Account</Link>
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
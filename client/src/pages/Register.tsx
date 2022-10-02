import { Link } from "react-router-dom"
import { MainCard } from "../components/MainCard/MainCard"
import { RegisterForm } from "../forms/RegisterForm"
import { homePage, registerPage } from "../objects/navHistoryObjects"

export const Register = () => {
  return (
    <MainCard
      title="Create A New Account"
      subtitle="Fill out the registration form below to get access to all of the personalized tools on Elevate!"
      content={
        <>
          <RegisterForm />
          <div>
            Already have an account? <Link to={'/login'}>Login here</Link>
          </div>
        </>
      }
      history={[
        homePage,
        registerPage
      ]}
    />
  )
}
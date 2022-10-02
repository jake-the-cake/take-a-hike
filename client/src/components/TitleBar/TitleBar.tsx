import { accountNavigation, communityNavigation, hikesNavigation, lifestyleNavigation, resourcesNavigation, sceneryNavigation } from '../../objects/navigationObjects';
import { Navigation } from './subcomponents/Navigation';
import './TitleBar.css'

const Logo = () => {
  return (
    <div className="titlebar__title">
      <div className='titlebar__title--text'>
        Elevate
      </div>
      <div className='titlebar__title--subtext'>
        Mountain Fitness
      </div>
      <img
        src='./images/logo.png'
        alt="Elevate Logo"
        className='titlebar__title--logo'
      />
    </div>
  )
}

export const TitleBar = () => {
  return (
    <div className='titlebar__container'>
        <div className="titlebar__nav">
          <Navigation
            side='left'
            links={[
              lifestyleNavigation,
              hikesNavigation,
              sceneryNavigation,
            ]}
          />
        </div>
        <Logo />
        <div className="titlebar__nav">
          <Navigation
            side='right'
            links={[
              accountNavigation,
              communityNavigation,
              resourcesNavigation,
            ]}
          />
        </div>
    </div>
  )
}
import React, { FC } from 'react';
import { hikesNavigation, NavigationLinkMenuProps, NavigationLinkProps } from '../../objects/navigationObjects';
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

const Navigation: FC<{ links: NavigationLinkMenuProps[] }> = ({ links }) => {
  return (
    <>
      {
        links.map(( link: NavigationLinkMenuProps, index: number ) => (
          <>{ link.text }
            { link.dropdown && link.dropdown.map(( sublink: NavigationLinkProps, index: number ) => (
              <>
                { sublink.text }
              </>
            )) }
          </>
        ))
      }
    </>
  )
}


export const TitleBar = () => {
  return (
    <div className='titlebar__container'>
        <div className="titlebar__nav nav__left">
          <Navigation
            links={[
              hikesNavigation,
              hikesNavigation,
            ]}
          />
        </div>
        <Logo />
        <div className="titlebar__nav nav__right">
          right navigation
        </div>
    </div>
  )
}
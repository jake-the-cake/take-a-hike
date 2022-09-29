import React, { FC } from 'react';
import { hikesNavigation, NavigationLinkMenuProps, NavigationLinkProps, resourcesNavigation } from '../../objects/navigationObjects';
import './TitleBar.css'

interface NavigationBuildProps {
  ( props: {
    links: NavigationLinkMenuProps[],
    side: string
  }) : JSX.Element
}

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

const Navigation: NavigationBuildProps = ({ links, side }) => {
  return (
    <>
      {
        links.map(( link: NavigationLinkMenuProps, index: number ) => (
          <>
            <div key={`nav-${ side }-${ index }`} className='nav__link--main'>
              { link.text }
            </div>
            { link.dropdown && link.dropdown.map(( sublink: NavigationLinkProps, index: number ) => (
              <div key={`subnav-${ side }-${ index }`} className='nav__link--dropdown'>
                { sublink.text }
              </div>
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
            side='left'
            links={[
              hikesNavigation,
              hikesNavigation,
            ]}
          />
        </div>
        <Logo />
        <div className="titlebar__nav nav__right">
          <Navigation
            side='right'
            links={[
              resourcesNavigation,
              resourcesNavigation,
            ]}
          />
        </div>
    </div>
  )
}
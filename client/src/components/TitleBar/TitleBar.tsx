import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { accountNavigation, communityNavigation, hikesNavigation, lifestyleNavigation, NavigationLinkMenuProps, NavigationLinkProps, resourcesNavigation, sceneryNavigation } from '../../objects/navigationObjects';
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
  useEffect(() => {
    const navLinks = document.getElementsByClassName('__nav--searchable') as HTMLCollectionOf<HTMLDivElement>
    const navLinkArray = []
    for ( let i = 0; i < navLinks.length; i++ ) {
      navLinkArray.push(navLinks[i])
    }
    navLinkArray.forEach(( hoveredLink, index: number) => {
      const numberOfElements: number = hoveredLink.children.length
      const elementArray: HTMLDivElement[] = []

      const mouseOverEvent = () => {
        let position = 1
        elementArray.forEach((item:any) => {
          position += 2
          item.style.top = `${ position }rem`
        })
      }

      for (let i=1; i < numberOfElements; i++) {
        elementArray.push(hoveredLink.children[i] as HTMLDivElement)
      }
      hoveredLink.addEventListener('mouseover', mouseOverEvent)
      hoveredLink.addEventListener('mouseout', (e: MouseEvent) => {
        console.log(e)
        elementArray.forEach((item:any) => {
          item.style.top = '0'
        })
      })
    })
  },[])

  return (
    <>
      {
        links.map(( link: NavigationLinkMenuProps, index: number ) => (
          <div id={`nav-${ side }-${ index }`} className='nav__link--container __nav--searchable' key={`${ side }-${ index }`}>
            <div key={`nav-${ side }-${ index }`} className='nav__link--main'>
              <Link className='nav__link--dropdown-link' to={ link.url ? link.url  : '/' } >{ link.text }</Link>
            </div>
            { link.dropdown && link.dropdown.map(( sublink: NavigationLinkProps, index: number ) => (
              <div key={`subnav-${ side }-${ index }`} className={`nav__link--dropdown nav__${ side }`}>
                <Link className='nav__link--dropdown-link' to={(link.url && sublink.url) ? link.url + sublink.url  : '/'}>{ sublink.text }</Link>
              </div>
            )) }
          </div>
        ))
      }
    </>
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
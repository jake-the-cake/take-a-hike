import { useEffect } from "react"
import { Link } from "react-router-dom"
import { NavigationLinkMenuProps, NavigationLinkProps } from "../../../objects/navigationObjects"

interface NavigationBuildProps {
  ( props: {
    links: NavigationLinkMenuProps[],
    side: string
  }) : JSX.Element
}

export const Navigation: NavigationBuildProps = ({ links, side }) => {
  useEffect(() => {
    const navLinks = document.getElementsByClassName('__nav--searchable') as HTMLCollectionOf<HTMLDivElement>
    const navLinkArray = []
    for ( let i = 0; i < navLinks.length; i++ ) {
      navLinkArray.push(navLinks[i])
    }
    navLinkArray.forEach(( hoveredLink, index: number) => {
      
      const numberOfElements: number = hoveredLink.children.length
      const elementArray: HTMLDivElement[] = []
      
      const expandDropdown = () => {
        let position = 1
        elementArray.forEach((item:any) => {
          position += 2
          item.style.top = `${ position }rem`
        })
      }

      const collapseDropdown = () => {
        elementArray.forEach((item:any) => {
          item.style.top = '0'
        })
      }
      
      for (let i=1; i < numberOfElements; i++) {
        elementArray.push(hoveredLink.children[i] as HTMLDivElement)
      }
      hoveredLink.addEventListener('click', collapseDropdown)
      hoveredLink.addEventListener('mouseover', expandDropdown)
      hoveredLink.addEventListener('mouseout', collapseDropdown)
    })
  },[])

  return (
    <>
      {
        links.map(( link: NavigationLinkMenuProps, index: number ) => (
          <div id={`nav-${ side }-${ index }`} className='nav__link--container __nav--searchable' key={`${ side }-${ index }`}>
            <div key={`nav-${ side }-${ index }`} className={`nav__link--main ${ link.type }`}>
              {
                link.url
                ? (
                  <Link className='nav__link--dropdown-link' to={ link.url } >{ link.text }</Link>
                )
                : (
                  <div className='nav__link--dropdown-link'>{ link.text }</div>
                )
              }
            </div>
            { link.dropdown && link.dropdown.map(( sublink: NavigationLinkProps, index: number ) => (
              <div key={`subnav-${ side }-${ index }`} className={`nav__link--dropdown nav__${ side }`}>
                <Link key={`subnav-link-${ side }-${ index }`} className='nav__link--dropdown-link' to={
                  (link.url && sublink.url)
                  ? link.url + sublink.url
                  : ( !link.url && sublink.url )
                    ? sublink.url
                    : '/'
                }>
                  { sublink.text }
                </Link>
              </div>
            )) }
          </div>
        ))
      }
    </>
  )
}

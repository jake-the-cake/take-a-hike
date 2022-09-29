export type NavigationLinkProps = {
  type: string,
  url?: string,
  text: string
}

export interface NavigationLinkMenuProps {
  type: string,
  url?: string,
  text: string,
  dropdown?: NavigationLinkProps[]
}


/*
  ::: Hikes
*/

const hikesSubNavigation: NavigationLinkProps[] = [
  {
    type: 'link',
    url: '/find',
    text: 'Find By Location'
  },
  {
    type: 'link',
    url: '/popular',
    text: 'Most Popular'
  }
]

export const hikesNavigation: NavigationLinkMenuProps = {
  type: 'droplink',
  url: '/hikes',
  text: 'Hikes',
  dropdown: hikesSubNavigation
}
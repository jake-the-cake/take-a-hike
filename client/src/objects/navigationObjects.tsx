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


/*
  ::: Lifestyle
*/
export const lifestyleNavigation: NavigationLinkMenuProps = {
  type: 'droplink',
  url: '/lifestyle',
  text: 'Lifestyle',
  dropdown: [{
    type: 'link',
    url: '/idk',
    text: 'Sublink'
  }]
}


/*
  ::: Community
*/
export const communityNavigation: NavigationLinkMenuProps = {
  type: 'droplink',
  url: '/community',
  text: 'Community',
  dropdown: [{
    type: 'link',
    url: '/idk',
    text: 'Sublink'
  }]
}


/*
  ::: Resources
*/
export const resourcesNavigation: NavigationLinkMenuProps = {
  type: 'droplink',
  url: '/resources',
  text: 'Resources',
  dropdown: [{
    type: 'link',
    url: '/idk',
    text: 'Sublink'
  }]
}
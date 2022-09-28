import { MainCard } from "../components/MainCard/MainCard"
import { findAHikeWidget } from "../objects/sideComponentObjects"

export const Find = () => {
  const queryStringCheck: string | null  = new URLSearchParams( window.location.search ).get('location')

  return (
    <MainCard
      title="Find A Hike"
      subtitle="Use your location and the search filters to find the right hike for you today."
      content={
        <>Searching for: { queryStringCheck }</>
      }
      components={[
        findAHikeWidget
      ]}
      history={[
        'Home',
        'Find Hikes'
      ]}
    />
  )
}
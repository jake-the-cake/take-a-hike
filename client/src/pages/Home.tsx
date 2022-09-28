import { FakeComponent } from "../components/FakeComponent"
import { MainCard } from "../components/MainCard/MainCard"

interface HomeProps {
  (): JSX.Element
}

export const Home: HomeProps = () => {
  return (
    <MainCard
      title="page title"
      subtitle="subtitle text on the page"
      content={
        <div>
          ?
        </div>
      }
      components={[
        {
          element: <FakeComponent />,
          title: 'Find A Hike'
        },
        {
          element: <FakeComponent />,
          title: 'Trail Conditions'
        },
        {
          element: <FakeComponent />,
          title: 'Recent Reviews'
        },
      ]}
      history={[
        'Home',
      ]}
    />
  )
}
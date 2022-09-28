import { FakeComponent } from "../components/FakeComponent"
import { MainCard } from "../components/MainCard/MainCard"
import { FindAHikeWidget } from "../components/side-components/FindAHikeWidget/FindAHikeWidget"
import { findAHikeWidget } from "../objects/sideComponentObjects"

interface HomeProps {
  (): JSX.Element
}

// let x = [{
//   element: <FakeComponent />,
//   title: 'Trail Conditions'
// },
// {
//   element: <FakeComponent />,
//   title: 'Recent Reviews'
// },]

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
        findAHikeWidget,
      ]}
      history={[
        'Home',
        'Home',
      ]}
    />
  )
}
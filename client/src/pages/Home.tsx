import { MainCard } from "../components/MainCard/MainCard"
import { homePage } from "../objects/navHistoryObjects"
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
      title="home page"
      subtitle="this is where a small blob of text can go"
      content={
        <div>
          ?
        </div>
      }
      components={[
        findAHikeWidget,
      ]}
      history={[
        homePage,
      ]}
    />
  )
}
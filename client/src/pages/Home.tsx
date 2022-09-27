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
        <FakeComponent />,
        <FakeComponent />,
        <FakeComponent />
      ]}
      history={[
        'Home',
      ]}
    />
  )
}
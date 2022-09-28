import { MainCard } from "../components/MainCard/MainCard"
import { findAHikeWidget } from "../objects/sideComponentObjects"

interface HomeProps {
  (): JSX.Element
}

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
    />
  )
}
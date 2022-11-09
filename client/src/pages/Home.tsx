import { MainCard } from "../components/MainCard/MainCard"
import { EventForm } from "../forms/EventForm"
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
          <EventForm />
        </div>
      }
      components={[
        findAHikeWidget,
      ]}
    />
  )
}
import { MainCard } from "../../components/MainCard/MainCard"
import { EventForm } from "../../forms/EventForm"

export const AddEvent = () => {
  return (
    <MainCard
      title="Events"
      content={
        <EventForm />
      }
    />
  )
}
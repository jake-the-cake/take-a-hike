import { MainCard } from "../../components/MainCard/MainCard"
import { hikesPage, homePage } from "../../objects/navHistoryObjects"

export const Hikes = () => {
  return (
    <MainCard
      content={
        <>
          Todo = breakneck, knifes edge 
        </>
      }
      history={[
        homePage,
        hikesPage,
      ]}
    />
  )
}
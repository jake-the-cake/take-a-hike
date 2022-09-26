import { MainCard } from "../components/MainCard/MainCard"

interface HomeProps {
  (): JSX.Element
}

export const Home: HomeProps = () => {
  return (
    <MainCard
      content={
        <>
          Go through the card
        </>
      }
    />
  )
}
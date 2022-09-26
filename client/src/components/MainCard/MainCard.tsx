import './MainCard.css'

interface MainCardProps {
  (
    props: {
      content: JSX.Element
    }
  ): JSX.Element
}

export const MainCard: MainCardProps = ({ content }) => {
  return (
    <div className="maincard__container">
      <span>{ content }</span>
      <span>stuff</span>
    </div>
  )
}
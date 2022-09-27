import './MainCard.css'

interface MainCardProps {
  (
    props: {
      content: JSX.Element,
      title?: string,
      subtitle?: string
    }
  ): JSX.Element
}

export const MainCard: MainCardProps = ({ content, title, subtitle }) => {
  return (
    <div className="maincard__container">
      {
        ( title || subtitle ) && (
          <div className='maincard__header'>
            { title }
          </div>
        )
      }

      <span>{ content }</span>
    </div>
  )
}
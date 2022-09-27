import './MainCard.css'

interface MainCardProps {
  (
    props: {
      content: JSX.Element,
      title?: string,
      subtitle?: string,
      components?: JSX.Element[]
    }
  ): JSX.Element
}

export const MainCard: MainCardProps = ({ content, title, subtitle, components }) => {
  return (
    <div className="maincard__container">
      <div className='maincard__history--container'>
        Home - Home 
      </div>
      {
        ( title || subtitle ) && (
          <div className='maincard__header'>
            <div className='maincard__header-title'>
              { title }
            </div>
            <div className='maincard__header--subtitle'>
              { subtitle }
            </div>
          </div>
        )
      }
      <div className='maincard__content'>
        <div className='maincard__content--main'>
          { content }
        </div>
        {
          components && (
            <div className='maincard-content--side'>
              { components.map( (component: JSX.Element, index: number ) => (
                <div key={`sidecomponent-${ index }`} className='maincard__component--container'>
                  <div className='maincard__component--header'>
                    Title
                  </div>
                  <div className='maincard__component--main'>
                    { component }
                  </div>
                </div>
              )) }
            </div>
          )
        }
      </div>
    </div>
  )
}
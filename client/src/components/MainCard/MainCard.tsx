import './MainCard.css'

type SideComponentProps = {
    element: JSX.Element,
    title: string
}

interface MainCardProps {
  (
    props: {
      content: JSX.Element,
      title?: string,
      subtitle?: string,
      components?: SideComponentProps[],
      history?: string[]
    }
  ): JSX.Element
}

export const MainCard: MainCardProps = ({ content, title, subtitle, components, history }) => {
  return (
    <div className="maincard__container">
      {
        history && (
          <div className='maincard__history--container'>
            {
              history.map(( item: string, index: number ) => (
                <>
                  <div className='maincard__history--link'>
                    { item }
                  </div>
                  {
                    index < ( history.length - 1 ) && (
                      <div className='maincard__history--divider'>
                        &#9658;
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>
        )
      }
      {
        ( title || subtitle ) && (
          <div className='maincard__header'>
            <div className='maincard__header--title'>
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
            <div className='maincard__content--side'>
              { components.map( ( { element, title }: SideComponentProps, index: number ) => (
                <div key={`sidecomponent-${ index }`} className='maincard__component--container'>
                  <div className='maincard__component--header'>
                    { title }
                  </div>
                  <div className='maincard__component--main'>
                    { element }
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
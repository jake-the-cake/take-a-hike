import { Link } from 'react-router-dom'
import { SideComponentProps } from '../../objects/sideComponentObjects'
import './MainCard.css'


type NavHistoryProps = {
  name: string,
  url: string
}

interface MainCardProps {
  (
    props: {
      content: JSX.Element,
      title?: string,
      subtitle?: string,
      components?: SideComponentProps[],
      history?: NavHistoryProps[]
    }
  ): JSX.Element
}

export const MainCard: MainCardProps = ({ content, title, subtitle, components, history }) => {
  const [ links, page] = [history?.slice(0, history.length - 1), history?.slice(-1)]
  return (
    <div className="maincard__container">
      {
        history ? (
          <div className='maincard__history--container'>
            {
              links!.map(( item: NavHistoryProps, index: number ) => (
                <div key={`historydiv-${ index }`} style={{display: 'flex', gap: '1rem'}}>
                  <Link to={ item.url } key={`historylink-${ index }`} className='maincard__history--link'>
                    { item.name }
                  </Link>
                      <div key={`historydivider-${ index }`} className='maincard__history--divider'>
                        &#9658;
                      </div>
                </div>
              ))
            }
            <div className='maincard__history--nonlink'>
                    { page![0].name }
                  </div>
          </div>
        ) : <div className='nothing'></div>
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
              { components.map( ( { Element , title }: SideComponentProps, index: number ) => (
                <div key={`sidecomponent-${ index }`} className='maincard__component--container'>
                  <div className='maincard__component--header'>
                    { title }
                  </div>
                  <div className='maincard__component--main'>
                    { <Element /> }
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
import { MainCard } from "../../components/MainCard/MainCard"
import '../../components/Gallery/Gallery.css'
import { homePage } from "../../objects/navHistoryObjects"

interface MediaItemProps {
  title: string,
  image: string,
  timestamp: number,
  user: string
}

const GalleryTile = (value: any) => {
  const { item, index } = value
  const date = new Date(item.timestamp).toLocaleDateString() 
  const time = new Date(item.timestamp).toLocaleTimeString() 
  const title = () => {
    const MAX_TITLE_LENGTH = 15
    if ( item.title.length > MAX_TITLE_LENGTH ) {
      return `${ item.title.slice(0, MAX_TITLE_LENGTH) }...`
    }
    return item.title
  }
  return (
    <div key={`${ item.title }-${ index }`} className="gallery__tile">
      <div className="gallery__tile--title">
        { title() }
      </div>
      <div className="gallery__tile--image">
        <img src={ item.image } alt='filler' />
      </div>
      <div className="gallery__tile--stats">
        <div className="gallery__tile--stat">
          <div>from</div><div className="blue-text large-stat">{ item.user }</div>
        </div>
        <div className="gallery__tile--stat right-stat">
          on { date }<br />at { time }
        </div>  
      </div>
    </div>
  )
}

export const Scenery = () => {
  const mediaItems: MediaItemProps[] = [
    {
      title: 'This has a longer title',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'jake'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'username'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'fake_person'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'whosethis'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'dgr55eeed'
    },
  ]
  return (
    <MainCard 
      title="Take a look around"
      subtitle="Always take a moment to stop and appreciate the beauty all around us"
      content={
        <div className="gallery__container">
          <div className="gallery__header--container">
            <div className="gallery__header--control">
              - Hide
            </div>
            <div className="gallery__header--title">
              Photo Gallery
            </div>
          </div>
          <div className="gallery__body--container">
            {
              mediaItems.map((item: any, index: number) => (
                <GalleryTile key={`photo-gallery-tile-${ index }`} item={ item } index={ index } />
              ))
            }
          </div>
        </div>
      }
      history={[
        homePage,
        
      ]}
    />
  )
}
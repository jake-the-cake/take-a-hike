import { MainCard } from "../components/MainCard/MainCard"
import '../components/Gallery/Gallery.css'

interface MediaItemProps {
  title: string,
  image: string,
  timestamp: number,
  user: string
}

const GalleryTile = (value: any, index: number) => {
  console.log(value)
  console.log(index)
  const { item } = value
  const date = new Date(item.timestamp).toLocaleDateString() 
  const time = new Date(item.timestamp).toLocaleTimeString() 
  return (
    <div className="gallery__tile">
      <div className="gallery__tile--title">{ item.title }</div>
      <div className="gallery__tile--image">
        <img src={ item.image } alt='filler' />
      </div>
      <div className="gallery__tile--stats">
        <div className="gallery__tile--stat">
          from { item.user }
        </div>
        <div className="gallery__tile--stat small-stat">
          on { date }<br />at { time }
        </div>  
      </div>
    </div>
  )
}

export const Scenery = () => {
  const mediaItems: MediaItemProps[] = [
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'jake'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'jake'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'jake'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'jake'
    },
    {
      title: 'This image',
      image: '/images/logo.png',
      timestamp: Date.now(),
      user: 'jake'
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
                <GalleryTile item={ item } index={ index } />
              ))
            }
          </div>
        </div>
      }
    />
  )
}
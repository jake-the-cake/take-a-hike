import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../SideComponents.css'

export const FindAHikeWidget = () => {
  const navigate = useNavigate()

  const handleFindByLocation = ( event: FormEvent ) => {
    event.preventDefault()
    const locationValue = (document.getElementById('findbylocation') as HTMLInputElement).value
    console.log(`Search for: ${ locationValue }`)
    navigate(`/hikes/find?location="${ locationValue }"`)
  }
  
  return (
    <form className="widget__form--container" onSubmit={ handleFindByLocation }>
      <div className="widget__form--row">
        <label htmlFor="findbylocation" className='widget__form--label'>
          Location
        </label>
        <input type="text" placeholder='ZIP or City' name="findbylocation" id="findbylocation" className='widget__form--input' size={ 5 } />
      </div>
      <button className='widget__form--button'>Find</button>
    </form>
  )
}
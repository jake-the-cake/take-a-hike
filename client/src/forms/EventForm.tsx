import { FormEvent } from "react"

export const EventForm = () => {



  return (
    <form className='form__container' action="#" onSubmit={( e: FormEvent ) => e.preventDefault() }>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">What is your event name?</label>
        <input type="text" id='name-input' />
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">Where is it located?</label>
        <input type="text" id='location-input' />
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">What is going on there?</label>
        <input type="text" id='location-input' />
      </div>
      <div className='form__input--stacked-labels'>
        <label htmlFor="">When is it?</label>
        <input type="text" id='location-input' />
      </div>
      <button>
        Continue
      </button>
    </form>
  )
}
import React from 'react'
import './List.css'

interface ListFormatProps {
  maxLines: number,
  paginate: boolean
}

interface ListConfigProps {
  columnTitles: string[]
}

interface ListProps {
  title: string,
  data: any[],
  format?: ListFormatProps,
  config?: ListConfigProps
}

export const List: ( props: ListProps ) => JSX.Element = ({ title, data, format, config }) => {
  
  if ( !format ) {
    format = {
      maxLines: 10,
      paginate: false
    }
  }
  console.log(format)


  return (
    <div className='list__container'>
      { title }
      { data.map(( item ) => {
        return (
          <p>{ JSON.stringify( item )}</p>
        )
      })}
    </div>
  )
}
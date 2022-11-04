import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
  format?: ListFormatProps,
  config?: ListConfigProps
}

export const List: ( props: ListProps ) => JSX.Element = ({ title, format, config }) => {
  // State variables
  const [ listData, setListData ]: [ any[], any ] = useState( [] )
  const [ listColumns, setListColumns ]: [ any[], any ] = useState( [] )

  // Set defaults for undefined objects
  if ( !format ) format = {
      maxLines: 10,
      paginate: false
  }
  if ( !config ) config = {
    columnTitles: []
  }

  // TEMP DISABLE CUSTOM TITLES BELOW
  config.columnTitles = []
  
  const UseAxios: () => Promise<void> = async () => {
    const { data }: { data: any[] } = await axios({
      method: 'GET',
      url: 'http://localhost:4200/users/all'
    })
    .then( res => {
      return res.data
    })
    .catch( err => {
      console.error( err.message )
    })
    if ( data.length !== 0 ) setListData( data )
  }

  useEffect(() => {
    if ( listData.length === 0 ) UseAxios()
    else {
      const columns: any[] = []
      Object.keys( listData[0] ).forEach( key => {
        if ( key !== '__v' ) columns.push({ title: key, name: key })
      })
      if ( config?.columnTitles.length !== 0 ) columns.forEach(( col, index ) => {
        if ( index < config!.columnTitles.length ) {
          columns[ index ].title = config?.columnTitles[ index ]
        }
      })
      columns.forEach(( column, index ) => {
        columns[ index ].title = column.title.replace( '_', '' )
        const splitTitle = column.title.split( '' )
        splitTitle.forEach(( letter, idx ) => {
          if ( letter.match(/^[A-Z]$/) ) splitTitle[ idx ] = ' ' + letter
        })
        splitTitle[ 0 ] = splitTitle [ 0 ].toUpperCase()
        columns[ index ].title = splitTitle.join( '' )
      })
      setListColumns( columns )
    }
    return () => { return }
  }, [ listData ])

  const formatDates = ( item: any, name: string ) => {
    if ( name === 'createdAt' || name === 'updatedAt' ) {
      return `${ new Date(item[ name ]).toDateString() } @ ${ new Date( item[ name ]).toLocaleTimeString() }`
    }
    else return item[ name ]
  }

  return (
    <div className='list__container'>
      <div className='list__title'>
        <span className='list__title--text'>{ title }</span>
      </div>
      <div className='list__header--container'>
        { listColumns.map(( item, index ) => (
          <div key={ `${ title }-header-cell-${ index }` } className='list__header--cell'>{ item.title }</div>
        ))}
      </div>
      {
        listData.map(( item, index ) => (
          <div key={ `${ title }-row-${ index }` } className='list__row'>
            {
              listColumns.map(( col ) => (
                <div className='list__row--cell'>
                  { formatDates( item, col.name )}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
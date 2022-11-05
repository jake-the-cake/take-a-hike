import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './List.css'

interface ListFormatProps {
  maxLines: number,
  paginate: boolean
}

interface ListConfigProps {
  columnTitles?: string[]
}

interface ListProps {
  title: string,
  api: string,
  format?: ListFormatProps,
  config?: ListConfigProps
}

export const List: ( props: ListProps ) => JSX.Element = ({ title, api, format, config }) => {
  // State variables
  const [ listData, setListData ]: [ any[], any ] = useState( [] )
  const [ listColumns, setListColumns ]: [ any[], any ] = useState( [] )

  // Set defaults for undefined objects
  if ( !format ) format = {
      maxLines: 10,
      paginate: false
  }
  if ( !config?.columnTitles ) config = {
    columnTitles: [], ...config
  }

  // TEMP DISABLE CUSTOM TITLES BELOW
  config.columnTitles = []
  
  // Refactor this
  const UseAxios: () => Promise<void> = async () => {
    const baseURL = 'http://localhost:4200'
    const { data }: { data: any[] } = await axios({
      method: 'GET',
      url: `${ baseURL }/${ api }/all`
    })
    .then( res => {
      return res.data
    })
    .catch( err => {
      console.error( err.message )
    })
    if ( data.length !== 0 ) setListData( data )
  }

  const ignoreColumns = [
    '__v',
    'nickname'
  ]

  useEffect(() => {
    if ( listData.length === 0 ) UseAxios()
    else {
      const columns: any[] = []
      Object.keys( listData[0] ).forEach( key => {
        if ( ignoreColumns.filter( title => title === key ).length === 0 ) columns.push({ title: key, name: key })
      })
      // Check for custom titles
      if ( config!.columnTitles!.length !== 0 ) columns.forEach(( col, index ) => {
        if ( index < config!.columnTitles!.length ) {
          if ( config!.columnTitles![ index ] !== '' ) columns[ index ].title = config!.columnTitles![ index ]
        }
      })
      // Format column titles
      columns.forEach(( column: any, index: number ) => {
        columns[ index ].title = column.title.replace( '_', '' )
        const splitTitle = column.title.split( '' )
        splitTitle.forEach(( letter: string, idx: number ) => {
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
        { // display column titles
          listColumns.map(( item, index ) => (
            <div key={ `${ title }-header-cell-${ index }` } className='list__header--cell'>{ item.title }</div>
          ))
        }
      </div>

      { // display data or 'no data' message
        listData.length > 0
        ? listData.map(( item, index ) => (
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
        : <div className='list__row'>No data.</div>  
      }

    </div>
  )
}
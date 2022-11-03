import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { List } from './components/ListComponent/List'

const App = () => {
  return (
    <>
      <List title='I did not give A title' data={ [
        {
          test: 'fake data'
        }
      ] } />
    </>
  )
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
root.render( <App /> )
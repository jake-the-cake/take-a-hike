import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './App.css'
import { List } from './components/ListComponent/List'

const App = () => {


  return (
    <React.StrictMode>
      <List title='Users' config={{ columnTitles: ['one','more','column name']}} />
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
root.render( <App /> )
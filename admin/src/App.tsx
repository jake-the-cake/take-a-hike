import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { List } from './components/ListComponent/List'

const App = () => {


  return (
    <React.StrictMode>
      <List
        title='Users'
        api='users'
        //config={{ columnTitles: ['one','','column name']}}
      />
      <List
        title='Events'
        api='events'
      />
      <List
        title='Trails'
        api='trails'
      />
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
root.render( <App /> )
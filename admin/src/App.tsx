import React from 'react'
import ReactDOM from 'react-dom/client'
import { TestComponent } from './components/Test'

const App = () => {
  return (
    <>
      <h1>You've arrived</h1>
      <TestComponent />
    </>
  )
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
root.render( <App /> )
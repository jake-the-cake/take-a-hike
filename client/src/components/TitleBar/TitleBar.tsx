import React from 'react';
import './TitleBar.css'

export const TitleBar = () => {
  return (
    <div className='titlebar__container'>
      <div className="titlebar__logo--box">
        <div className="titlebar__logo--tree">
          <div className="titlebar__logo--tree-top tri"></div>
          <div className="titlebar__logo--tree-middle tri"></div>
          <div className="titlebar__logo--tree-bottom tri"></div>
          <div className="titlebar__logo--tree-trunk"></div>
        </div>

        <div className="titlebar__logo--tree tree2">
          <div className="titlebar__logo--tree-top tri"></div>
          <div className="titlebar__logo--tree-middle tri"></div>
          <div className="titlebar__logo--tree-bottom tri"></div>
          <div className="titlebar__logo--tree-trunk"></div>
        </div>

        <div className="titlebar__logo--title">
          <span className='logo-title-top'>Take<br />A</span>
          <span className='logo-title-bottom'>HIKE</span></div>
      
      </div>
      <div className="titlebar__image--box">Photo</div>
    </div>
  )
}
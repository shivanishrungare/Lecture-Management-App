import React from 'react'
import {Link} from 'react-router-dom'
import './SideMenu.css'

export const SideMenu = () => {
  return (
    <>
    <div className='sidemenu'>
      <div className='sidemenu-main'>
            <Link className='icon home'></Link>
            <Link className='icon status'></Link>
            <Link className='icon adminhub'></Link>
            <Link className='icon help'></Link>
        </div>
        <div className='sidemenu-extra'>
            <Link className='icon settings'></Link>
            <Link className='icon feedback'></Link>
        </div>
    </div>
    </>
  )
}

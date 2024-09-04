import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../services/api/auth'
import './SideBar.css'

export const SideBar = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
    <div className='sidemenu'>
      <div className='sidemenu-main'>
            <NavLink to='/home' className='icon home'  activeClassName='active'></NavLink>
            <NavLink to='/board'className='icon status' activeClassName='active'></NavLink>
            {role === 'Admin' && (
              <NavLink to='/admin/events' className='icon adminhub'activeClassName='active'/>
            )}
            <NavLink to='/help' className='icon help' activeClassName='active'></NavLink>
        </div>
        <div className='sidemenu-extra'>
            <NavLink to='/courses' className='icon settings' activeClassName='active'></NavLink>
            <NavLink to='/event' className='icon feedback' activeClassName='active'></NavLink>
        </div>
    </div>
    </>
  )
}

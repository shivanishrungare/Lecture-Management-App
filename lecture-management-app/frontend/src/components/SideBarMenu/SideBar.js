import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../services/api/auth'
import { Tooltip } from '@mui/material';
import './SideBar.css'

export const SideBar = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
    <div className='sidemenu'>
      <div className='sidemenu-main'>
        <Tooltip title="Home" placement="right-end"><NavLink to='/home' className='icon home'  activeClassName='active'></NavLink></Tooltip>  
           <Tooltip title="Status Board" placement="right-end"><NavLink to='/board'className='icon status' activeClassName='active'></NavLink></Tooltip> 
            {role === 'Admin' && (
              <Tooltip title="Admin Hub" placement="right-end"><NavLink to='/admin/events' className='icon adminhub'activeClassName='active'/></Tooltip>         
            )}
            <Tooltip title="Help" placement="right-end">
               <NavLink to='/help' className='icon help' activeClassName='active'></NavLink>
            </Tooltip>
        </div>
        <div className='sidemenu-extra'>
        <Tooltip title="Settings" placement="right-end"><NavLink to='/courses' className='icon settings' activeClassName='active'></NavLink></Tooltip>
        <Tooltip title="Feedback" placement="right-end"><NavLink to='/event' className='icon feedback' activeClassName='active'></NavLink></Tooltip>
        </div>
    </div>
    </>
  )
}

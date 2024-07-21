import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../services/api/auth'
import './SideMenu.css'

export const SideMenu = () => {
  const { role } = useContext(AuthContext);
  console.log('User role:', role);

  return (
    <>
    <div className='sidemenu'>
      <div className='sidemenu-main'>
            <Link className='icon home'></Link>
            <Link className='icon status'></Link>
            {role === 'Admin' && (
              <Link to='/admin' className='icon adminhub'/>
            )}
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

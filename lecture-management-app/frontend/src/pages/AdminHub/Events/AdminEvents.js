import React from 'react'
import { SideMenu } from '../../../components/SideBarMenu/SideMenu'
import { NavbarUser } from '../../../components/NavigationBar/NavbarUser'
import { AdminSideMenu } from '../AdminSideMenu'


export const AdminEvents = () => {
  return (
    <div className='events-main'>
      <NavbarUser/>
      <SideMenu/>
      <AdminSideMenu/>
    </div>
  )
}



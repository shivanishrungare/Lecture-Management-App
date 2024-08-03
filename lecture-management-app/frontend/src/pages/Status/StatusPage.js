import React from 'react'
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'
import { SideBar } from '../../components/SideBarMenu/SideBar'
import { StatusSideMenu } from '../../components/SideMenu/StatusSideMenu'

export const StatusPage = () => {
  return (
    <div>
      <NavbarUser/>
      <SideBar/>
      <StatusSideMenu/>
    </div>
  )
}




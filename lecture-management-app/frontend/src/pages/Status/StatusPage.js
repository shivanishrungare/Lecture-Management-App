import React from 'react'
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'
import { SideMenu } from '../../components/SideBarMenu/SideMenu'
import { StatusSideMenu } from './StatusSideMenu'

export const StatusPage = () => {
  return (
    <div>
      <NavbarUser/>
      <SideMenu/>
      <StatusSideMenu/>
    </div>
  )
}




import React from 'react'
import { SideMenu } from '../../components/SideBarMenu/SideMenu'
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'

export const Home = () => {
  return (
    <div>
        <NavbarUser/>
        <SideMenu/>
    </div>
  )
}

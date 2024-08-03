import React from 'react'
import { SideBar } from '../../components/SideBarMenu/SideBar'
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'
import { Calendar } from '../../components/Calendar/Calendar'
import { HomeSideMenu } from '../../components/SideMenu/HomeSideMenu'

export const Home = () => {
  return (
    <div>
        <NavbarUser/>
        <SideBar/>
        <HomeSideMenu/>
        <Calendar/>
    </div>
  )
}

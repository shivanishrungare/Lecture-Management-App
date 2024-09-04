import React, { useContext } from 'react'
import { SideBar } from '../../components/SideBarMenu/SideBar'
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'
import { Calendar } from '../../components/Calendar/Calendar'
import { HomeSideMenu } from '../../components/SideMenu/HomeSideMenu'
import { AuthContext } from '../../services/api/auth'

export const Home = () => {
  const { userId, role } = useContext(AuthContext);

  return (
    <div>
        <NavbarUser/>
        <SideBar/>
        <HomeSideMenu/>
        <Calendar role={role} userId={userId}/>
    </div>
  )
}

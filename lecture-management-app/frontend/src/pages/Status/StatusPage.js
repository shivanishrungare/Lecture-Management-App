import React from 'react'
import { useParams } from 'react-router-dom';
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'
import { SideBar } from '../../components/SideBarMenu/SideBar'
import { ModulePlanCards } from '../../components/DragAndDrop/ModulePlanCards'
import { StatusSideMenu } from '../../components/SideMenu/StatusSideMenu'
import { AuthContext } from '../../services/api/auth';
import { useContext } from 'react';


export const StatusPage = () => {
  const { moduleId } = useParams(); 
  const { userId, role } = useContext(AuthContext);
  
  return (
    <div>
      <NavbarUser/>
      <SideBar/>
      <StatusSideMenu/>
      <ModulePlanCards moduleId={moduleId} role={role} userId={userId}/>
    </div>
  )
}




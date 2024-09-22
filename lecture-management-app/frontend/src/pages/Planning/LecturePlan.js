import React from 'react'
import { NavbarUser } from '../../components/NavigationBar/NavbarUser'
import { SideBar } from '../../components/SideBarMenu/SideBar'
import { LectureGrid } from '../../components/LecturePlan/LectureGrid'
import { useParams } from 'react-router-dom';

export const LecturePlan = () => {
  const { moduleId } = useParams();

  return (
    <div>
        <NavbarUser/>
        <SideBar/>
        <LectureGrid moduleId={moduleId} />
    </div>
  )
}


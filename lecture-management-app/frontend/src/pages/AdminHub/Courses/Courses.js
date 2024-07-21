import React from "react";
import { AddCourseForm } from "../../../forms/Courses/AddCourseForm";
import { CourseTable } from "../../../tables/CourseTable";
import { NavbarUser } from "../../../components/NavigationBar/NavbarUser";
import { SideMenu } from "../../../components/SideBarMenu/SideMenu";
import { AdminSideMenu } from "../AdminSideMenu";
import add from '../../../assets/icons/add.svg';
import './Courses.css'

export const Courses = () =>{
    return (
        <div className="course-page">
            <NavbarUser/>
            <SideMenu/>
            <AdminSideMenu/>
            <div className="course-page-main">
                <div className="course-page-content">
                    <div className="course-page-actions">
                        <h1 className="font-face">Courses and modules</h1>
                        <button className='add-button'>
                        <img src={add} alt='add' width='25px' height='25px'/>
                        <span className='font-face'>New Course</span>
                        </button>
                    </div>
                       
                    <div className="course-table">
                    <CourseTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}
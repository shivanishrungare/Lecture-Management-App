import React from "react";
import { AddCourseForm } from "../../../forms/Courses/AddCourseForm";
import { CourseTable } from "../../../components/AdminHub/CourseTable";

export const Courses = () =>{
    return (
        <div>
            <div>
            <h2 class="text-xl font-medium text-black">Course</h2>
            </div>
            <AddCourseForm/>
            <CourseTable/>
        </div>
    )
}
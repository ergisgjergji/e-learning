import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import TeacherCourseMenu from './TeacherCourseMenu';

const TeacherCourseCard = ({ course }) => {
    return (
        <CourseCard course={course}>
            <TeacherCourseMenu id={course.id}/>
        </CourseCard>
    )
}

export default TeacherCourseCard;

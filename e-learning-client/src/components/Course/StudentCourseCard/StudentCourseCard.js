import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import StudentCourseMenu from './StudentCourseMenu';

const StudentCourseCard = ({ course, history }) => {
    return (
        <CourseCard course={course}>
            <StudentCourseMenu id={course.id} course_name={course.name} history={history}/>
        </CourseCard>
    )
}

export default StudentCourseCard;

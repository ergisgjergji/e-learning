import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import StudentCourseMenu from './StudentCourseMenu';

const StudentCourseCard = ({ course, history }) => {
    return (
        <CourseCard course={course}>
            <StudentCourseMenu id={course.id} history={history}/>
        </CourseCard>
    )
}

export default StudentCourseCard;

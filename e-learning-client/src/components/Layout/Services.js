import React, { Component } from 'react';
import Service from './Service';
import translate from '../../i18n/translate';

import adminIcon from '../../img/admin.png';
import teacherIcon from '../../img/teacher.jpg';
import studentIcon from '../../img/student.png';
import { LOCALES } from './../../i18n/locales';

class Services extends Component {

    constructor() {
        super();
        this.state = {
            locale: LOCALES.ENGLISH,
            features: {
                admin: {
                    en: [
                        "Add / Edit / Delete teachers",
                        "Add / Edit / Delete students",
                        "Reset any user's password"
                    ],
                    sq: [
                        "Shton / Modifikon / Fshin mësues",
                        "Shton / Modifikon / Fshin studentë",
                        "Mund të resetojë fjalekalimin e cdo përdoruesi"
                    ]
                },
                teacher: {
                    en: [
                        "View the list of his courses",
                        "Edit his courses",
                        "Add new course",
                        "View registered & non-registered students for each course",
                        "Register students in a course",
                        "View the list of tests for each course",
                        "Create new tests with multiple questions: 'Yes/No', 'Single choice', 'Multiple choice'",
                        "View detailed test results of students"
                    ],
                    sq: [
                        "Shikon listën e kurseve të tij",
                        "Modifikon kurset e tij",
                        "Shton kurse të reja",
                        "Shikon të gjithë studentët e regjistruar / paregjistruar të një kursi",
                        "Regjistron studentë në kurset e tij",
                        "Shikon listën e testeve të cdo kursi",
                        "Krijon teste që përmbajnë pyetje të ndryshme, si: 'Po/Jo', 'Me një zgjidhje', 'Me dy zgjidhje'",
                        "Shikon rezultatet e testeve të cdo studenti"
                    ]
                },
                student: {
                    en: [
                        "View the list of courses you are registered in",
                        "Complete tests online",
                        "View detailed test results"
                    ],
                    sq: [
                        "Shikon listën e kurseve ku është i regjistruar",
                        "Plotëson teste online",
                        "Shikon rezultatet e testeve të tij"
                    ]
                }
            }
        }
    }

     UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.state.locale !== nextProps.locale)
            this.setState({ locale: nextProps.locale });
     }

    render() {
        const { locale, features } = this.state;
        let admin = []; let teacher = []; let student = [];

        if(locale === LOCALES.ENGLISH) {
            admin = features.admin.en;
            teacher = features.teacher.en;
            student = features.student.en;
        }
        else if(locale === LOCALES.ALBANIAN) {
            admin = features.admin.sq;
            teacher = features.teacher.sq;
            student = features.student.sq;
        }

        return (
            <div className="services">
                <div className="section-title">
                    <h1 className="display-4"> Role support </h1>
                    <div/>
                </div>
                <div className="d-flex justify-content-around flex-wrap">
                    <Service role="Admin" features={admin}>
                        <img src={adminIcon} alt="Admin icon" style={{ width: "60px", height: "60px" }}/>
                        <h3 className="mt-2"> {translate('admin')} </h3>
                    </Service>
                    <Service role="Teacher" features={teacher}>
                        <img src={teacherIcon} alt="Admin icon" style={{ width: "60px", height: "60px" }}/>
                        <h3 className="mt-2"> {translate('teacher')} </h3>
                    </Service>
                    <Service role="Student" features={student}>
                        <img src={studentIcon} alt="Admin icon" style={{ width: "60px", height: "60px" }}/>
                        <h3 className="mt-2"> {translate('student')} </h3>
                    </Service>
                </div>
            </div>
        )
    }
}

export default Services;

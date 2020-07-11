import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import { ToastContainer } from 'react-toastify';
import LandingPage from './components/Layout/LandingPage';
import Login from './components/Layout/Login';
import Logout from './components/Layout/Logout';
import AdminPanel from './components/Panels/AdminPanel';
import StudentsTable from './components/Datatable/StudentsTable';
import TeachersTable from './components/Datatable/TeachersTable';
import AddStudent from './components/User/AddStudent';
import AddTeacher from './components/User/AddTeacher';
import UpdateUser from './components/User/UpdateUser';
import ResetPassword from './components/User/ResetPassword';
import UpdateProfile from './components/User/UpdateProfile';
import ChangePassword from './components/User/ChangePassword';
import TeacherPanel from './components/Panels/TeacherPanel';
import AddCourse from './components/Course/AddCourse';
import UpdateCourse from './components/Course/UpdateCourse';
import TestBaseList from './components/Test/TestBase/TestBaseList';
import AddTest from './components/Test/TestBase/AddTest';
import CourseStudents from './components/Course/Students/CourseStudents';
import TestResultList from './components/Test/TestResult/TestResultList';
import StudentPanel from './components/Panels/StudentPanel';
import CourseDetails from './components/Course/CourseDetails';
import TestDetails from './components/Test/StudentTest/TestDetails';
import CompleteTest from './components/Test/StudentTest/CompleteTest';
import PublicRoute from './components/Router/PublicRoute';
import AdminRoute from './components/Router/AdminRoute';
import TeacherRoute from './components/Router/TeacherRoute';
import StudentRoute from './components/Router/StudentRoute';
import PrivateRoute from './components/Router/PrivateRoute';

import {I18nProvider, LOCALES } from './i18n';

class App extends Component {

  constructor() {
    super();
    store.dispatch(loadUser());

    this.state = {
      locale: LOCALES.ENGLISH
    }
  }

  changeLanguage = (lang) => {
    this.setState({ locale: lang });
  }

  render() {
    const { locale } = this.state;

    return (
      <I18nProvider locale={locale}>
        <div className="main-container">

          <Header/>

          <Route render={props => (
            <TransitionGroup>
              <CSSTransition
                key={props.location.key}
                timeout={400}
                classNames="fade">

                  <Switch location={props.location}>
                    {
                      // Public routes
                    }
                    <PublicRoute exact path="/" component={LandingPage}/>
                    <PublicRoute exact path="/login" component={Login}/>
                    {
                      // Role-based routes
                    }
                    <AdminRoute exact path="/adminPanel" component={AdminPanel}/>
                    <AdminRoute exact path="/adminPanel/students" component={StudentsTable}/>
                    <AdminRoute exact path="/adminPanel/teachers" component={TeachersTable}/>
                    <AdminRoute exact path="/adminPanel/addStudent" component={AddStudent}/>
                    <AdminRoute exact path="/adminPanel/addTeacher" component={AddTeacher}/>
                    <AdminRoute exact path="/adminPanel/updateUser/:id" component={UpdateUser}/>
                    <AdminRoute exact path="/adminPanel/resetPassword/:id" component={ResetPassword}/>

                    <TeacherRoute exact path="/teacherPanel" component={TeacherPanel}/>
                    <TeacherRoute exact path="/teacherPanel/addCourse" component={AddCourse}/>
                    <TeacherRoute exact path="/teacherPanel/updateCourse/:id" component={UpdateCourse}/>
                    <TeacherRoute exact path="/teacherPanel/course/:id/tests" component={TestBaseList}/>
                    <TeacherRoute exact path="/teacherPanel/course/:id/addTest" component={AddTest}/>
                    <TeacherRoute exact path="/teacherPanel/course/:id/students" component={CourseStudents}/>
                    <TeacherRoute exact path="/teacherPanel/course/:course_id/student/:student_id/results" component={TestResultList}/>

                    <StudentRoute exact path="/studentPanel" component={StudentPanel}/>
                    <StudentRoute exact path="/studentPanel/course/:id/details" component={CourseDetails}/>
                    <StudentRoute exact path="/studentPanel/course/:course_id/test/:test_id/details" component={TestDetails}/>
                    <StudentRoute exact path="/studentPanel/course/:course_id/test/:test_id/complete" component={CompleteTest}/>
                    {
                      // Common private routes
                    }
                    <PrivateRoute exact path="/logout" component={Logout}/>
                    <PrivateRoute exact path="/profile/edit" component={UpdateProfile}/>
                    <PrivateRoute exact path="/profile/changePassword" component={ChangePassword}/>
                  </Switch>

                </CSSTransition>
              </TransitionGroup>
          )}/>

          <Footer changeLanguage={this.changeLanguage}/>
          
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </I18nProvider>
    );
  }
}

export default App;

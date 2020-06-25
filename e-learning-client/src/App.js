import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Header from './components/Layout/Header';
import { ToastContainer } from 'react-toastify';
import LandingPage from './components/Layout/LandingPage';
import Login from './components/Layout/Login';
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

class App extends Component {

  constructor() {
    super();
    store.dispatch(loadUser());
  }

  render() {
    return (
      <>
        <Header/>
        {
          // PUBLIC Routes
        }
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={Login}/>
        {
          // PRIVATE Routes
        }
        <Switch>
          {
            // ADMIN
          }
          <Route exact path="/adminPanel" component={AdminPanel}/>
          <Route exact path="/adminPanel/students" component={StudentsTable}/>
          <Route exact path="/adminPanel/teachers" component={TeachersTable}/>
          <Route exact path="/adminPanel/addStudent" component={AddStudent}/>
          <Route exact path="/adminPanel/addTeacher" component={AddTeacher}/>
          <Route exact path="/adminPanel/updateUser/:id" component={UpdateUser}/>
          <Route exact path="/adminPanel/resetPassword/:id" component={ResetPassword}/>
          {
            // TEACHER
          }
          <Route exact path="/teacherPanel" component={TeacherPanel}/>
          <Route exact path="/teacherPanel/addCourse" component={AddCourse}/>
          <Route exact path="/teacherPanel/updateCourse/:id" component={UpdateCourse}/>
          <Route exact path="/teacherPanel/course/:id/tests" component={TestBaseList}/>
          <Route exact path="/teacherPanel/course/:id/addTest" component={AddTest}/>
          <Route exact path="/teacherPanel/course/:id/students" component={CourseStudents}/>
          {
            // STUDENT
          }
          {
            // Common
          }
          <Route exact path="/profile/edit" component={UpdateProfile}/>
          <Route exact path="/profile/changePassword" component={ChangePassword}/>

        </Switch>

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
      </>
    );
  }
}

export default App;

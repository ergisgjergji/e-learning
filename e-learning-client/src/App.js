import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Header from './components/Layout/Header';
import { ToastContainer } from 'react-toastify';
import LandingPage from './components/Layout/LandingPage';
import Login from './components/Layout/Login';
import StudentsTable from './components/Datatable/StudentsTable';
import TeachersTable from './components/Datatable/TeachersTable';
import AddStudent from './components/User/AddStudent';
import AddTeacher from './components/User/AddTeacher';
import UpdateUser from './components/User/UpdateUser';
import ResetPassword from './components/User/ResetPassword';
import UpdateProfile from './components/User/UpdateProfile';

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
          <Route exact path="/adminPanel/students" component={StudentsTable}/>
          <Route exact path="/adminPanel/teachers" component={TeachersTable}/>
          <Route exact path="/adminPanel/addStudent" component={AddStudent}/>
          <Route exact path="/adminPanel/addTeacher" component={AddTeacher}/>
          <Route exact path="/adminPanel/updateUser/:id" component={UpdateUser}/>
          <Route exact path="/adminPanel/resetPassword/:id" component={ResetPassword}/>

          <Route exact path="/profile/edit" component={UpdateProfile}/>

        </Switch>

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </>
    );
  }
}

export default App;

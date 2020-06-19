import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Header from './components/Layout/Header';
import LandingPage from './components/Layout/LandingPage';
import Login from './components/Layout/Login';
import StudentsTable from './components/Datatable/StudentsTable';
import TeachersTable from './components/Datatable/TeachersTable';
import AddStudent from './components/User/AddStudent';
import AddTeacher from './components/User/AddTeacher';
import UpdateUser from './components/User/UpdateUser';

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
        </Switch>
      </>
    );
  }
}

export default App;

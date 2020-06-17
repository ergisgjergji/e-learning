import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Header from './components/Layout/Header';
import LandingPage from './components/Layout/LandingPage';
import Login from './components/Layout/Login';

class App extends Component {

  componentDidMount() {
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
      </>
    );
  }
}

export default App;

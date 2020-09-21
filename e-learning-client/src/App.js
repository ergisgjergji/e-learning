import React, { Component } from 'react';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import {I18nProvider, LOCALES } from './i18n';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header/Header';
import AnimatedRouter from './AnimatedRouter';

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
        <div className="main-container bg-cloud">
          <Header/>
          <AnimatedRouter locale={locale}/>
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

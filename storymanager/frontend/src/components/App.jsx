import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import Header from './UI/Layout/Nav/Header';
import HowToPlay from './About/HowToPlay';
import Login from './Auth/Login';
import Register from './Auth/Register/Register';
import NotificationToasts from './UI/Notifications/NotificationToasts';
import Landing from './Landing/Landing';
import Editor from './Story/Editor/Editor';
import PageNotFound from './UI/PageNotFound';
import Footer from './UI/Layout/Footer';
import Main from './UI/Layout/Main';
import store from '../store/store';
import { loadUser } from '../store/actions/auth';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header key="navbar" />
        <NotificationToasts />
        <Main className="main-content">
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/story/:id" component={Editor} />
            <Route exact path="/how-to-play">
              <HowToPlay />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));

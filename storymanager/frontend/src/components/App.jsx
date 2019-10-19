import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import Header from './UI/Layout/Nav/Header';
import HowToPlay from './About/HowToPlay';
import NotificationToasts from './UI/Notifications/Toasts';
import PageNotFound from './UI/PageNotFound';
import Footer from './UI/Layout/Footer';
import Main from './UI/Layout/Main';
import Register from './Auth/Register/Main';
import Login from './Auth/Login';
import { loadUser } from '../store/actions/auth';
import LoadingSpinner from './UI/LoadingSpinner';
import Landing from './Landing/Main';
import store from '../store/store';

const Editor = lazy(() => import(/* webpackChunkName: "editor" */'./Story/Editor/Main'));

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
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </Main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));

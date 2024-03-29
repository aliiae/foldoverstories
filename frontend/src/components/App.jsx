import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import Header from './UI/Layout/Nav/Header';
import NotificationToasts from './UI/Notifications/Toasts';
import PageNotFound404 from './UI/ErrorPages/PageNotFound404';
import Footer from './UI/Layout/Footer';
import Main from './UI/Layout/Main';
import Login from './Auth/Login';
import { loadUser } from '../store/actions/auth';
import LoadingSpinner from './UI/LoadingSpinner';
import Landing from './Landing/Main';
import store from '../store/store';
import ErrorBoundary from './UI/ErrorPages/ErrorBoundary';

const pages = {
  editor: import(/* webpackChunkName: "editor" */'./Story/Editor/Main'),
  register: import(/* webpackChunkName: "register" */'./Auth/Register/Main'),
  howToPlay: import(/* webpackChunkName: "howToPlay" */'./About/HowToPlay'),
};
const Editor = lazy(() => pages.editor);
const Register = lazy(() => pages.register);
const HowToPlay = lazy(() => pages.howToPlay);

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <NotificationToasts />
        <Main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route
                exact
                path="/story/:id"
                render={(props) => (
                  <ErrorBoundary>
                    <Editor {...props} />
                  </ErrorBoundary>
                )}
              />
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
                <PageNotFound404 />
              </Route>
            </Switch>
          </Suspense>
        </Main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import Header from './UI/Layout/Header';
import HowToPlay from './About/HowToPlay';
import Login from './Auth/Login';
import Register from './Auth/Register';
import NotificationToasts from './UI/Notifications/NotificationToasts';
import Landing from './Landing/Landing';
import Editor from './Story/Editor/Editor';
import PageNotFound from './UI/PageNotFound';
import Footer from './UI/Layout/Footer';
import Main from './UI/Layout/Main';
import store from '../store/store';
import { loadUser } from '../store/actions/auth';

if (false && process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    collapseGroups: true,
    include: [/.*/],
    exclude: [/^Link/, /^Route/, /^BrowserRouter/],
  });
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <NotificationToasts />
        <Main className="main-content">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/story/:id" component={Editor} />
            <Route exact path="/story" component={() => (<Redirect to="/" />)} />
            <Route exact path="/how-to-play" component={HowToPlay} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app') || document.createElement('div'));

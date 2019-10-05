import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Provider } from 'react-redux';
import Header from './layout/Header';
import HowToPlay from './about/HowToPlay';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Landing from './landing/Landing';
import Editor from './story/Editor';
import Footer from './layout/Footer';
import store from '../store';
import { loadUser } from '../actions/auth';

function App() {
  useEffect(() => store.dispatch(loadUser()), []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ minHeight: '100vh' }}>
          <Header />
          <>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/story/:id" component={Editor} />
              <Route exact path="/story" component={() => (<Redirect to="/" />)} />
              <Route exact path="/how-to-play" component={HowToPlay} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

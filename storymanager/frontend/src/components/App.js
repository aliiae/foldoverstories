import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Header from "./layout/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import Alerts from './layout/Alerts';
import Editor from "./story/Editor";

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {Provider} from 'react-redux';
import store from '../store';
import {loadUser} from "../actions/auth";

const alertOptions = {
  timeout: 3000,
  position: 'top center'
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header/>
              <Alerts/>
              <div className="container">
                <Switch/>
                <PrivateRoute exact path="/" component={Editor}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
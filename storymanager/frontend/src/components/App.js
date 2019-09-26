import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';

import Header from './layout/Header';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import Landing from './landing/Landing';
import Alerts from './layout/Alerts';
import Editor from './story/Editor';
import store from '../store';
import { loadUser } from '../actions/auth';

const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <HashRouter>
            <>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <PrivateRoute exact path="/story" component={Editor} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </>
          </HashRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

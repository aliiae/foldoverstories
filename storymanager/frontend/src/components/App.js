import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from "./layout/Header";
import Alerts from './layout/Alerts';
import Editor from "./story/Editor";
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {Provider} from 'react-redux';
import store from '../store';

const alertOptions = {
    timeout: 3000,
    position: 'top center'
};

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Header/>
                        <Alerts/>
                        <div className="container">
                            <Editor/>
                        </div>
                    </Fragment>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
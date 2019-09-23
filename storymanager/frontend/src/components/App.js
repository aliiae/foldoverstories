import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from "./layout/Header";
import Editor from "./story/Editor";

import {Provider} from 'react-redux';
import store from '../store';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header/>
                    <div className="container">
                        <Editor/>
                    </div>
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
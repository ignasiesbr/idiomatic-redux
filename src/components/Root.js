import React from 'react';
import TodoApp from './TodoApp';
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';


const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter >
            <Route path="/:filter?" component={TodoApp} />
        </BrowserRouter>
    </Provider>
)

export default Root;
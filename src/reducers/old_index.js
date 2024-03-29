import {combineReducers} from 'redux';
import todos, * as fromTodos from '.';

const todoApp = combineReducers({
    todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
    return fromTodos.getVisibleTodos(state.todos, filter);
}


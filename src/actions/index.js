import  {normalize} from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { getIsFetching } from '../reducers';

export const toggleTodo = (id) => (dispatch) => 
  api.toggleTodo(id).then(response => {
    dispatch({
      type:'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  })

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export const addTodo = (text) => (dispatch) => 
  api.addTodo(text).then((response) => {
    dispatch({
      type:'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    });
  });


export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });
  
  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfTodos)
      });
    },
    error => {
      dispatch({
        type:'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.'
      });
    }
    );
};
 

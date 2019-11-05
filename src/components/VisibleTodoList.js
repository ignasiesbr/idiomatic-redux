import React, {Component} from 'react';
import {connect } from 'react-redux';
import * as actions from  '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers/index';
import FetchError from './FetchError';

class VisibleTodoList extends Component {


  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    };
  }

  fetchData() {
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter).then(() => console.log('done!'));
  }

  render() {
    const {toggleTodo, todos, errorMessage, isFetching} = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading ... </p> 
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError message={errorMessage} onRetry={()=> this.fetchData()} />
      );
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
  }

}
const mapStateToTodoListProps = (state, {match}) => {
  const filter = match.params.filter || 'all';
  return {
    filter,
    todos: getVisibleTodos(state,filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state,filter)
  };
};

// const mapDispatchToTodoListProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id));
//     }
//   };
// };

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
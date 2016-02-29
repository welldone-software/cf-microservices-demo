import { connect } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../actions';
import Todos from '../components/Todos';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    onTodoRemoveClick: (id) => {
      dispatch(removeTodo(id));
    },
    onTodoTextChange: (id, text) => {
      dispatch(editTodo(id, text));
    }
  };
};

const VisibleTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default VisibleTodos;

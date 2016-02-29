import React, { PropTypes } from 'react';
import Todo from './Todo';

const Todos = ({ todos, onTodoClick, onTodoRemoveClick, onTodoTextChange }) => (
  <section className="main">
    <ul className="todo-list">
      {todos.map(todo => {
         return <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
            onRemoveClick={() => onTodoRemoveClick(todo.id)}
            onTextChange={text => onTodoTextChange(todo.id, text)}
          />;
        }
      )}
    </ul>
  </section>
);

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onTodoRemoveClick: PropTypes.func.isRequired,
  onTodoTextChange: PropTypes.func.isRequired
};

export default Todos;

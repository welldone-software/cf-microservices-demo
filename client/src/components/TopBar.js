import React from 'react';
import AddTodo from '../containers/AddTodo';
import TodosActions from '../containers/TodosActions';

const TopBar = ({onLoad}) => (
  <section className="todoapp">
    <header className="header">
      <h1>todos</h1>
      <TodosActions />
      <AddTodo />
    </header>
  </section>
);


export default TopBar;
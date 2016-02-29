import React from 'react';
import { connect } from 'react-redux';
import { setText, addTodo,openAddListModal } from '../actions';

let AddTodo = ({ text, onAddTodo, onTextChange }) => {
  return (
    <div>
      <form onSubmit={e => e.preventDefault() || onAddTodo(text)}>
        <input className="new-todo" value={text} onChange={e => onTextChange(e.target.value)}
        placeholder="What needs to be done ?"/>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  text: state.text
});

const mapDispatchToProps = (dispatch) => ({
  onTextChange: (text) => dispatch(setText(text)),
  onAddTodo: (text, newList) =>  {
    dispatch(addTodo(text));
    dispatch(setText(''));
  }
});


AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);


export default AddTodo;

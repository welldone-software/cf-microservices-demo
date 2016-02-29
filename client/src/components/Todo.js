import React, { PropTypes } from 'react';
import InlineEdit from 'react-edit-inline';

//<label>{text}</label>
//validate={this.customValidateText}
//change={this.dataChanged}
//style={{
//  backgroundColor: 'yellow',
//    minWidth: 150,
//    display: 'inline-block',
//    margin: 0,
//    padding: 0,
//    fontSize: 15,
//    outline: 0,
//    border: 0
//}}

const Todo = ({ onClick, onRemoveClick, onTextChange, completed, text }) => (
  <li

    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    <div className="view">
      <input className="toggle" type="checkbox"  onClick={onClick}/>
      <InlineEdit
        activeClassName="editing"
        text={text}
        paramName="text"
        change={e => onTextChange(e.text)}
      />
      <button className="destroy" onClick={onRemoveClick}></button>
    </div>
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;

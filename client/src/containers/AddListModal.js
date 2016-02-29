import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { saveNewList, onNewListNameChange} from '../actions';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '-5px 0 30px 0 rgba(0, 0, 0, .25)'
  }
};

let AddListModal = ({ todoText, open, listName, onAddList,onChange}) => {
  return (
    <Modal isOpen={open}  style={customStyles}  className="add-list-modal">
      <h3>Enter name for new list: </h3>
      <form onSubmit={(e) => {e.preventDefault();  onAddList({todoText, listName})}}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={listName} onChange={onChange} />
        <button type="submit">add</button>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  todoText: state.addListModal.todoText,
  open: state.addListModal.open,
  listName: state.addListModal.listName
});

const mapDispatchToProps = (dispatch) => ({
  onAddList: (data) => {
    dispatch(saveNewList(data))
  },
  onChange: (e) => {
    dispatch(onNewListNameChange(e.target.value))
  }
});


AddListModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListModal);


export default AddListModal;

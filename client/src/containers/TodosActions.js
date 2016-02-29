import React from 'react';
import { connect } from 'react-redux';
import { saveMyTodos, loadMyTodos, loadTodos, login, addList } from '../actions';
import Modal from 'react-modal';
import _ from 'lodash';

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

class TodosActions extends React.Component {

  state = {
    selectListModal: false,
    newListModal: false,
    newListName: ''
  }

  openSelectListModal() {
    this.setState({selectListModal: true});
    this.props.onLoadMyTodos();
  }

  closeSelectListModal() {
    this.setState({selectListModal: false});
  }

  onLoadTodos(id) {
    this.closeSelectListModal();
    this.props.onLoadTodos(id);
  }

  onSaveList() {
    this.props.list.items.length === 0
      ? this.openAddListModal()
      : this.props.onSaveMyTodos();
  }

  openAddListModal() {
    this.setState({newListModal: true});
  }

  closeAddListModal() {
    this.setState({newListModal: false});
  }

  onAddList() {
    this.props.onAddList(this.state.newListName);
    this.closeAddListModal();
    this.setState({newListName: ''});
  }

  render() {
    const { onSaveMyTodos, onLogin } = this.props;
    const { items, status, selected } = this.props.list;
    let { token } = this.props.config;
    const onListItemClick = this.onLoadTodos.bind(this);
    const selectedId = selected > 0 ? items[selected]._id : '';

    return (
      <div className="todo-actions">
        {token && <span>
            <button className="btn" onClick={this.openSelectListModal.bind(this)}>Load List</button>
            <button className="btn" onClick={this.onSaveList.bind(this)}>Save List</button>
          </span>
        }
        {!token &&
          <button className="btn" onClick={onLogin}>Login</button>
        }
        <Modal isOpen={this.state.selectListModal} onRequestClose={this.closeSelectListModal.bind(this)} style={customStyles} >
          {items.length > 0 && <h3>Select list </h3>}
          {items.length === 0 && <h3>No lists</h3>}
          <ul className="todos-list">
            {status === 'loading' && <span className="fa fa-spinner fa-spin"></span>}
            {items.map(item =>
              <li key={'list-' + item._id}
                  className={'todos-list-item ' + (item._id === selectedId ? 'active' : '')}
                  onClick={() => onListItemClick(item._id)}>
                {item.name}
              </li>
            )}
          </ul>
          <div className="buttons">
            <button onClick={() => this.closeSelectListModal()}>Close</button>
          </div>
        </Modal>
        <Modal isOpen={this.state.newListModal}  style={customStyles} className="add-list-modal">
          <h3>Enter name for new list: </h3>
          <input type="text" className="form-control" value={this.state.newListName} onChange={(e) => this.setState({newListName :e.target.value})} />
          <div className="buttons">
            <button onClick={() => this.closeAddListModal()}>Cancel</button>
            <button onClick={() => this.onAddList()}>Add</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
  config: state.config
});

const mapDispatchToProps = (dispatch, ownProps, c) => ({
  onSaveMyTodos: () => dispatch(saveMyTodos()),
  onLoadMyTodos: () => dispatch(loadMyTodos()),
  onLoadTodos: id => dispatch(loadTodos(id)),
  onAddList: name => dispatch(addList(name)),
  onLogin: id => dispatch(login())
});

TodosActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosActions);

export default TodosActions;

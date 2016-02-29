import { combineReducers } from 'redux';
import _ from 'lodash';

export const todos = (state = [], action) =>{
  switch(action.type){
    case 'ADD_TODO':
    {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    }
    case 'EDIT_TODO':
    {
      const index = state.findIndex(t => t.id === action.id);
      return [
        ...state.slice(0, index),
        {...state[index], text: action.text},
        ...state.slice(index + 1)
      ];
    }
    case 'TOGGLE_TODO':
    {
      const index = state.findIndex(t => t.id === action.id);
      const todo = state[index];
      return [
        ...state.slice(0, index),
        {...todo, completed: !todo.completed},
        ...state.slice(index + 1)
      ];
    }
    case 'REMOVE_TODO':
    {
      const index = state.findIndex(t => t.id === action.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    }
    case 'LOAD_TODOS_SUCCESS':
      return action.response.todos;
    case 'SAVE_NEW_LIST_SUCCESS':
      return action.response.todos;
    default:
      return state;
  }
};

export const visibilityFilter = (state = 'SHOW_ALL', action) =>{
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const text = (state = '', action) =>{
  return action.type === 'SET_TEXT' ?
    action.text :
    state;
};

const status = (state = {loading: false, error: null} , action) =>{
  if(action.type.endsWith('_LOADING')){
    return {loading: true, error: null};
  }
  else if(action.type.endsWith('_FAILURE')){
    return {loading: false, error: action.error};
  }
  else{
    return state;
  }
};

const list = (state = {items: [], selected: -1, status: ''} , action) => {
  switch (action.type) {
    case 'LOAD_MY_TODOS_LOADING':
      return {
        ...state,
        status: 'loading'
      };
    case 'LOAD_MY_TODOS_SUCCESS':
      return {
        ...state,
        items: action.response,
        status: 'success'
      };
    case 'LOAD_TODOS_LOADING':
      const selected = _.findIndex(state.items, i => i._id === action.payload);
      return {
        ...state,
        selected
      };
    case 'SAVE_TODOS_SUCCESS':
      return state;
    case 'SAVE_NEW_LIST_SUCCESS':
      const {_id, name} = action.response;

      return {
        ...state,
        items: state.items.concat([{_id, name }]),
        selected: state.items.length
      };
    default:
      return state;
  }
}

//const addListModal = (state = {open:false}, action) => {
//  switch (action.type) {
//    case 'OPEN_ADD_LIST_MODAL':
//      return {
//        ...state,
//        open: true,
//        todoText: action.todoText,
//        listName: ""
//      }
//    case 'SET_NEW_LIST_NAME':
//      return {
//        ...state,
//        listName: action.listName
//      };
//    case 'SAVE_NEW_LIST_SUCCESS':
//      return {
//        ...state,
//        open: false,
//        todoText: undefined
//      }
//    default:
//      return state;
//  }
//};

const config = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return {
        ...state,
        status: 'loading'
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.response,
        status: 'success'
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.error,
        status: 'error'
      };
    default:
      return state;
  }
};



const todoApp = combineReducers({
  config,
  status,
  list,
  text,
  todos,
  visibilityFilter
  //addListModal
});

export default todoApp;

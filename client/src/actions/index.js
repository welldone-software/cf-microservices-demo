import {reduxThunkPromise} from './lib/thunkUtils';
import uuid from 'node-uuid';
import todosApi from '../services/todosApi';

export const setText = (text) => ({
  type: 'SET_TEXT',
  text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: new Date().getTime(),
  completed: false,
  text
});

export const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  id,
  text
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

export const removeTodo = (id) => ({
  type: 'REMOVE_TODO',
  id
});

function cfAuthOpenPromise(appId){
  return new Promise((resolve, reject) => {
    cfAuthOpen(appId, (err, token) => {
      if(err){
        reject(err);
      }
      else{
        resolve(token);
      }
    })
  });
}

export const login = () => {
  return reduxThunkPromise('LOGIN', state => {
    return cfAuthOpenPromise(state.config.auth.appId);
  });
};

export const loadMyTodos = () => {
  return reduxThunkPromise('LOAD_MY_TODOS', (state) => todosApi.apiGet('todos', state.config.token));
};

export const loadTodos = (id) => {
  return reduxThunkPromise('LOAD_TODOS', (state) => todosApi.apiGet(`todos/${id}`, state.config.token), id);
};

export const saveMyTodos = () => {
  return reduxThunkPromise('SAVE_TODOS', state => {
    const {todos, list} = state;
    const token = state.config.token;
    const {items, selected} = list;
    const selectedList = {...items[selected], todos};

    return todosApi.apiPost(`todos/${selectedList._id}`, selectedList, token, 'PUT');
  });
};

export const addList = name => {
  return reduxThunkPromise('SAVE_NEW_LIST', state => {
    const {todos, list} = state;
    const newList = {_id: new Date().getTime(), name, todos};

    return todosApi.apiPost('todos', newList, state.config.token);
  })
}

//export const openAddListModal = (todoText) => {
//  return {
//    type:"OPEN_ADD_LIST_MODAL",
//    todoText:todoText
//  }
//}
//
//export const onNewListNameChange = (listName) => {
//  return {
//    type: "SET_NEW_LIST_NAME",
//    listName
//  }
//}
//export const loadTodos = (id) => {
//  return reduxThunkPromise(() => fetch(`api/todos/${id}`));
//};
//
//export const saveTodos = (id) => {
//  return reduxThunkPromise((state) => fetch(`api/todos/${id}`, {method: 'POST', body: JSON.stringify(state)}));
//};
//
//export const removeTodo = (id) => {
//  return reduxThunkPromise(() => fetch(`api/todos/${id}`, {method: 'DELETE' }));
//};
//
//export const loadTodosLists = () => {
//  return reduxThunkPromise((state) => fetch('api/todos'));
//};
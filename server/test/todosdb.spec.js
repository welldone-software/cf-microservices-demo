const todosSvc = require('../src/todosSvc');
const expect = require('chai').expect;
var mocha = require('mocha');
var coMocha = require('co-mocha');

coMocha(mocha);

beforeEach(function*() {
  yield todosSvc.remove(999999);
});

describe('Basic CRUD functionality of todos service', function(){
  it('Add a todo list',function*(){
    const newTodoList =   {
      _id: 999999,
      name: 'test to do list',
      todos: [{
        id: 1,
        text: 'help tweet fishing rod'
      }, {
        id: 1,
        text: 'pretend to code bird'
      }]
    };

    const all = yield todosSvc.all();
    yield todosSvc.add(newTodoList);
    const newInsertedTodo = yield todosSvc.get(newTodoList._id);
    const allAfterInsert = yield todosSvc.all();


    expect(all.length).to.be.equal(allAfterInsert.length - 1);
    expect(newInsertedTodo).to.not.be.null;
    expect(newInsertedTodo.name).to.be.equal(newTodoList.name);
  });


  it('Update a todo list',function*(){
    const todoList =   {
      _id: 999999,
      name: 'test to do list',
      todos: [{
        id: 1,
        text: 'help tweet fishing rod'
      }, {
        id: 2,
        text: 'pretend to code bird'
      }]
    };


    yield todosSvc.add(todoList);
    todoList.todos.push({id:3, text:'pretend to clean distant relatives'});
    yield todosSvc.update(todoList._id, todoList);
    const updatedTodoList  = yield todosSvc.get(todoList._id);

    expect(updatedTodoList).to.not.be.null;
    expect(updatedTodoList.todos.length).to.be.equal(3);

  });


});
import expect from 'expect';
import * as actions from '../../../src/actions';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    const {type, id, text} = actions.addTodo('Use Redux');
    expect(type).toEqual('ADD_TODO');
    expect(text).toEqual('Use Redux');
    expect(id).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/);
  });

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    });
  });

  it('toogleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: 'TOGGLE_TODO',
      id: 1
    });
  });
});

describe('todos list actions', function(){

});
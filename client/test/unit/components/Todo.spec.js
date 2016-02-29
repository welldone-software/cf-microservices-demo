import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';
import Todo from '../../../src/components/Todo';

expect.extend(expectJSX);

describe('Todo component', function () {

  it('should render a none completed task without text decoration', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Todo
        onClick={null}
        completed={false}
        text={'the TEXT 1'}/>
    );
    const actutal = renderer.getRenderOutput();
    const expected = (
      <li
        onClick={null}
        style={{textDecoration: 'none'}}>
        the TEXT 1
      </li>
    );

    expect(actutal).toEqualJSX(expected);

  });


  it('should render a completed task with line-through', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <Todo
        onClick={null}
        completed={true}
        text={'the TEXT 2'}/>
    );
    const actutal = renderer.getRenderOutput();
    const expected = (
      <li
        onClick={null}
        style={{textDecoration: 'line-through'}}>
        the TEXT 2
      </li>
    );

    expect(actutal).toEqualJSX(expected);

  });

});
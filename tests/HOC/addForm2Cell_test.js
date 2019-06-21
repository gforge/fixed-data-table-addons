/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */ import React from 'react';
import { describe, it } from 'mocha';
import { Cell } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { addForm2Cell } from '../../src/HOC';

describe('Investigate addForm2Cell', () => {
  let onChange;
  function getNode(props) {
    onChange = sinon.spy();

    const FormCell = addForm2Cell(localProps => <Cell {...localProps} id="test_object" />);

    const node = mount(
      <FormCell {...props} value="something" onChange={onChange}>
        test
      </FormCell>,
    );

    return node;
  }

  it('Check that form exists', () => {
    const node = getNode({
      columnKey: 'id',
    });

    expect(node.find('input')).to.exist();
    expect(node.text()).to.equal('test');
  });

  it('Check that inputting value triggers an event', () => {
    const node = getNode({
      columnKey: 'id',
    });

    expect(onChange).to.have.property('callCount', 0);
    node.find('input').simulate('change', { target: { value: 'My new value' } });
    expect(onChange).to.have.property('callCount', 1);
    expect(node.text()).to.equal('test');
  });
});

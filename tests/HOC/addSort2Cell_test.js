/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */ import React from 'react';
import { describe, it } from 'mocha';
import { Cell } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { addSort2Cell } from '../../src/HOC';
import { SortTypes } from '../../src/Data';

describe('Investigate addSort2Cell', () => {
  let sortTriggered;
  function getNode(props) {
    sortTriggered = sinon.spy();

    const SortCell = addSort2Cell(
      localProps => <Cell {...localProps} id="test_object" />,
      '_desc_',
      <i>_asc_italic_</i>,
    );

    const node = mount(
      <SortCell {...props} onSortChange={sortTriggered}>
        test
      </SortCell>,
    );

    return node;
  }

  function getNodeWithClass(props) {
    sortTriggered = sinon.spy();

    const TestSortCell = (testProps) => {
      const id = 'test_class_object';
      return <Cell {...testProps} id={id} />;
    };
    const SortCell = addSort2Cell(TestSortCell, '_desc_', '_asc_');

    const node = mount(
      <SortCell {...props} onSortChange={sortTriggered}>
        test
      </SortCell>,
    );

    return node;
  }

  it('should have the asc descriptor if sorting is ascending', () => {
    const node = getNode({
      columnKey: 'id',
      sortColumn: 'id',
      sortDir: SortTypes.ASC,
    });

    expect(node.find('.sortIndicator > i').text()).to.equal('_asc_italic_');
  });

  it('should have the desc descriptor if sorting is descending', () => {
    const node = getNode({
      columnKey: 'id',
      sortColumn: 'id',
      sortDir: SortTypes.DESC,
    });

    expect(node.find('.sortIndicator').text()).to.equal('_desc_');
  });

  it('should have the asc descriptor if sorting is ascending and should work with class', () => {
    const node = getNodeWithClass({
      columnKey: 'id',
      sortColumn: 'id',
      sortDir: SortTypes.ASC,
    });

    expect(node.find('.sortIndicator').text()).to.equal('_asc_');
  });

  it('chaning props should have the desc descriptor swap descriptor', () => {
    const node = getNodeWithClass({
      columnKey: 'id',
      sortColumn: 'id',
      sortDir: SortTypes.DESC,
    });

    expect(node.find('.sortIndicator').text()).to.equal('_desc_');
    node.setProps({ sortDir: SortTypes.ASC });
    expect(node.find('.sortIndicator').text()).to.equal('_asc_');
  });

  it('should trigger a sort event when clicked', () => {
    const node = getNode();

    expect(sortTriggered).to.have.property('callCount', 0);
    node.find('a').simulate('click');
    expect(sortTriggered).to.have.property('callCount', 1);
  });
});

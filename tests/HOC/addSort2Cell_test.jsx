/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { describe, it } from 'mocha';
import FDT from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { addSort2Cell } from '../../src/HOC';
import { SortTypes } from '../../src/Data';

describe('Investigate addSort2Cell', () => {
  let sortTriggered;
  function getNode(Lib, props) {
    sortTriggered = sinon.spy();

    const SortCell = addSort2Cell(localProps => (
      <Lib.Cell {...localProps} id="test_object" />
    ), '_desc_', '_asc_');

    const node = mount(<SortCell {...props} onSortChange={sortTriggered}>
      test
    </SortCell>);

    return node;
  }

  function test(Lib) {
    it('should have the asc descriptor if sorting is ascending', () => {
      const node = getNode(Lib, {
        columnKey: 'id',
        sortColumn: 'id',
        sortDir: SortTypes.ASC,
      });

      expect(node.find('.sortIndicator').text()).to.equal('_asc_');
    });

    it('should have the desc descriptor if sorting is descending', () => {
      const node = getNode(Lib, {
        columnKey: 'id',
        sortColumn: 'id',
        sortDir: SortTypes.DESC,
      });

      expect(node.find('.sortIndicator').text()).to.equal('_desc_');
    });

    it('chaning props should have the desc descriptor swap descriptor', () => {
      const node = getNode(Lib, {
        columnKey: 'id',
        sortColumn: 'id',
        sortDir: SortTypes.DESC,
      });

      expect(node.find('.sortIndicator').text()).to.equal('_desc_');
      node.setProps({ sortDir: SortTypes.ASC });
      expect(node.find('.sortIndicator').text()).to.equal('_asc_');
    });

    it('should trigger a sort event when clicked', () => {
      const node = getNode(Lib);

      expect(sortTriggered).to.have.property('callCount', 0);
      node.find('a').simulate('click');
      expect(sortTriggered).to.have.property('callCount', 1);
    });
  }

  describe('check functionality for fixed-data-table-2', () => {
    test(FDT);
  });
});

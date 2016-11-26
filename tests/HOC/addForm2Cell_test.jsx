/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { describe, it } from 'mocha';
import FDT from 'fixed-data-table';
import FDT2 from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { addForm2Cell } from '../../HOC';

describe('Investigate addForm2Cell', () => {
  let onChange;
  function getNode(Lib, props) {
    onChange = sinon.spy();

    const FormCell = addForm2Cell(localProps => (
      <Lib.Cell {...localProps} id="test_object" />
    ));

    const node = mount(<FormCell {...props} onChange={onChange}>
      test
    </FormCell>);

    return node;
  }

  function test(Lib) {
    it('Check that form exists', () => {
      const node = getNode(Lib, {
        columnKey: 'id',
      });

      expect(node.find('input')).to.exist();
      expect(node.text()).to.equal('test');
    });

    it('Check that inputting value triggers an event', () => {
      const node = getNode(Lib, {
        columnKey: 'id',
      });

      expect(onChange).to.have.property('callCount', 0);
      node.find('input').simulate('change', { target: { value: 'My new value' } });
      expect(onChange).to.have.property('callCount', 1);
      expect(node.text()).to.equal('test');
    });
  }

  describe('check functionality for fixed-data-table-2', () => {
    test(FDT);
  });

  describe('check functionality for fixed-data-table-2', () => {
    test(FDT2);
  });
});

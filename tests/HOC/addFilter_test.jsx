/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]*/
import React from 'react';
import { describe, it } from 'mocha';
import FDT from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { getCtxtTextCell } from '../test_setup';
import { addFilter, addDataCtxt } from '../../src/HOC';
import Data from '../stub/Data';

describe('Investigate addFilter', () => {
  const data = new Data();
  function getNode(Lib) {
    const FilterTable = addFilter(addDataCtxt(Lib.Table));

    const TextCell = getCtxtTextCell(Lib);

    const node = mount(
      <FilterTable
        rowHeight={50}
        headerHeight={50}
        height={500}
        width={500}
        filters={{ id: '', name: '' }}
        data={data}
      >
        <Lib.Column
          columnKey="id"
          width={250}
          header={<Lib.Cell>ID</Lib.Cell>}
          cell={<TextCell />}
        />
        <Lib.Column
          columnKey="name"
          width={250}
          header={<Lib.Cell>Name</Lib.Cell>}
          cell={<TextCell />}
        />
      </FilterTable>);

    return node;
  }

  function test(Lib) {
    it('should produce the full data when not filtering', () => {
      const node = getNode(Lib);

      for (let i = 0; i < data.getSize(); i += 1) {
        const row = data.getObjectAt(i);
        expect(node.find(`#id_${row.id}`).filter('div')).to.have.length(1, `Can't find cell with id: id_${row.id}`);
        expect(node.find(`#name_${row.id}`).filter('div')).to.have.length(1, `Can't find cell with id: ${row.id}_name`);
      }
    });

    describe('add filter should filter - removing takes it back to original status', () => {
      const node = getNode(Lib);

      it('make sure that only the cells with id=1 are present', () => {
        node.setProps({ filters: { id: 1 } });
        for (let i = 0; i < data.getSize(); i += 1) {
          const row = data.getObjectAt(i);
          if (row.id === 0) {
            expect(node.find(`#id_${row.id}`).filter('div')).to.have.length(1, `Can't find cell with id: id_${row.id}`);
            expect(node.find(`#name_${row.id}`).filter('div')).to.have.length(1, `Can't find cell with id: ${row.id}_name`);
            expect(node.find(`#id_${row.id}`).filter('div').text()).to.equal('1', 'While it is the first index it should have the id value of 1');
          } else {
            expect(node.find(`#id_${row.id}`)).to.have.length(0, `Should not find cell with id: id_${row.id}`);
            expect(node.find(`#name_${row.id}`)).to.have.length(0, `Should not find cell with id: ${row.id}_name`);
          }
        }
      });

      it('make sure that all all filtered out', () => {
        node.setProps({ filters: { id: 1, name: 'nonexisting_name' } });

        for (let i = 0; i < data.getSize(); i += 1) {
          const row = data.getObjectAt(i);
          expect(node.find(`#id_${row.id}`)).to.have.length(0, `Should not find cell with id: id_${row.id}`);
          expect(node.find(`#name_${row.id}`)).to.have.length(0, `Should not find cell with id: ${row.id}_name`);
        }
      });


      it('make sure that all cells are present after removing the filter', () => {
        node.setProps({ filters: { id: 1 } });
        node.setProps({ filters: { id: '' } });

        for (let i = 0; i < data.getSize(); i += 1) {
          const row = data.getObjectAt(i);
          expect(node.find(`#id_${row.id}`).filter('div')).to.have.length(1, `Can't find cell with id: id_${row.id}`);
          expect(node.find(`#name_${row.id}`).filter('div')).to.have.length(1, `Can't find cell with id: ${row.id}_name`);
        }
      });
    });
  }

  describe('check functionality with fixed-data-table-2', () => {
    test(FDT);
  });
});

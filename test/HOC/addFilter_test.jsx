/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]*/
import React from 'react';
import { describe, it, beforeEach } from 'mocha';
import { Table, Column, Cell } from 'fixed-data-table';
import { Table as Table2, Column as Column2, Cell as Cell2 } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { TextCell2Ctxt as TextCell2, TextCellCtxt as TextCell } from '../test_setup';
import { addFilter, addDataCtxt } from '../../HOC';
import Data from '../stub/Data';

describe('Investigate addFilter for fixed-data-table-2', () => {
  const data = new Data();
  let node;

  beforeEach(() => {
    const FilterTable = addFilter(addDataCtxt(Table));

    node = mount(
      <FilterTable
        rowHeight={50}
        headerHeight={50}
        height={500}
        width={500}
        filters={{ id: '', name: '' }}
        data={data}
      >
        <Column
          columnKey="id"
          width={250}
          header={<Cell2>ID</Cell2>}
          cell={<TextCell />}
        />
        <Column
          columnKey="name"
          width={250}
          header={<Cell>Name</Cell>}
          cell={<TextCell />}
        />
      </FilterTable>);
  });

  it('should produce the full data when not filtering', () => {
    for (let i = 0; i < data.getSize(); i += 1) {
      expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
      expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
    }
  });

  it('add filter should filter - removing takes it back to original status', () => {
    node.setProps({ filters: { id: 1 } });
    it('make sure that only the cells with id=1 are present', () => {
      for (let i = 0; i < data.getSize(); i += 1) {
        if (i === 1) {
          expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
          expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
        } else {
          expect(node.find(`#${i}_id`)).to.have.length(0, `Should not find cell with id: ${i}_id`);
          expect(node.find(`#${i}_name`)).to.have.length(0, `Should not find cell with id: ${i}_name`);
        }
      }
    });

    node.setProps({ filters: { id: '' } });
    it('make sure that all cells are present after removing the filter', () => {
      for (let i = 0; i < data.getSize(); i += 1) {
        expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
        expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
      }
    });
  });
});

describe('Investigate addFilter for fixed-data-table-2', () => {
  const data = new Data();
  let node;

  beforeEach(() => {
    const FilterTable = addFilter(addDataCtxt(Table2));

    node = mount(
      <FilterTable
        rowHeight={50}
        height={500}
        width={500}
        filters={{ id: '', name: '' }}
        data={data}
      >
        <Column2
          columnKey="id"
          width={250}
          header={<Cell2>ID</Cell2>}
          cell={<TextCell2 />}
        />
        <Column2
          columnKey="name"
          width={250}
          header={<Cell2>Name</Cell2>}
          cell={<TextCell2 />}
        />
      </FilterTable>);
  });

  it('should produce the full data when not filtering', () => {
    for (let i = 0; i < data.getSize(); i += 1) {
      expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
      expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
    }
  });

  it('add filter should filter - removing takes it back to original status', () => {
    node.setProps({ filters: { id: 1 } });
    it('make sure that only the cells with id=1 are present', () => {
      for (let i = 0; i < data.getSize(); i += 1) {
        if (i === 1) {
          expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
          expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
        } else {
          expect(node.find(`#${i}_id`)).to.have.length(0, `Should not find cell with id: ${i}_id`);
          expect(node.find(`#${i}_name`)).to.have.length(0, `Should not find cell with id: ${i}_name`);
        }
      }
    });

    node.setProps({ filters: { id: '' } });
    it('make sure that all cells are present after removing the filter', () => {
      for (let i = 0; i < data.getSize(); i += 1) {
        expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
        expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
      }
    });
  });
});

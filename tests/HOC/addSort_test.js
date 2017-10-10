/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}] */
import React from 'react';
import { describe, it } from 'mocha';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { getCtxtTextCell } from '../test_setup';
import { addSort, addDataCtxt } from '../../src/HOC';
import Data from '../stub/Data';
import SortTypes from '../../src/Data/SortTypes';

describe('Investigate addSort', () => {
  const data = new Data();
  function getNode() {
    const SortTable = addSort(addDataCtxt(Table));

    const TextCell = getCtxtTextCell(Cell);

    const node = mount(
      <SortTable
        rowHeight={50}
        headerHeight={50}
        height={500}
        width={500}
        sortColumn=""
        sortDir=""
        data={data}
      >
        <Column
          columnKey="id"
          width={250}
          header={<Cell>ID</Cell>}
          cell={<TextCell />}
        />
        <Column
          columnKey="name"
          width={250}
          header={<Cell>Name</Cell>}
          cell={<TextCell />}
        />
      </SortTable>,
    );

    return node;
  }

  const node = getNode();

  it('should produce the full data in standard order when not sorting', () => {
    const txt = node.html();
    for (let i = 0; i < data.getSize() - 1; i += 1) {
      const first = new RegExp(`.+id="id_${i}"(.+)`);
      const second = new RegExp(`id="id_${i + 1}"`);
      expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i + 1} doesn't appear after ${i}`);
    }
  });

  describe('add sorting column + direction should trigger sort', () => {
    it('make sure that the order is descending', () => {
      node.setProps({
        sortColumn: 'id',
        sortDir: SortTypes.DESC,
      });

      const txt = node.html();
      for (let i = data.getSize() - 1; i > 0; i -= 1) {
        const first = new RegExp(`<div [^>]+id="id_${i}"(.+)`);
        const second = new RegExp(`id="id_${i - 1}"`);
        expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i - 1} doesn't appear after ${i}`);
      }
    });

    it('make sure that the order is ascending after changing from descending', () => {
      node.setProps({
        sortColumn: 'id',
        sortDir: SortTypes.DESC,
      });

      node.setProps({
        sortColumn: 'name',
        sortDir: SortTypes.ASC,
      });

      const txt = node.html();
      for (let i = 0; i < data.getSize() - 1; i += 1) {
        const first = new RegExp(`.+id="id_${i}"(.+)`);
        const second = new RegExp(`id="id_${i + 1}"`);
        expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i + 1} doesn't appear after ${i}`);
      }
    });
  });
});

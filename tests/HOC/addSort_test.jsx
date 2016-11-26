/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]*/
import React from 'react';
import { describe, it } from 'mocha';
import FDT from 'fixed-data-table';
import FDT2 from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { getCtxtTextCell } from '../test_setup';
import { addSort, addDataCtxt } from '../../src/HOC';
import Data from '../stub/Data';
import SortTypes from '../../src/Data/SortTypes';

describe('Investigate addSort', () => {
  const data = new Data();
  function getNode(Lib) {
    const SortTable = addSort(addDataCtxt(Lib.Table));

    const TextCell = getCtxtTextCell(Lib);

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
      </SortTable>);

    return node;
  }

  function test(Lib) {
    const node = getNode(Lib);

    it('should produce the full data in standard order when not sorting', () => {
      const txt = node.html();
      for (let i = 0; i < data.getSize() - 1; i += 1) {
        const first = new RegExp(`.+id="${i}_id"(.+)`);
        const second = new RegExp(`id="${i + 1}_id"`);
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
        for (let i = data.getSize(); i > 0; i -= 1) {
          const first = new RegExp(`.+id="${i}_id"(.+)`);
          const second = new RegExp(`id="${i - 1}_id"`);
          expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i + 1} doesn't appear after ${i}`);
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
          const first = new RegExp(`.+id="${i}_id"(.+)`);
          const second = new RegExp(`id="${i + 1}_id"`);
          expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i + 1} doesn't appear after ${i}`);
        }
      });
    });
  }

  describe('check functionality with fixed-data-table', () => {
    test(FDT);
  });

  describe('check functionality with fixed-data-table-2', () => {
    test(FDT2);
  });
});

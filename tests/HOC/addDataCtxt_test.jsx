/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { describe, it } from 'mocha';
import FDT from 'fixed-data-table';
import FDT2 from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Data from '../stub/Data';
import { addDataCtxt } from '../../HOC';
import { getCtxtTextCell } from '../test_setup';

describe('Investigate addDataCtxt', () => {
  const data = new Data();
  function getNode(Lib) {
    const TextCell = getCtxtTextCell(Lib);
    const DataTable = addDataCtxt(Lib.Table);

    const node = mount(
      <DataTable
        rowHeight={50}
        headerHeight={50}
        height={500}
        width={500}
        data={data}
      >
        <Lib.Column
          columnKey="id"
          width={250}
          header={<Lib.Cell>ID</Lib.Cell>}
          cell={<TextCell data={data} />}
        />
        <Lib.Column
          columnKey="name"
          width={250}
          header={<Lib.Cell>Name</Lib.Cell>}
          cell={<TextCell data={data} />}
        />
      </DataTable>);

    return node;
  }

  function test(Lib) {
    const node = getNode(Lib);

    it('make sure that all cells are present', () => {
      for (let i = 0; i < data.getSize(); i += 1) {
        expect(node.find(`#${i}_id`)).to.have.length(1, `Can't find cell with id: ${i}_id`);
        expect(node.find(`#${i}_name`)).to.have.length(1, `Can't find cell with id: ${i}_name`);
      }
    });

    it('make sure the order is correct', () => {
      const txt = node.html();
      for (let i = 0; i < data.getSize() - 1; i += 1) {
        const first = new RegExp(`.+id="${i}_id"(.+)`);
        const second = new RegExp(`id="${i + 1}_id"`);
        expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i + 1} doesn't appear after ${i}`);
      }
    });
  }

  describe('check functionality for fixed-data-table', () => {
    test(FDT);
  });

  describe('check functionality for fixed-data-table-2', () => {
    test(FDT2);
  });
});

/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { describe, it } from 'mocha';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Data from '../stub/Data';
import { addDataCtxt } from '../../src/HOC';
import { getCtxtTextCell } from '../test_setup';

describe('Investigate addDataCtxt', () => {
  const data = new Data();
  function getNode() {
    const TextCell = getCtxtTextCell(Cell);
    const DataTable = addDataCtxt(Table);

    const node = mount(
      <DataTable
        rowHeight={50}
        headerHeight={50}
        height={500}
        width={500}
        data={data}
      >
        <Column
          columnKey="id"
          width={250}
          header={<Cell>ID</Cell>}
          cell={<TextCell data={data} />}
        />
        <Column
          columnKey="name"
          width={250}
          header={<Cell>Name</Cell>}
          cell={<TextCell data={data} />}
        />
      </DataTable>,
    );

    return node;
  }

  const node = getNode();
  it('make sure that all cells are present', () => {
    for (let i = 0; i < data.getSize(); i += 1) {
      expect(node.find(`#id_${i}`).filter('div')).to.have.length(1, `Can't find cell with id: id_${i}`);
      expect(node.find(`#name_${i}`).filter('div')).to.have.length(1, `Can't find cell with id: ${i}_name`);
    }
  });

  it('make sure the order is correct', () => {
    const txt = node.html();
    for (let i = 0; i < data.getSize() - 1; i += 1) {
      const first = new RegExp(`.+id="id_${i}"(.+)`);
      const second = new RegExp(`id="id_${i + 1}"`);
      expect(txt.replace(first, '($1)').match(second)).to.not.be.null(`The ${i + 1} doesn't appear after ${i}`);
    }
  });
});

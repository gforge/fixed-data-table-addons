/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */ import React from 'react';
import { describe, it } from 'mocha';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Data from '../stub/Data';
import { getTextCell } from '../test_setup';

describe('Basic test for verifying core table functionality', () => {
  const data = new Data();
  function getNode() {
    const TextCell = getTextCell(Cell);

    const node = mount(
      <Table rowHeight={50} headerHeight={50} height={500} width={500} rowsCount={data.getSize()}>
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
      </Table>,
    );

    return node;
  }

  const node = getNode();

  it('make sure that all cells are present', () => {
    for (let i = 0; i < data.getSize(); i += 1) {
      const id = `#id_${i}`;
      expect(node.find(id).filter('div')).to.have.length(1, `Can't find cell with id: ${id}`);
      const name = `#name_${i}`;
      expect(node.find(name).filter('div')).to.have.length(1, `Can't find cell with id: ${name}`);
    }
  });

  it('make sure the order is correct', () => {
    const txt = node.html();
    for (let i = 0; i < data.getSize() - 1; i += 1) {
      const first = new RegExp(`.*<div [^>]*id=("id_${i}".+)`);
      const second = new RegExp(`id="id_${i + 1}"`);
      expect(txt.replace(first, '($1)').match(second)).to.not.be.null(
        `The ${i + 1} doesn't appear after ${i}`,
      );
    }
  });
});

/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { describe, it, beforeEach } from 'mocha';
import { Table, Column, Cell } from 'fixed-data-table';
import { Table as Table2, Column as Column2, Cell as Cell2 } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Data from '../stub/Data';
import { TextCell2, TextCell } from '../test_setup';

describe('Basic test for fixed-data-table', () => {
  const data = new Data();
  let node;
  beforeEach(() => (
    node = mount(<Table
      rowHeight={50}
      headerHeight={50}
      height={500}
      width={500}
      filters={{ name: '' }}
      rowsCount={data.getSize()}
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
    </Table>)
  ));

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
});

describe('Basic test for fixed-data-table-2', () => {
  const data = new Data();
  let node;
  beforeEach(() => (
    node = mount(<Table2
      rowHeight={50}
      headerHeight={50}
      height={500}
      width={500}
      filters={{ name: '' }}
      rowsCount={data.getSize()}
    >
      <Column2
        columnKey="id"
        width={250}
        header={<Cell2>ID</Cell2>}
        cell={<TextCell2 data={data} />}
      />
      <Column2
        columnKey="name"
        width={250}
        header={<Cell2>Name</Cell2>}
        cell={<TextCell2 data={data} />}
      />
    </Table2>)
  ));

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
});

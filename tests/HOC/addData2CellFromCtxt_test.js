/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { describe, it } from 'mocha';
import { Cell } from 'fixed-data-table-2';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Data from '../stub/Data';
import { addData2CellFromCtxt } from '../../src/HOC';

describe('Investigate addData2CellFromCtxt', () => {
  const testData = new Data();

  function getNode() {
    const CoreCell = ({
      rowIndex, columnKey, data, ...other // eslint-disable-line
    }) => {
      const output = `\n\tTest data: ${data.getObjectAt(rowIndex)[columnKey]}\n`;
      return (
        <Cell {...other}>
          {output}
        </Cell>
      );
    };
    const DataCell = addData2CellFromCtxt(CoreCell);

    const node = mount(
      <DataCell columnKey="id" rowIndex={0} />,
      { context: { data: testData } },
    );

    return node;
  }

  const node = getNode();
  it('test that basic output can be created from data', () => {
    const txt = node.html();
    expect(txt.match(/Test data: 0/)).to.not.be.null();
    expect(txt.match(/Test data: 1/)).to.be.null();
  });
});

/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]*/
import React from 'react';
import { describe, it } from 'mocha';
import { Table as Table2, Column as Column2, Cell as Cell2 } from 'fixed-data-table-2';
import { renderComponent, expect } from '../test_helper';
import { addFilter, addDataCtxt, addData2CellFromCtxt } from '../../HOC';
import Data from '../stub/Data';

const TextCell = addData2CellFromCtxt(({ rowIndex, columnKey, data }) =>
  (<Cell2>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell2>));

TextCell.propTypes = {
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
};

describe('Investigate addFilter', () => {
  it('should produce the full data when not filtering', () => {
    const FilterTable = addFilter(addDataCtxt(Table2));
    const data = new Data();

    const node = renderComponent(props =>
      (<FilterTable
        rowHeight={50}
        height={500}
        width={500}
        filters={{ name: '' }}
        data={data}
        {...props}
      >
        <Column2
          columnKey="id"
          width={250}
          header={<Cell2>ID</Cell2>}
          cell={<TextCell />}
        />
        <Column2
          columnKey="name"
          width={250}
          header={<Cell2>Name</Cell2>}
          cell={<TextCell />}
        />
      </FilterTable>));

    for (let i = 0; i < data.getSize(); i += 1) {
      expect(node).to.contains(`Test name no ${i}`);
    }
  });
});

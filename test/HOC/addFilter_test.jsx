/* eslint "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]*/
import React from 'react';
import { describe, it } from 'mocha';
import { Table as Table2, Column as Column2, Cell as Cell2 } from 'fixed-data-table-2';
import { renderComponent, expect } from '../test_helper';
import HOC from '../../HOC';
import Data from '../stub/Data';

const TextCell = ({ rowIndex, columnKey }, { data }) =>
  (<Cell2>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell2>);

TextCell.propTypes = {
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
};

describe('Investigate addFilter', () => {
  it('should produce the full data when not filtering', () => {
    const FilterTable = HOC.addFilter(HOC.addDataCtxt(Table2));
    const node = renderComponent(
      <FilterTable
        rowHeight="50"
        filters={{ name: '' }}
        data={new Data()}
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
      </FilterTable>);

    expect(node).to.contain('Test name no 42');
  });
});

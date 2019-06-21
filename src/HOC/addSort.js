// @flow
import * as React from 'react';
import except from 'except';
import { getRowValue, DataListWrapper, SortTypes } from '../Data';
import type { BasicDataType } from '../PropTypes/BasicData';

type SortProps = {
  data: BasicDataType,
  sortColumn: string,
  sortDir: string,
  children: React.Node,
};

function addSort(
  TableComponent: React.ComponentType<any>,
  onlyTouched: boolean = true,
): React.ComponentType<SortProps> {
  class SortTable extends React.Component<SortProps, { version: number }> {
    state = {
      version: 0,
    };

    refresh = () => {
      const { version } = this.state;
      this.setState({
        version: version + 1,
      });
    };

    _getDataWrapper(indexMap = null) {
      const { data } = this.props;
      const sortedData = new DataListWrapper(data, indexMap);
      sortedData.setCallback(this.refresh, 'sort');
      return sortedData;
    }

    _getIndexes() {
      const { data } = this.props;
      const indexes = [];
      const size = data.getSize();
      for (let index = 0; index < size; index += 1) {
        indexes.push(index);
      }

      return indexes;
    }

    sort() {
      const { data } = this.props;
      const { sortColumn, sortDir } = this.props;
      let sortIndexes = null;
      if (sortColumn && sortColumn.length > 0 && data.getSize() > 0) {
        sortIndexes = this._getIndexes();
        sortIndexes.sort((indexA, indexB) => {
          // Don't trigger get if this object isn't visible according to the table
          // this will otherwise download a paged data. This should be handled by the
          // backend as it will otherwise cascade a download
          if (onlyTouched && (!data.isTouched(indexA) || !data.isTouched(indexB))) return 0;

          const rowA = data.getObjectAt(indexA);
          const rowB = data.getObjectAt(indexB);
          if (rowA === null && rowB === null) {
            return 0;
          }

          let sortVal = 0;
          if (rowA == null) {
            sortVal = 1;
          } else if (rowB == null) {
            sortVal = -1;
          } else {
            const valueA = getRowValue(rowA, sortColumn);
            const valueB = getRowValue(rowB, sortColumn);
            if (valueA > valueB) {
              sortVal = 1;
            }
            if (valueA < valueB) {
              sortVal = -1;
            }
          }

          if (sortVal !== 0 && sortDir === SortTypes.DESC) {
            sortVal *= -1;
          }

          return sortVal;
        });
      }

      return this._getDataWrapper(sortIndexes);
    }

    render() {
      const { children } = this.props;
      const other = except(this.props, ['children', 'data', 'sortColumn', 'sortDir']);
      const sortedData = this.sort();
      return (
        <TableComponent data={sortedData} {...other}>
          {children}
        </TableComponent>
      );
    }
  }

  return SortTable;
}

export default addSort;

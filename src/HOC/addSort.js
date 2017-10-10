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
}

function addSort(
  TableComponent: React.ComponentType<any>,
  onlyTouched: boolean = true,
): React.ComponentType<any> {
  class SortTable extends React.Component<SortProps, { version: number }> {
    constructor(props) {
      super(props);

      this.state = {
        version: 0,
      };

      this.refresh = this.refresh.bind(this);
    }

    refresh: Function
    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    _getDataWrapper(indexMap = null) {
      const sortedData = new DataListWrapper(this.props.data, indexMap);
      sortedData.setCallback(this.refresh, 'sort');
      return sortedData;
    }

    _getIndexes() {
      const indexes = [];
      const size = this.props.data.getSize();
      for (let index = 0; index < size; index += 1) {
        indexes.push(index);
      }

      return (indexes);
    }

    sort() {
      const { sortColumn, sortDir } = this.props;
      let sortIndexes = null;
      if (sortColumn &&
          sortColumn.length > 0 &&
          this.props.data.getSize() > 0) {
        sortIndexes = this._getIndexes();
        sortIndexes.sort((indexA, indexB) => {
          const { data } = this.props;
          // Don't trigger get if this object isn't visible according to the table
          // this will otherwise download a paged data. This should be handled by the
          // backend as it will otherwise cascade a download
          if (onlyTouched && (!data.isTouched(indexA) || !data.isTouched(indexB))) return 0;

          const rowA = this.props.data.getObjectAt(indexA);
          const rowB = this.props.data.getObjectAt(indexB);
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
      const other = except(this.props, ['children', 'data', 'sortColumn', 'sortDir']);
      const sortedData = this.sort();
      return (
        <TableComponent
          data={sortedData}
          {...other}
        >
          {this.props.children}
        </TableComponent>
      );
    }
  }

  return SortTable;
}

export default addSort;

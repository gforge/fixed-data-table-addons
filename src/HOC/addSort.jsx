import React from 'react';
import except from 'except';
import { getRowValue, DataListWrapper, SortTypes } from '../Data';
import * as PropTypes from '../PropTypes';

function addSort(TableComponent) {
  class SortTable extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        version: 0,
      };

      this.refresh = this.refresh.bind(this);
    }

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
          sortColumn.length > 0) {
        sortIndexes = this._getIndexes();
        sortIndexes.sort((indexA, indexB) => {
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
      const other = except(this.props, Object.keys(SortTable.propTypes));
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

  SortTable.propTypes = {
    data: PropTypes.createWithProps(['getSize', 'getObjectAt']),
    sortColumn: React.PropTypes.string,
    sortDir: React.PropTypes.string,
    children: React.PropTypes.node,
  };

  return SortTable;
}

export default addSort;

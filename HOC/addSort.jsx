import React from 'react';
import except from 'except';
import DataListWrapper from '../Data/DataListWrapper';
import getRowValue from '../Data/getRowValue';
import { createPropTypeWithProperties } from '../Data/PropTypes';

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
          const objA = this.props.data.getObjectAt(indexA);
          const objB = this.props.data.getObjectAt(indexB);
          if (objA === null && objB === null) {
            return 0;
          }

          let sortVal = 0;
          if (objA == null) {
            sortVal = 1;
          } else if (objB == null) {
            sortVal = -1;
          } else {
            const valueA = getRowValue(objA, sortColumn);
            const valueB = getRowValue(objB, sortColumn);
            if (valueA > valueB) {
              sortVal = 1;
            }
            if (valueA < valueB) {
              sortVal = -1;
            }
          }

          if (sortVal !== 0 && sortDir === 'ASC') {
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
    data: createPropTypeWithProperties(['getSize', 'getObjectAt']),
    sortColumn: React.PropTypes.string,
    sortDir: React.PropTypes.string,
    children: React.PropTypes.node,
  };

  return SortTable;
}

export default addSort;

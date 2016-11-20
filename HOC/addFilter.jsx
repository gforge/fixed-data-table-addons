import React from 'react';
import except from 'except';
import DataListWrapper from '../Data/DataListWrapper';
import getRowValue from '../Data/getRowValue';
import { createPropTypeWithProperties, PropTypeFilter } from '../Data/PropTypes';

function match(haystack, needle) {
  let hay = haystack;
  if (typeof (haystack) !== 'string') {
    hay = haystack.toString();
  }
  return (hay.toLowerCase().indexOf(needle) !== -1);
}

function filterFn(row, key, filters) {
  const value = getRowValue(row, key);

  if (value === null || value === undefined) {
    throw new Error(`Couldn't identify a valid value for ${key} in row`);
  }

  return (match(value, filters[key]));
}

function addFilter(TableComponent, filter = filterFn) {
  class FilterTable extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);

      this.state = {
        version: 0,
      };
    }

    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    _getDataWrapper(indexMap = null) {
      const filteredData = new DataListWrapper(this.props.data, indexMap);
      filteredData.setCallback(this.refresh, 'filter');
      return filteredData;
    }

    filter() {
      // Get and prep filters
      const filters = {};
      Object
        .keys(this.props.filters)
        .filter(key => this.props.filters[key].length > 0)
        .forEach((key) => {
          filters[key] = this.props.filters[key].toLowerCase();
          return (null);
        });

      let filteredIndexes = null;
      if (Object.keys(filters).length > 0) {
        filteredIndexes = [];
        for (let index = 0; index < this.props.data.getSize(); index += 1) {
          const row = this.props.data.getObjectAt(index);
          // If the object is null it may be loading and should therefore be kept
          if (row === null) {
            filteredIndexes.push(index);
          } else {
            let found = true;
            for (const key of Object.keys(filters)) {
              found = filter(row, key, filters);
              if (!found) {
                break;
              }
            }

            if (found) {
              filteredIndexes.push(index);
            }
          }
        }
      }

      return (this._getDataWrapper(filteredIndexes));
    }

    render() {
      const other = except(this.props, Object.keys(FilterTable.propTypes));
      const filteredData = this.filter();
      return (
        <TableComponent
          data={filteredData}
          {...other}
        >
          {this.props.children}
        </TableComponent>
      );
    }
  }

  FilterTable.propTypes = {
    data: createPropTypeWithProperties(['getSize', 'getObjectAt']),
    children: React.PropTypes.node,
    filters: PropTypeFilter,
  };

  return FilterTable;
}


export default addFilter;

// @flow
import * as React from 'react';
import except from 'except';
import { DataListWrapper, getRowValue } from '../Data';
import type { BasicDataType } from '../PropTypes/BasicData';

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

type Props = {
  data: BasicDataType,
  children: React.Node,
  filters: Map<string, string>,
}

function addFilter(
  TableComponent: React.ComponentType<Props>,
  filter: Function = filterFn,
): React.Component<Props, { version: number }> {
  class FilterTable extends React.Component<Props, { version: number }> {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);

      this.state = {
        version: 0,
      };
    }

    refresh: Function
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
        .map((key) => {
          // $FlowFixMe
          if (typeof this.props.filters[key] !== 'string') {
            // $FlowFixMe
            this.props.filters[key] = this.props.filters[key].toString();
          }

          return (key);
        })
        // $FlowFixMe
        .filter(key => this.props.filters[key].length > 0)
        .forEach((key) => {
          // $FlowFixMe
          filters[key] = this.props.filters[key].toLowerCase();
        });

      let filteredIndexes = null;
      if (Object.keys(filters).length > 0 &&
          this.props.data.getSize() > 0) {
        filteredIndexes = [];
        for (let index = 0; index < this.props.data.getSize(); index += 1) {
          // Don't trigger get if this object isn't visible according to the table
          // this will otherwise download a paged data
          if (this.props.data.isTouched(index)) {
            const row = this.props.data.getObjectAt(index);
            // If the object is null it may be loading and should therefore be kept
            if (row === null) {
              filteredIndexes.push(index);
            } else {
              let found = true;
              const keys = Object.keys(filters);
              for (let i = 0; i < keys.length; i += 1) {
                found = filter(row, keys[i], filters);
                if (!found) {
                  break;
                }
              }

              if (found) {
                filteredIndexes.push(index);
              }
            }
          } else {
            // Don't filter anything that's not in the table
            filteredIndexes.push(index);
          }
        }
      }

      return (this._getDataWrapper(filteredIndexes));
    }

    render() {
      const filteredData = this.filter();
      const other = except(this.props, ['children', 'filters', 'data']);
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

  // $FlowFixMe
  return FilterTable;
}


export default addFilter;

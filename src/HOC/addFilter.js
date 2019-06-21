// @flow
import * as React from 'react';
import except from 'except';
import { DataListWrapper, getRowValue } from '../Data';
import type { BasicDataType } from '../PropTypes/BasicData';

function match(haystack, needle) {
  let hay = haystack;
  if (typeof haystack !== 'string') {
    hay = haystack.toString();
  }
  return hay.toLowerCase().indexOf(needle) !== -1;
}

function filterFn(row, key, filters) {
  const value = getRowValue(row, key);

  if (value === null || value === undefined) {
    throw new Error(`Couldn't identify a valid value for ${key} in row`);
  }

  return match(value, filters[key]);
}

type Props = {
  data: BasicDataType,
  children: React.Node,
  filters: { [key: string]: string },
};

function addFilter(
  TableComponent: React.ComponentType<Props>,
  filter: Function = filterFn,
): React.AbstractComponent<Props> {
  class FilterTable extends React.Component<Props, { version: number }> {
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
      const filteredData = new DataListWrapper(data, indexMap);
      filteredData.setCallback(this.refresh, 'filter');
      return filteredData;
    }

    filter() {
      const { filters: propFilters, data } = this.props;
      // Get and prep filters
      const filters = {};
      Object.keys(propFilters)
        .map((key) => {
          if (typeof propFilters[key] !== 'string') {
            propFilters[key] = propFilters[key].toString();
          }

          return key;
        })
        .filter(key => propFilters[key].length > 0)
        .forEach((key) => {
          filters[key] = propFilters[key].toLowerCase();
        });

      let filteredIndexes = null;
      if (Object.keys(filters).length > 0 && data.getSize() > 0) {
        filteredIndexes = [];
        for (let index = 0; index < data.getSize(); index += 1) {
          // Don't trigger get if this object isn't visible according to the table
          // this will otherwise download a paged data
          if (data.isTouched(index)) {
            const row = data.getObjectAt(index);
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

      return this._getDataWrapper(filteredIndexes);
    }

    render() {
      const filteredData = this.filter();
      const other = except(this.props, ['children', 'filters', 'data']);
      const { children } = this.props;
      return (
        <TableComponent data={filteredData} {...other}>
          {children}
        </TableComponent>
      );
    }
  }

  return FilterTable;
}

export default addFilter;

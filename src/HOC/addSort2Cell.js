/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow
import * as React from 'react';
import except from 'except';
import { SortTypes } from '../Data';

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

type SortCellProp = {
  onSortChange: (columnKey: string | number, 'ASC' | 'DESC') => void,
  sortDir: string,
  sortColumn: string,
  columnKey: string | number,
  children: React.Node,
};

function convertIndicator2Object(
  ind: any,
): {
  active: React.Node,
  inactive: React.Node,
} {
  let indicator;

  if (typeof ind === 'string' || React.isValidElement(ind)) {
    indicator = {
      active: ind,
      inactive: '',
    };
  } else if (
    typeof ind === 'object'
    && {}.hasOwnProperty.call(ind, 'active')
    && {}.hasOwnProperty.call(ind, 'inactive')
  ) {
    indicator = ind;
  } else {
    throw new Error(
      `The indicator is of invalid type (${typeof ind}). Expected either a string`
        + ' for the active status or an object with the elements "active"'
        + ' and "inactive"',
    );
  }

  return indicator;
}

function addSort2Cell(
  Cell: React.ComponentType<SortCellProp>,
  indDesc: string = '↓',
  indAsc: string = '↑',
  alwaysShow: boolean = true,
): React.ComponentType<SortCellProp> {
  const indicator = {
    desc: convertIndicator2Object(indDesc),
    asc: convertIndicator2Object(indAsc),
  };

  /**
   * This React component adds to the header sort funcitonality decorating with
   * arrow and adding a onClick to the header link.
   */
  class SortCell extends React.Component<SortCellProp> {
    _onSortChange = (e) => {
      e.preventDefault();

      const { onSortChange, columnKey, sortDir } = this.props;
      if (onSortChange) {
        // TODO: Add indicator for handling large sort operations
        return new Promise(() => {
          onSortChange(columnKey, sortDir ? reverseSortDirection(sortDir) : SortTypes.DESC);
        });
      }

      return null;
    };

    render() {
      const {
        columnKey, sortDir, sortColumn, children,
      } = this.props;
      const other = except(this.props, [
        'onSortChange',
        'sortDir',
        'sortColumn',
        'columnKey',
        'children',
      ]);
      let sortInd = '';
      if (sortDir && columnKey === sortColumn) {
        sortInd = (
          <span className="sortIndicator">
            {sortDir === SortTypes.DESC ? indicator.desc.active : indicator.desc.inactive}
            {sortDir !== SortTypes.DESC ? indicator.asc.active : indicator.asc.inactive}
          </span>
        );
      } else if (alwaysShow) {
        sortInd = (
          <span className="sortIndicator">
            {indicator.desc.inactive}
            {indicator.asc.inactive}
          </span>
        );
      }

      return (
        <Cell columnKey={columnKey} {...other}>
          <a
            onClick={this._onSortChange}
            role="button"
            onKeyPress={this._onSortChange}
            tabIndex={0}
          >
            {children}
            {sortInd}
          </a>
        </Cell>
      );
    }
  }

  return SortCell;
}

export default addSort2Cell;

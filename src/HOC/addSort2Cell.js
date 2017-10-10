import React from 'react';
import PropTypes from 'prop-types';
import except from 'except';
import SortTypes from '../Data/SortTypes';

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

function convertIndicator2Object(ind) {
  let indicator;

  if (typeof ind === 'string' || React.isValidElement(ind)) {
    indicator = {
      active: ind,
      inactive: '',
    };
  } else if (typeof ind === 'object' &&
    {}.hasOwnProperty.call(ind, 'active') &&
    {}.hasOwnProperty.call(ind, 'inactive')) {
    indicator = ind;
  } else {
    throw new Error(`The indicator is of invalid type (${typeof ind}). Expected either a string` +
                    ' for the active status or an object with the elements "active"' +
                    ' and "inactive"');
  }

  return (indicator);
}

function addSort2Cell(Cell, indDesc = '↓', indAsc = '↑', alwaysShow = true) {
  const indicator = {
    desc: convertIndicator2Object(indDesc),
    asc: convertIndicator2Object(indAsc),
  };

  /**
  * This React component adds to the header sort funcitonality decorating with
  * arrow and adding a onClick to the header link.
  */
  class SortCell extends React.Component {
    constructor(props) {
      super(props);

      this._onSortChange = this._onSortChange.bind(this);
    }

    _onSortChange(e) {
      e.preventDefault();

      if (this.props.onSortChange) {
        // TODO: Add indicator for handling large sort operations
        return new Promise(() => {
          this.props.onSortChange(
            this.props.columnKey,
            this.props.sortDir ?
            reverseSortDirection(this.props.sortDir) :
            SortTypes.DESC,
          );
        });
      }

      return (null);
    }

    render() {
      const { columnKey, sortDir, sortColumn, children } = this.props;
      const other = except(this.props, Object.keys(SortCell.propTypes));
      let sortInd = '';
      if (sortDir && columnKey === sortColumn) {
        sortInd =
          (<span className="sortIndicator">
            {sortDir === SortTypes.DESC ? indicator.desc.active : indicator.desc.inactive}
            {sortDir !== SortTypes.DESC ? indicator.asc.active : indicator.asc.inactive}
          </span>);
      } else if (alwaysShow) {
        sortInd =
          (<span className="sortIndicator">
            {indicator.desc.inactive}
            {indicator.asc.inactive}
          </span>);
      }

      return (
        <Cell columnKey={columnKey} {...other}>
          <a onClick={this._onSortChange} tabIndex="0">
            {children}
            {sortInd}
          </a>
        </Cell>
      );
    }
  }

  SortCell.propTypes = {
    onSortChange: PropTypes.func.isRequired,
    sortDir: PropTypes.string,
    sortColumn: PropTypes.string,
    columnKey: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  SortCell.sortTypes = SortTypes;

  return SortCell;
}

export default addSort2Cell;

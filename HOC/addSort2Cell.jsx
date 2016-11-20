import React, { PropTypes } from 'react';
import except from 'except';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

function addSort2Cell(Cell, indDesc = '↓', indAsc = '↑') {
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
            SortTypes.DESC
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
        sortInd = (sortDir === SortTypes.DESC ? indDesc : indAsc);
      }

      return (
        <Cell columnKey={columnKey} {...other}>
          <a onClick={this._onSortChange} tabIndex="0">
            {children} {sortInd}
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

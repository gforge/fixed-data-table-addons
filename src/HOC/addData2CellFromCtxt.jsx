import React from 'react';
import { PropTypes } from '../Data';

function addData2CellFromCtxt(Cell) {
  const DataCell = (props, { data }) => {
    const propsWithData = Object.assign({}, props, { data });
    return (<Cell {...propsWithData} />);
  };

  DataCell.contextTypes = {
    data: PropTypes.BasicData,
  };

  return DataCell;
}


export default addData2CellFromCtxt;

import React from 'react';
import { BasicData } from '../PropTypes';

function addData2CellFromCtxt(Cell) {
  const DataCell = (props, { data }) => {
    const propsWithData = Object.assign({}, props, { data });
    return (<Cell {...propsWithData} />);
  };

  DataCell.contextTypes = {
    data: BasicData,
  };

  return DataCell;
}


export default addData2CellFromCtxt;

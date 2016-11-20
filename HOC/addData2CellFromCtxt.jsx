import React from 'react';
import { PropTypeData } from '../Data/PropTypes';

function addData2CellFromCtxt(Cell) {
  const DataCell = (props, { data }) => {
    const propsWithData = Object.assign({}, props, { data });
    return (<Cell {...propsWithData} />);
  };

  DataCell.contextTypes = {
    data: PropTypeData,
  };

  return DataCell;
}


export default addData2CellFromCtxt;

// @flow
import * as React from 'react';
import BasicData, { type BasicDataType } from '../PropTypes/BasicData';

function addData2CellFromCtxt<P: {}>(
  Cell2Expand: React.ComponentType<P & { data: BasicDataType }>,
): React.ComponentType<P> {
  const DataCell = (props, { data }) => {
    const propsWithData = Object.assign({}, props, { data });
    return <Cell2Expand {...propsWithData} />;
  };

  DataCell.contextTypes = {
    data: BasicData,
  };

  return DataCell;
}

export default addData2CellFromCtxt;

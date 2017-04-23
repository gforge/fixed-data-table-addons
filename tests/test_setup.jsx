/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import PropTypes from 'prop-types';
import jsdom from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import { PropTypes as CustomPropTypes } from '../src';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

Error.stackTraceLimit = 10;
chai.use(chaiEnzyme);
chai.use(dirtyChai);

export function getTextCell(Lib) {
  const TxtCell = ({ rowIndex, columnKey, data }) => (
    <Lib.Cell id={`${rowIndex}_${columnKey}`}>
      {data.getObjectAt(rowIndex)[columnKey]}
    </Lib.Cell>);

  TxtCell.propTypes = {
    rowIndex: PropTypes.number,
    columnKey: PropTypes.string,
    data: CustomPropTypes.BasicData,
  };

  return TxtCell;
}

export function getCtxtTextCell(Lib) {
  const TxtCtxt = ({ rowIndex, columnKey }, { data }) => {
    const row = data.getObjectAt(rowIndex);

    return (<Lib.Cell id={`${row.id}_${columnKey}`}>
      {row[columnKey]}
    </Lib.Cell>);
  };

  TxtCtxt.propTypes = {
    rowIndex: PropTypes.number,
    columnKey: PropTypes.string,
  };

  TxtCtxt.contextTypes = {
    data: CustomPropTypes.BasicData,
  };

  return TxtCtxt;
}

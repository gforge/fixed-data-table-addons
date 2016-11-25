/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */import React from 'react';
import { Cell } from 'fixed-data-table';
import { Cell as Cell2 } from 'fixed-data-table-2';
import jsdom from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import { PropTypeData } from '../Data/PropTypes';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

Error.stackTraceLimit = 10;
chai.use(chaiEnzyme);
chai.use(dirtyChai);

export const TextCell = ({ rowIndex, columnKey, data }) => (
  <Cell id={`${rowIndex}_${columnKey}`}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>);

TextCell.propTypes = {
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
  data: PropTypeData,
};

export const TextCell2 = ({ rowIndex, columnKey, data }) =>
  (<Cell2 id={`${rowIndex}_${columnKey}`}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell2>);

TextCell2.propTypes = {
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
  data: PropTypeData,
};

// Context variants

export const TextCellCtxt = ({ rowIndex, columnKey }, { data }) =>
  (<Cell id={`${rowIndex}_${columnKey}`}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>);

TextCellCtxt.propTypes = {
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
};

TextCellCtxt.contextTypes = {
  data: PropTypeData,
};

export const TextCell2Ctxt = ({ rowIndex, columnKey }, { data }) =>
  (<Cell2 id={`${rowIndex}_${columnKey}`}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell2>);

TextCell2Ctxt.propTypes = {
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
};

TextCell2Ctxt.contextTypes = {
  data: PropTypeData,
};

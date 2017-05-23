/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React from 'react';
import PropTypes from 'prop-types';
import { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import { PropTypes as CustomPropTypes } from '../src';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

Error.stackTraceLimit = 10;
chai.use(chaiEnzyme);
chai.use(dirtyChai);

export function getTextCell(Lib) {
  const TxtCell = ({ rowIndex, columnKey, data }) => (
    <Lib.Cell id={`${rowIndex}_${columnKey}`}>
      {data.getObjectAt(rowIndex)[columnKey]}
    </Lib.Cell>);

  TxtCell.defaultProps = {
    rowIndex: undefined,
    columnKey: undefined,
    data: undefined,
  };

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

  TxtCtxt.defaultProps = {
    rowIndex: undefined,
    columnKey: undefined,
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

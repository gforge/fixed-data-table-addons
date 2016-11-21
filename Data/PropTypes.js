import { PropTypes } from 'react';
import DataListWrapper from './DataListWrapper';

function createPropTypeWithProperties(properties, errorDesc = {
  getObjectAt: 'The function should return the row',
  getSize: 'The function should return the number of row (row count)',
}) {
  if (!(properties instanceof Array)) {
    throw new Error('The properties that you want to check should be an Array');
  }

  return (props, propName, componentName) => {
    const dataObj = props[propName];
    if (dataObj === undefined) {
      return (null);
    }

    for (const property of properties) {
      if (typeof (dataObj[property]) !== 'function') {
        return new Error(
          [
            `${componentName} requires that ${propName}`,
            `has a '${property}()' function.`,
            errorDesc[property],
          ].join(' '));
      }
    }

    return (null);
  };
}

const PropTypeData = createPropTypeWithProperties(['getSize', 'getObjectAt']);
const PropTypeDataListWrapper = PropTypes.instanceOf(DataListWrapper);

function PropTypeFilter(props, propName, componentName) {
  const dataObj = props[propName];

  if (typeof (dataObj) !== 'object') {
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'is an object that can be used for filtering.',
        'You have provided a:',
        typeof (dataObj),
      ].join(' ')
    );
  }

  if (Object.keys(dataObj).length === 0) {
    return new Error(
      [
        componentName,
        'requires that',
        propName,
        'isn\'t empty',
      ].join(' ')
    );
  }

  return (null);
}

module.exports = {
  createPropTypeWithProperties,
  PropTypeDataListWrapper,
  PropTypeFilter,
  PropTypeData,
};

// @flow

type descs = { [string]: string }
type checkFn = (props: { [string]: any | void }, propName: string, componentName: string) => Error | null

export default function createWithProps(properties: Array<any>, errorDesc: descs = {
  getObjectAt: 'The function should return the row',
  getSize: 'The function should return the number of row (row count)',
  isTouched: 'The function should return true if getObjectAt has been called on the data',
}) {
  if (!(properties instanceof Array)) {
    throw new Error('The properties that you want to check should be an Array');
  }

  const coreCheck: checkFn = (props, propName, componentName) => {
    const dataObj = props[propName];
    if (dataObj === undefined) {
      return new Error(`${componentName} id required`);
    }

    const errProperty = properties.find(property => typeof (dataObj[property]) !== 'function');
    if (errProperty) {
      return new Error(
        [
          `${componentName} requires that ${propName}`,
          `has a '${errProperty}()' function.`,
          errorDesc[errProperty],
        ].join(' '),
      );
    }

    return (null);
  };

  const propFunction: checkFn = (props, propName, componentName) => {
    const dataObj = props[propName];
    if (dataObj === undefined) {
      return (null);
    }

    return coreCheck(props, propName, componentName);
  };
  propFunction.isRequired = coreCheck;

  return propFunction;
}

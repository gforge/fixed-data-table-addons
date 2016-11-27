export default function createWithProps(properties, errorDesc = {
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

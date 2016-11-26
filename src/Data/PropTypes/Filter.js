export default function Filter(props, propName, componentName) {
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

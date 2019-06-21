// @flow
import createWithProps from './createWithProps';

export default createWithProps(['getSize', 'getObjectAt', 'isTouched']);
export type BasicDataType = {
  getSize: () => number,
  getObjectAt: number => any,
  isTouched: number => boolean,
  setCallback?: Function,
};

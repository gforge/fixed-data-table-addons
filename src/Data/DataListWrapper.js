// @flow
type DataClass = {
  setCallback?: (cb: Function, id?: string) => any,
  getSize(): number,
  getObjectAt(index: number): mixed,
}

class DataListWrapper {
  _data: DataClass
  _indexMap: ?Array<any>

  constructor(
    data: DataClass,
    index: ?Array<any> = null) {
    this._data = data;
    this._indexMap = index;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb: Function, id: string = 'wrapper') {
    if (this._data.setCallback) {
      this._data.setCallback(cb, id);
    }
  }

  getSize() {
    if (!this._indexMap) {
      return this._data.getSize();
    }

    return this._indexMap.length;
  }

  getObjectAt(index: number) {
    if (!this._indexMap) {
      return this._data.getObjectAt(index);
    }

    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

export default DataListWrapper;

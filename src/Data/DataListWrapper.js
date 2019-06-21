// @flow
type DataClass = {
  setCallback?: (cb: Function, id?: string) => any,
  getSize(): number,
  getObjectAt(index: number): mixed,
};

class DataListWrapper {
  _data: DataClass;

  _indexMap: ?(number[]);

  _indexesRequested: Map<number, boolean> = new Map();

  constructor(data: DataClass, index?: any[] | null = null) {
    this._data = data;
    this._indexMap = index;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb: Function, id: string = 'wrapper') {
    if (this._data.setCallback) {
      this._data.setCallback(cb, id);
    }
  }

  // As we don't want to trigger loading unless the index has been
  // touched by the table we can use this to check before loading
  isTouched(index: number) {
    return this._indexesRequested.get(index) === true;
  }

  getSize() {
    if (!this._indexMap) {
      return this._data.getSize();
    }

    return this._indexMap.length;
  }

  getObjectAt(index: number) {
    this._indexesRequested.set(index, true);

    if (!this._indexMap) {
      return this._data.getObjectAt(index);
    }

    return this._data.getObjectAt(this._indexMap[index]);
  }
}

export default DataListWrapper;

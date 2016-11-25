class DataListWrapper {
  constructor(data, index = null) {
    this._data = data;
    this._indexMap = index;
  }

  // The callback is used for triggering re-rendering
  setCallback(cb, id = 'wrapper') {
    if (this._data.setCallback) {
      this._data.setCallback(cb, id);
    }
  }

  getSize() {
    if (this._indexMap === null) {
      return this._data.getSize();
    }

    return this._indexMap.length;
  }

  getObjectAt(index) {
    if (this._indexMap === null) {
      return this._data.getObjectAt(index);
    }

    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

export default DataListWrapper;

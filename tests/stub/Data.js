class Data {
  constructor(nrows = 4) {
    this.size = nrows;
    this._callbacks = [];
    this.runCallbacks = this.runCallbacks.bind(this);
  }

  getSize() {
    return (this.size);
  }

  getObjectAt(index) {
    if (index < 0 || index >= this.size) {
      return (null);
    }

    return {
      id: index,
      name: `Test name no ${index}`,
    };
  }

  isTouched(index) {
    return true;
  }

  /**
   * The callbacks are used to trigger events as new data arrives.
   *
   * In most cases the callback is a method that updates the state, e.g.
   * updates a version number without direct impact on the component but that
   * will trigger an component refresh/update.
   *
   * @param callback {function} The fallback function to be called
   * @param id       {string}   The string that identifies the given callback.
   *   This allows a callback to be overwritten when creating new objects that
   *   use this data as reference.
   * @return void
   */
  setCallback(callback, id = 'base') {
    const newCallback = { id, fun: callback };

    let found = false;
    const newCallbacks = [];
    this._callbacks.forEach((cb) => {
      if (cb.id === id) {
        found = true;
        newCallbacks.push(newCallback);
      } else {
        newCallbacks.push(cb);
      }
    });

    if (!found) {
      newCallbacks.push(newCallback);
    }

    this._callbacks = newCallbacks;
  }

  /**
   * Runs callbacks in the order that they've been added.
   *
   * The function is triggered when the fetchRange() Promise resolves.
   *
   * @return {void}
   */
  runCallbacks() {
    this._callbacks.forEach(cb => cb.fun());
  }
}

export default Data;

class Data {
  constructor(nrows = 4) {
    this.size = nrows;
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
}

export default Data;

# The fixed-data-table-addons

[![Build Status](https://travis-ci.org/gforge/fixed-data-table-addons.svg?branch=master)](https://travis-ci.org/gforge/fixed-data-table-addons)


This package supplements Schr&ouml;dinger's [fixed-data-table-2][fdt2] with higher order components that add on context data, filtering and sorting. The package is the results from an [issue][fdt2-issue] that added an example showing how to add pagination, context and filtering to the [fixed-data-table-2][fdt2].

## Package content

The package exports three objects, a `HOC` with the higher order components, a `Data` that contains data specifics and `PropTypes`.

### The `HOC` object

This object is for directly adding functionality to the tables. This can be either for a `Table` or a `Cell` component. The available methods are:

- `addDataCtxt` that adds data context to a table and thus allows more convenient access to the data structure that doesn't have to be passed down to each cell. **Important**: The data provided has to have certain functions such as `getSize` and for this to work, see description of the data structure below.
- `addData2CellFromCtxt` that adds moves the data context into a regular property.
- `addFilter` this allows adding a filtering property to the component that searches the data for matching elements. The standard matching is done using string comparisons but the function takes a second `filter` argument that allows specifying any function that returns a boolean.
- `addForm2Cell` this adds an input form to a cell that is convenient when you want to add to your header the filter input field.
- `addSort` this adds sorting to the table. It is recommended that you do the actual sort in the back-end. If you have a short table and you want to force sorting all the elements directly then set the second argument to `false`.
- `addSort2Cell` this adds a sorting link component to a header cell.

### The Data object

The data object contains:

- `DataListWrapper` a class that wraps around a data object with custom `getObjectAt`, `isTouched`, and `getSize`. It is a thin datalayer that has its own index that is set at creation. It can also set the parent data callback that can be useful when setting up pagination.
- `SortTypes` contains the sort constants for ASC (ascending) and DESC (descending) sorting.
- `getRowValue` this is simply a function that accesses the underlying row. Since immutable is a common data structure there is a need for allowing a custom `get()` method in the data object. This function checks if that is available and uses that function before trying standard `[]`.

The data structure provided to this package should be wrapped in a class that provides the following interface:

- `getSize()` returns the number of rows.
- `getObjectAt(index)` returns a row object at a certain index. The row object should either have a `get(columnName)` function used for accessing the column or be just indexeable using the standard `[columnName]` syntax.
- `setCallback(callbackFunction)` is *optional* and is used together with paginated data. If you have data that will load later and want to trigger events when this happens then add those events using this function.
- `runCallbacks()` also *optional* and simply runs each of the callbacks received.

### The PropTypes object

The PropTypes provide *property types* as defined by react. It contains:

- `createWithProps` is a function that creates a proptype that has to contain certain properties. Useful for checking if the data object is correctly specified with the `getObjectAt` and `getSize` functions.
- `BasicData` is a property type generate using `createWithProps(['getSize', 'getObjectAt', 'isTouched'])`.
- `DataListWrapper` is a proprty type specific to the `DataListWrapper` class.
- `Filter` is a property type for filters. Checks that the filter property is an object of `length > 0`.

[fdt2]: https://github.com/schrodinger/fixed-data-table-2/
[fdt2-issue]: https://github.com/schrodinger/fixed-data-table-2/issues/76

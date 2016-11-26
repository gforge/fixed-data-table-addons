# The fixed-data-table-addons

This package supplements the [fixed-data-table](fdt) and Schrödinger's [fixed-data-table-2](fdt2) with higher order components that add on context data, filtering and sorting. The package is the results from an [issue](fdt2-issue) that added an example showing how to add pagination, context and filtering to the [fixed-data-table-2](fdt2).

## Package content

The package exports two objects, a `HOC` with the higher order components and a `Data` that contains has he `DataListWrapper` and custom `PropTypes` that are related to the data. The `HOC` object consists in turn of:

- `addDataCtxt` that adds data context to a table and thus allows more convenient access to the data structure that doesn't have to be passed down to each cell. **Important**: The data provided has to have certain functions such as `getSize` and for this to work, see description of the data structure below.
- `addData2CellFromCtxt` that adds moves the data context into a regular property.
- `addFilter` this allows adding a filtering property to the component that searches the data for matching elements. The standard matching is done using string comparisons but the function takes a second `filter` argument that allows specifying any function that returns a boolean.
- `addForm2Cell` this adds an input form to a cell that is convenient when you want to add to your header the filter input field.
- `addSort` this adds sorting to the table.
- `addSort2Cell` this adds a sorting link component to a header cell.

## Data structure

The data structure provided to this package should be wrapped in a class that provides the following interface:

- `getSize()` returns the number of rows.
- `getObjectAt(index)` returns a row object at a certain index. The row object should either have a `get(columnName)` function used for accessing the column or be just indexeable using the standard `[columnName]` syntax.
- `setCallback(callbackFunction)` is *optional* and is used together with paginated data. If you have data that will load later and want to trigger events when this happens then add those events using this function.
- `runCallbacks()` also *optional* and simply runs each of the callbacks received.

[fdt]: https://github.com/facebook/fixed-data-table/
[fdt2]: https://github.com/schrodinger/fixed-data-table-2/
[fdt2-issue]: https://github.com/schrodinger/fixed-data-table-2/issues/76

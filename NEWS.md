# NEWS for fixed-data-table-addons

## 0.3.1
- Sorting can now be forced on the entire table although this isn't recommended - use back-end for sorting.
- Fixed sort cell layout that now allows for react elements

## 0.3.0
- Added the isTouched in order to not trigger loading of objects that haven't been
touched by the fixed-data-table.
- Added isRequired to the props functions
- Dropped support for the deprecated original fixed-data-table

## 0.2.1

- Changed to prop-types instead of React.PropTypes

## 0.2.0

- Renamed ContextClass to DataClass as more components in the future may have context

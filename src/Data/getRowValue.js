// @flow
type rowType = { [string | number]: any } | { get: (number | string) => any };
export default function getRowValue(row: rowType, key: number | string): any {
  if (typeof row.get === 'function') {
    return (row.get(key));
  }

  return (row[key]);
}

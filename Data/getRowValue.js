export default function getRowValue(row, key) {
  if ({}.hasOwnProperty.call(row, 'get')) {
    return (row.get(key));
  }

  return (row[key]);
}

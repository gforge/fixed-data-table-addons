export default function getRowValue(row, key) {
  if (typeof row.get === 'function') {
    return (row.get(key));
  }

  return (row[key]);
}

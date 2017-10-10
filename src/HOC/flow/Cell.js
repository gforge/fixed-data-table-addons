import * as React from 'react';

type AlignType = 'left' | 'center' | 'right';
type ColumnKey = string | number;

export type Cell = {
  isScrolling?: boolean,
  align?: AlignType,
  className?: string,
  highlighted?: bool,
  width: number,
  minWidth?: number,
  maxWidth?: number,
  height: number,
  cell?: string | React.Node,
  columnKey?: ColumnKey,

  /**
   * The row index that will be passed to `cellRenderer` to render.
   */
  rowIndex: number,

  /**
   * Callback for when resizer knob (in FixedDataTableCell) is clicked
   * to initialize resizing. Please note this is only on the cells
   * in the header.
   * @param number combinedWidth
   * @param number left
   * @param number width
   * @param number minWidth
   * @param number maxWidth
   * @param number|string columnKey
   * @param object event
   */
  onColumnResize?: (combinedWidth: number, left: number, width: number,
    minWidth: number, maxWidth: number, columnKey: ColumnKey, event: mixed) => any,
  onColumnReorder?: Function,

  /**
   * The left offset in pixels of the cell.
   */
  left?: number,

  /**
   * Flag for enhanced performance check
   */
   pureRendering?: bool,
}

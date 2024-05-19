import {TableHeading} from "../grid.types";
import {gridOptions} from "../Options";

export const resizeColumnHelper = (cols: TableHeading[], el: TableHeading, offset: number) =>
  cols.filter((element: TableHeading) => {
    if (el.id !== element.id) {
      return element;
    } else {
      element.width += offset;

      if ((element.width + offset) < gridOptions.minColumnWidth) {
        element.width = gridOptions.minColumnWidth;
      }

      if ((element.width + offset) > gridOptions.maxColumnWidth) {
        element.width = gridOptions.maxColumnWidth;
      }

      return element;
    }
  });

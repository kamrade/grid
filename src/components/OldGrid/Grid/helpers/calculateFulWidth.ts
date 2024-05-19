/*
 // Calculate full width of the table
 // accordingly data
 */

import {TableHeading} from "../grid.types";

export const calculateFullWidth = (data: TableHeading[]) => {
  let fullWidth = 0;
  for(let i = 0; i < data.length; i++) {
    if (data[i].isShowed) {
      fullWidth += data[i].width;
    }
  }
  return fullWidth - 2; // Grid border
}

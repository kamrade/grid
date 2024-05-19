import {TableHeading} from "../grid.types";

export const toggleColumnHelper: (allTh: TableHeading[], el: TableHeading) => TableHeading[] =
  (allTh: TableHeading[], el: TableHeading) =>
    allTh.filter((element: TableHeading) => {
      if (el.id !== element.id) {
        return element;
      } else {
        element.isShowed = !element.isShowed;
        return element;
      }
    });

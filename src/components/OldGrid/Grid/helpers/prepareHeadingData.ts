import {TableHeading} from "../grid.types";

export const prepareHeadingData: (data: TableHeading[]) => TableHeading[] =
  (data: TableHeading[]) =>
    data.filter((el: TableHeading) => el.isShowed)
        .sort((el1: TableHeading, el2: TableHeading) => el1.position - el2.position);


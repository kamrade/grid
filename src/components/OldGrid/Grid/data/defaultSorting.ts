import { ISortedBy } from "../grid.types";

export const getDefaultSorting = (data: { [key: string]: any }, value: string) => {
  return {
    column: data[0][value],
    direction: 'acc',
  } as ISortedBy;
}

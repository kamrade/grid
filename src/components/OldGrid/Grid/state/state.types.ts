import {Dispatch, SetStateAction} from "react";
import {ISortedBy, TableHeading} from "../grid.types";

export interface IGridState {
  currentDrawer: string;
  gridScroll: number;
  gridWidth: number;
  allColumns: TableHeading[];
  columns: TableHeading[];
}

export interface IGridAction {
  type: string;
  value: any;
}

export type IReducer = (state: IGridState, action: IGridAction) => IGridState;

export interface IGridContext {
  gridState: IGridState;
  dispatch: Dispatch<IGridAction>;
}

export type GridBorder = 'card' | 'table';

export interface GridProps {
  gridBorder?: GridBorder;
  allColumns: TableHeading[];
  sortedBy: ISortedBy;
  setSortedBy: Dispatch<SetStateAction<ISortedBy>>;
  updateColumns: (columns: TableHeading[]) => void;
  data: Partial<IData>[];
}

export interface IData {
  id: number | string;
  status?: string;
  ruleId?: number | string;
}

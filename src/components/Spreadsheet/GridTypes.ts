export type SortDirection = 'asc' | 'desc';

export interface IGridData {
  [key: string]: any;
}

export interface IGridProps {
  gridData: IGridData;
  columns: string[];
  defaultColumnsSize: number[];
  isFetching?: boolean;
  hasError?: string;
  sortedBy?: string; // columnID
  setSortedBy?: (value: string) => void;
  sortDirection?: SortDirection;
  setSortDirection?: (value: SortDirection) => void;
}

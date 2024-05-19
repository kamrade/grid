export interface IGridColumnCaption {
  columnTitle: string;
  columnCaption: string;
  initialColumnSize: number;
  clickHandler: (columnCaption: string) => any;
  sortedBy?: string;
  sortDirection?: string;
  setColumn: (columnValue: number) => void;
}

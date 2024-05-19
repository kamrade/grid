export interface ISpreadsheetColumnCaption {
  columnTitle: string;
  columnCaption: string;
  initialColumnSize: number;
  clickHandler: (columnCaption: string) => any;
  sortedBy?: string;
  sortDirection?: string;
  setColumn: (columnValue: number) => void;
}

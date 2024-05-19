export type GridTDTheme = 'base' | 'primary' | 'muted' | 'danger' | 'success';

export interface TableHeading {
  id: string;
  title: string;
  isShowed: boolean;
  position: number;
  width: number;
  theme?: GridTDTheme;
  maxWidth: number;
}

export type SortDirection = 'acc' | 'dec';

export interface ISortedBy {
  column: string;
  direction: SortDirection;
}


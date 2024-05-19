import React, { useContext, PropsWithChildren } from 'react';
import classNames from "classnames/bind";
import s from './TableRow.module.scss';
import { GridContext } from "./Grid";

const sx = classNames.bind(s);

export interface GridTableRowProps {
  fullWidth: number;
  striped?: boolean;
  border?: boolean;
  onClick?: () => any;
}
export const TableRow: React.FC<PropsWithChildren<GridTableRowProps>> = ({ children, striped, border, fullWidth, onClick }) => {

  const context = useContext(GridContext);
  let gridScroll = context?.gridState.gridScroll || 0;
  let gridWidth = context?.gridState.gridWidth || 0;

  const getScroll = () =>
    (fullWidth - gridWidth) < gridScroll ? fullWidth - gridWidth : gridScroll;

  return (
    <div className={sx({
      GridTableRow: true,
      GridTableRowStriped: striped,
      GridTableRowBorder: border,
    })} style={{ width: fullWidth }}>
      { children }

      <div
        className={s.openButtonWrapper}
        style={{ 'transform' : `translateX(${ getScroll() + (gridWidth || 0) - fullWidth}px)` }}
      >
        <div className={s.openButton} onClick={onClick}>Open</div>
      </div>
    </div>
  );
}

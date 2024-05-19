import React, {useState, useEffect} from 'react';
import s from "./GridColumnCaption.module.scss";
import * as Icon from "react-feather";
import {IGridColumnCaption} from './GridColumnCaptionTypes';
import {throttle} from 'lodash';

export const GridColumnCaption: React.FC<IGridColumnCaption> =
  ({columnTitle, columnCaption, initialColumnSize, clickHandler, sortedBy, sortDirection, setColumn}) => {

  const [initialX, setInitialX]        = useState<number>(0);
  const [initialSize, setInitialSize]  = useState<number>(initialColumnSize);
  const [currentX, setCurrentX]        = useState<number>(0);
  const [columnSize, setColumnSize]    = useState(initialColumnSize);

  const [isResizing, setIsResizing]    = useState<boolean>(false);

  useEffect(() => setColumnSize(initialColumnSize), [initialColumnSize])

  const separatorMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setInitialX(e.clientX);
    setInitialSize(initialColumnSize);
    setIsResizing(true);
    document.addEventListener('mousemove', separatorMouseMoveThrottled);
    document.addEventListener('mouseup', separatorMouseUp);
  }

  const separatorMouseMove = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentX(e.clientX);
  }

  const separatorMouseMoveThrottled = throttle(separatorMouseMove, 80);
  // const separatorMouseMoveThrottled = separatorMouseMove;

  useEffect(() => {
    setColumn(initialSize + (currentX - initialX));
  // eslint-disable-next-line
  }, [currentX]);

  const separatorMouseUp = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    document.removeEventListener('mousemove', separatorMouseMoveThrottled);
    document.removeEventListener('mouseup', separatorMouseUp);
  }

  const sortHandler = () => {

    if (!isResizing) {
      clickHandler(columnCaption);
    }
    setIsResizing(false);
  }

  return (

    <div className={s.ColumnCaption} style={{width: columnSize}} onClick={sortHandler}>
      <div className={s.ColumnTitle}>
        {columnTitle}
        {columnCaption === sortedBy && (sortDirection === 'asc' ? <Icon.ChevronDown size={12} /> : <Icon.ChevronUp size={12} />) }
      </div>
      <div className={s.ColumnSeparator} onMouseDown={separatorMouseDown} />
    </div>

  );
}

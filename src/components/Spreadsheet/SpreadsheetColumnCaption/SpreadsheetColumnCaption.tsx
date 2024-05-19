import { useState, useEffect, FC, MouseEvent } from 'react';
import { throttle } from 'lodash';
import { IconDown } from './IconDown.tsx';
import { IconUp } from './IconUp.tsx';

import { ISpreadsheetColumnCaption } from './SpreadsheetColumnCaptionTypes.ts';
import s from "./SpreadsheetColumnCaption.module.scss";

export const SpreadsheetColumnCaption: FC<ISpreadsheetColumnCaption> =
  ({columnTitle, columnCaption, initialColumnSize, clickHandler, sortedBy, sortDirection, setColumn}) => {

  const [initialX, setInitialX]        = useState<number>(0);
  const [initialSize, setInitialSize]  = useState<number>(initialColumnSize);
  const [currentX, setCurrentX]        = useState<number>(0);
  const [columnSize, setColumnSize]    = useState(initialColumnSize);

  const [isResizing, setIsResizing]    = useState<boolean>(false);

  useEffect(() => setColumnSize(initialColumnSize), [initialColumnSize])

  const separatorMouseDown = (e: MouseEvent<HTMLDivElement>) => {
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
        {columnCaption === sortedBy && (sortDirection === 'asc' ? <IconDown /> : <IconUp/>) }
      </div>
      <div className={s.ColumnSeparator} onMouseDown={separatorMouseDown} />
    </div>

  );
}

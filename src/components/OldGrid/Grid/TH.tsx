import React, {useEffect, useRef, Dispatch, SetStateAction, PropsWithChildren} from 'react';
import s from './TH.module.scss';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { TableHeading, ISortedBy } from './grid.types';
import classNames from "classnames/bind";
const sx = classNames.bind(s);

interface GridTHProps {
  el: TableHeading;
  resizeHandler: (el: TableHeading, offset: number) => void;
  sortedBy: ISortedBy;
  setSortedBy: Dispatch<SetStateAction<ISortedBy>>;
  card?: boolean;
  setColumnMaxWidth?: (el: TableHeading, currentWidth: number) => void;
}

export const TH: React.FC<PropsWithChildren<GridTHProps>> = ({el, resizeHandler, children, sortedBy, setSortedBy, card, setColumnMaxWidth}) => {

  const refChildren = useRef<HTMLDivElement>(null);

  let initialX = 0;

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeHandler(el, e.pageX - initialX);
    initialX = e.pageX;
  }

  const mouseUpHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }

  function mouseDownHandler(el: TableHeading, e: React.MouseEvent<HTMLDivElement>) {

    e.preventDefault();
    e.stopPropagation();

    initialX = e.pageX;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  useEffect(() => {
    if (setColumnMaxWidth) {
      setColumnMaxWidth(el, refChildren.current?.getBoundingClientRect().width || 0);
    }
    // eslint-disable-next-line
  }, [])

  const sort = () => {
    if (sortedBy.column === el.id) {
      setSortedBy({
        column: el.id,
        direction: sortedBy.direction === 'acc' ? 'dec' : 'acc',
      });
    } else {
      setSortedBy({
        column: el.id,
        direction: 'acc',
      });
    }

  }

  return (
    <div className={sx({
      GridTH: true,
      GridTHCard: card,
    })} style={{ width: `${el.width}px` }} onMouseDown={sort} draggable>

      <div className={s.GridTHContent} ref={refChildren}>

        <span className={s.GridTHChildren} >
          {children}
        </span>

        <span className={s.GridTHDragger}>
          <RxDragHandleDots2 />
        </span>

        { sortedBy.column === el.id &&
          (sortedBy.direction === 'acc' ? <RiArrowDownSLine /> :  <RiArrowUpSLine />)
        }

      </div>


      <div
        className={s.GridTHControl}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => mouseDownHandler(el, e)}>
      </div>

    </div>
  );
}

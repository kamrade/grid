import React, { useEffect, useState, DragEvent } from 'react';
import { RxDragHandleDots2 } from "react-icons/rx";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { TableHeading } from '.';
import s from './ColumnsSetupDialog.module.scss';
import classNames from "classnames/bind";
const sx = classNames.bind(s);

interface IColumnsSetupDialogProps {
  allTh: TableHeading[];
  toggleColumn: (el: TableHeading) => any;
  setAllTh: (value: TableHeading[]) => any;
}

interface IState {
  draggedFrom: number;
  draggedTo: number;
  isDragging: boolean;
}

const initialState: IState = {
  draggedFrom: -1,
  draggedTo: -1,
  isDragging: false,
}

type DragDirection = 'up' | 'down';

export const ColumnsSetupDialog: React.FC<IColumnsSetupDialogProps> = ({ allTh, toggleColumn, setAllTh }) => {

  const [list, setList] = useState<TableHeading[]>(allTh);
  const [dragAndDrop, setDragAndDrop] = useState<IState>(initialState);
  const [direction, setDirection] = useState<DragDirection | null>(null);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: Number(event.currentTarget.dataset.position),
      draggedTo: Number(event.currentTarget.dataset.position),
      isDragging: true,
    });
    // Firefox fix
    event.dataTransfer.setData("text/html", '');
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedTo = Number(e.currentTarget.dataset.position);

    if (draggedTo !== dragAndDrop.draggedTo){
      setDragAndDrop({
        ...dragAndDrop,
        draggedTo: draggedTo
      })
    }
  }

  useEffect(() => {

    const { draggedFrom, draggedTo } = dragAndDrop;
    if (draggedFrom < draggedTo) {
      setDirection('down');
    }
    if (draggedFrom > draggedTo) {
      setDirection('up');
    }

  }, [dragAndDrop.draggedFrom, dragAndDrop.draggedTo, dragAndDrop]);

  const onDrop = () => {
    let newList = list.map((el: TableHeading, i: number) => {

      const { draggedFrom, draggedTo } = dragAndDrop;

      if (el.position === draggedFrom) {
        el.position = draggedTo;
      } else {
        // move down
        if (draggedFrom < draggedTo) {
          if (el.position <= draggedTo && el.position > draggedFrom) {
            el.position = el.position - 1;
          }
        }
        // move up
        if (draggedFrom > draggedTo) {
          if (el.position >= draggedTo && el.position < draggedFrom) {
            el.position = el.position + 1;
          }
        }
      }

      return el;
    })
    setList(newList);
    setDragAndDrop({
      draggedFrom: -1,
      draggedTo: -1,
      isDragging: false
    });
    setDirection(null);
    setAllTh(newList);
  }

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
    });
    setDirection(null);
  }

  return (
    <div className={s.ColumnsSetupDialog}>
      {list.sort((a: TableHeading, b: TableHeading) => a.position - b.position).map((col: TableHeading, i: number) => (
          <div
            key={i}
            data-position={i}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}

            className={sx({
              CheckboxWrapper: true,
              dropArea: dragAndDrop && dragAndDrop.isDragging && (dragAndDrop.draggedTo === Number(i)),
              up: direction === 'up',
              down: direction === 'down'
            })}
          >


            <ColumnIndicator
              labelText={col.title}
              val={col.isShowed}
              onChange={() => toggleColumn(col)}
            />

          </div>
      ))}
    </div>
  );

}

interface IColumnIndicator {
  labelText: string;
  val: boolean;
  onChange: () => void;
}

export const ColumnIndicator: React.FC<IColumnIndicator> = ({ labelText, val, onChange }) => {

  const clickHandler = () => {
    onChange();
  }

  return (
    <div className={sx({
      ColumnIndicator: true,
      on: val
    })}>
      <span className={s.dragIcon}>
        <RxDragHandleDots2 />
      </span>
      <span className={s.TextContent}>
        {labelText}
      </span>
      <span
        onClick={clickHandler}
        className={s.eye}
      >
        {val && <RiEyeFill />}
        {!val && <RiEyeOffFill />}

      </span>

    </div>
  );
}

import React, {useState} from 'react';
import classNames from "classnames/bind";
import s from "./Grid.module.scss";
import {IGridProps, IGridData} from './GridTypes';
import {casesColumnsMap, minColumnSize} from '../CasesService/casesData';
import {GridColumnCaption} from "./GridColumnCaption/GridColumnCaption";

const sx = classNames.bind(s);

export const Grid: React.FC<IGridProps> = ({
  defaultColumnsSize,
  columns,
  gridData,
  isFetching,
  hasError,

  sortedBy,
  setSortedBy,
  sortDirection,
  setSortDirection
}) => {

  const [columnsSize, setColumnsSize] = useState(defaultColumnsSize);
  const [fullWidth, setFullWidth]     = useState(columnsSize.reduce((acc, val) => acc + val, 0)); // summarize all the widths of the columns together

  const setColumn = (columnNumber: number) => {
    return (columnValue: number) => {

      if (columnValue > minColumnSize) {
        if (columnNumber === 0) {
          setColumnsSize([columnValue, ...columnsSize.slice(1, columnsSize.length) ])
        } else if (columnNumber === columnsSize.length) {
          setColumnsSize([...columnsSize.slice(0, columnsSize.length - 1), columnValue]);
        } else {
          setColumnsSize([ ...columnsSize.slice(0, columnNumber), columnValue, ...columnsSize.slice(columnNumber+1, columnsSize.length) ])
        }
        setFullWidth( columnsSize.reduce((acc, val) => acc + val, 0) );
      }

    }
  }

  const clickOnThHandler = (columnCaption: string) => {
    if (columnCaption === sortedBy) {
      sortDirection === 'asc'
        ? setSortDirection && setSortDirection('desc')
        : setSortDirection && setSortDirection('asc');
    } else {
      setSortedBy && setSortedBy(columnCaption);
      setSortDirection && setSortDirection('asc');
    }

  }

  return (
    <div className={sx({
      GridWrapper: true,
      Error: hasError
    })} >
      <div className={s.Grid} >

        {hasError && <div className={s.GridError}>{hasError}</div>}

        {!hasError && gridData && <div className={s.GridContent} style={{width: `${fullWidth}px`}}>

          <div className={s.THead}>
            {columns.map((columnCaption, i) =>
              <GridColumnCaption
                key={i}
                columnTitle={casesColumnsMap[columnCaption]}
                columnCaption={columnCaption}
                initialColumnSize={columnsSize[i]}
                clickHandler={() => clickOnThHandler(columnCaption)}
                sortedBy={sortedBy}
                sortDirection={sortDirection}
                setColumn={setColumn(i)}
              />
            )}
          </div>

          {gridData?.map((row: IGridData, i: number) => {
            return (
              <div key={i} className={s.GridRow}>

                {Object.entries(row).map((entry: any, j: number) => (
                  <div className={s.GridCell} key={j} style={{width: columnsSize[j]}}>
                    {entry[1]}
                  </div>
                ))}

              </div>
            )
          })}

          {!hasError && isFetching && gridData && <div className={s.GridPreloaderFast}/>}

        </div>}

        {!hasError && isFetching && !gridData && <div className={s.GridPreloader}>Fetching data</div>}

      </div>
    </div>
  )
}

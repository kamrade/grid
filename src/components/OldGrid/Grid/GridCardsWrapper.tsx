import React, {useEffect, useState, useRef } from 'react';
import {Grid, ISortedBy, TableHeading} from '.';
import { prepareData } from './helpers';
import {allTableHeadingsMap, ruleVetoData, getDefaultSorting, RuleVeto} from './data';
import { Button } from 'shared';
import s from './GridCardsWrapper.module.scss';
import { RiFullscreenFill, RiTableFill } from "react-icons/ri";
import { TbArrowAutofitContent } from "react-icons/tb";
import {debounce} from 'lodash';

const defaultSorting = getDefaultSorting(allTableHeadingsMap, 'id');

export const GridCardsWrapper: React.FC = () => {

  const [allTh, setAllTh]                 = useState(allTableHeadingsMap); // all columns, including invisible
  const [data, setData]                   = useState<RuleVeto[]>( ruleVetoData );
  const [sortedBy, setSortedBy]           = useState<ISortedBy>( defaultSorting );
  const gridRef                           = useRef<any>();

  useEffect(() => {
    setData( prepareData(ruleVetoData, sortedBy) );
  }, [sortedBy, sortedBy.direction, sortedBy.column]);

  const fitToWidth = () => gridRef?.current?.fitToWidth();
  const setColumnsMax = () => gridRef?.current?.setColumnsMax();
  const setupColumns = () => gridRef?.current?.setupColumns();

  const saveData = (columns: TableHeading[]) => {
    // console.log('save columns data:', columns);
  }

  const debouncedSaveData = debounce(saveData, 1000);

  const updateColumns = (columns: TableHeading[]) => {
    debouncedSaveData(columns);
    setAllTh([...columns])
  };

  // @ts-ignore
  return (
    <div className={s.GridWrapper} >
      <div className={s.GridHeader}>
        <h2 style={{ marginBottom: '1em' }}>Rule vetos monitor (cards)</h2>

        <div className={s.setupColumns} >
          <Button iconButton prefix={<RiFullscreenFill />} size={'sm'} theme={'base'} variant={'light'} onClick={ fitToWidth } />
          <Button iconButton prefix={<TbArrowAutofitContent />} size={'sm'} theme={'base'} variant={'light'} onClick={ setColumnsMax } />
          <Button iconButton prefix={<RiTableFill />} size={'sm'} theme={'base'} variant={'light'} onClick={ setupColumns } />
        </div>

      </div>

      <Grid
        ref={gridRef}
        data={data}
        allColumns={allTh}
        updateColumns={updateColumns}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />
    </div>
  );
}

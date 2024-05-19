import React, {createContext, useContext, ReactChild, ReactChildren, useState} from 'react';
import {
  casesData,
  CasesData,
  casesColumns,
  sortedByDefault,
  sortDirectionDefault
} from './casesData';
import {randomIntFromInterval} from 'helpers';
import {SortDirection} from '../Grid/GridTypes';
import {orderBy} from 'lodash';


interface ICaseContext {
  getCases: () => Promise<CasesData[]>;
  getCasesColumns: () => string[];
  getSortedBy: () => string;
  setSortedBy: (value: string) => void;
  getSortDirection: () => SortDirection;
  setSortDirection: (value: SortDirection) => void;
}

interface ICaseProviderProps {
  children: ReactChild | ReactChildren;
  getCases?: () => Promise<CasesData[]>;
  getCasesColumns?: () => string[];
  getSortedBy?: () => string;
  setSortedBy?: (value: string) => void;
  getSortDirection?: () => SortDirection;
  setSortDirection?: (value: SortDirection) => void;
}

const CasesContext = createContext<ICaseContext | null>(null);

export const CasesProvider: React.FC<ICaseProviderProps> = (props) => {

  const [sortedBy, setSortedBy] = useState(sortedByDefault);
  const [sortDirection, setSortDirection] = useState(sortDirectionDefault as SortDirection);

  const getSortedBy = () => sortedBy;
  const getSortDirection = () => sortDirection;

  const getCasesColumns = () => {
    return casesColumns;
  }

  const getCases = () => {
    let chance = randomIntFromInterval(0, 100);
    // console.log(chance);

    return new Promise<CasesData[]>((resolve, reject) => {
      setTimeout(() => {
        if (chance > 1) {
          resolve(orderBy(casesData, [sortedBy], [sortDirection]));
        } else {
          reject('Data retrieval error. Please reload the page.');
        }
      }, 1000);
    });

  };

  const value: ICaseContext = {
    getCases: props.getCases || getCases,
    getCasesColumns: props.getCasesColumns || getCasesColumns,
    getSortedBy: props.getSortedBy || getSortedBy,
    setSortedBy: props.setSortedBy || setSortedBy,
    getSortDirection: props.getSortDirection || getSortDirection,
    setSortDirection: props.setSortDirection || setSortDirection
  };

  return (
    <CasesContext.Provider value={value}>
      {props.children}
      </CasesContext.Provider>
  )
}

export const useCases = () => useContext(CasesContext);

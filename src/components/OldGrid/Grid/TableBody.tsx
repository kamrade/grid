import React, {PropsWithChildren} from 'react';
import s from './TableBody.module.scss';

interface GridTableBodyProps {}
export const TableBody: React.FC<PropsWithChildren<GridTableBodyProps>> = ({ children }) => {
  return (
    <div className={s.GridTableBody}>
      {children}
    </div>
  );
}

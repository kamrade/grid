import { useEffect, useState } from 'react';
import { defaultColumnsSize } from "~/services/CasesService/casesData";
import { Grid } from "../Grid";
import { useCases } from '~/services';

export const GridWrapper = () => {

  const [casesData, setCasesData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string>('');
  const [columns, setColumns] = useState<any>([]);

  const cases = useCases();

  useEffect(() => {

    setColumns(cases?.getCasesColumns());

    setIsFetching(true);
    cases?.getCases()
      .then((value: any) => {
        setCasesData(value);
        setIsFetching(false);
      }).catch(err => setHasError(err));

  }, [cases]);

  return (
    <div className={'GridWrapper'}>
      <Grid
        setSortedBy={cases?.setSortedBy}
        sortedBy={cases?.getSortedBy()}
        sortDirection={cases?.getSortDirection && cases?.getSortDirection()}
        hasError={hasError}
        isFetching={isFetching}
        gridData={casesData}
        columns={columns}
        defaultColumnsSize={defaultColumnsSize}
        setSortDirection={cases?.setSortDirection}
      />
    </div>
  )
}

import {GridWrapper} from './GridWrapper/GridWrapper';
import {CasesProvider} from './CasesService/CasesService';

export const GridShowcase = () => {
  return (
    <div className="page">
      <div className="container">

        <header className="pt-5 pb-3" />
        <h1 className='mb-3 page-title'>Grid</h1>

        <CasesProvider>
          <GridWrapper />
        </CasesProvider>

      </div>
    </div>
  )
}

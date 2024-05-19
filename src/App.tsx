import './App.css'
import { Grid } from './components';
import { SpreadsheetWrapper } from '~/components/Spreadsheet';
import { CasesProvider } from '~/services';

function App() {

  return (
    <div>
      <h1>This is the Grid Showcase 0.0.3</h1>
      <Grid></Grid>

      <div>
        <h1 className='mb-3 page-title'>Grid</h1>
        <CasesProvider>
          <SpreadsheetWrapper />
        </CasesProvider>
      </div>

    </div>
  )
}

export default App

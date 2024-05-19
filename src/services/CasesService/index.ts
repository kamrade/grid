import { useContext } from "react";
import { CasesContext, CasesProvider } from './CasesService.tsx';

export const useCases = () => useContext(CasesContext);
export { CasesProvider };

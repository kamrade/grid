import { useContext } from "react";
import { CasesContext } from './CasesService.tsx';

export const useCases = () => useContext(CasesContext);

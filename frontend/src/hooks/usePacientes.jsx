import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => {
    return useContext(PacientesContext) // Es para hacer disponibles los valores del provider
};

export default usePacientes
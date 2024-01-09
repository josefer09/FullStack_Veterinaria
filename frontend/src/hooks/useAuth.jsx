import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext) // Es para hacer disponibles los valores del provider
};

export default useAuth;
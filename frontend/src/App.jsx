import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import Login from "./paginas/Login";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevaPassword from "./paginas/NuevaPassword";
import Registrar from "./paginas/Registrar";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}></Route>
              <Route path="registrar" element={<Registrar />}></Route>
              <Route
                path="olvide-password"
                element={<OlvidePassword />}
              ></Route>
              <Route
                path="olvide-password/:token"
                element={<NuevaPassword />}
              ></Route>
              <Route path="confirmar/:id" element={<ConfirmarCuenta />}></Route>
            </Route>
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Header from "../context/Header";
import Footer from "../context/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return "cargando";
  }
  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="contaier mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;

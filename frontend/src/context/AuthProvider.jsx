import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      // Busca el token
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      } // si no hay usuario registrado, deten el codigo
      console.log(token);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Busca el token en la db para traer al usuario
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        console.log(data);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
        const url = `/veterinarios/perfil/${datos._id}`;
        const {data} = await clienteAxios.put(url, datos, config);
        console.log(data);
        return {
            msg: "Almacenado Correctamente",
            error: false,
        }
    } catch (error) {
        console.log(error.response);
        return {
            msg: error.response.data.msg,
            error: true
        }
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  
  const guardarPassword = async (datos) => {

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
        const url = `/veterinarios/actualizar-password`;
        const {data} = await clienteAxios.put(url, datos, config);
        console.log(data);
        return {
            msg: data.msg
        };
    } catch (error) {
        return {
            msg: error.response.data.msg,
            error: true
        };
    };  
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, cargando, cerrarSesion, actualizarPerfil, guardarPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if([email, password].includes('')) {
      console.log('No se permiten campos vacios');
      return setAlerta({
        msg: "No se permiten campos vacios",
        error: true
      });
    }

    // Busqueda en la db
    try {
      const {data} = await clienteAxios.post('/veterinarios/autenticar', {email, password});
      console.log(data);
      // Guardar token en localstorage
      localStorage.setItem('token', data.token);
      // Colocar la info del usuario en el state del auth
      setAuth(data);
      setAlerta({});
      navigate('/admin');
    } catch (error) {
      console.log(error.response);
      return setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }
  const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alerta alerta={alerta} />}
        <form action="" onSubmit={handlerSubmit}>
          <div className="my-5">
            <label className="uppercasek text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e =>{setEmail(e.target.value)}}
            />
          </div>
          <div className="my-5">
            <label className="uppercasek text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => {setPassword(e.target.value)}}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to={"/registrar"}
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to={"/olvide-password"}
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;

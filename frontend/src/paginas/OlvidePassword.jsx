import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const {msg} = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que no se permitan campos vacios
    if(email === '' || email.length < 5) {
      return setAlerta({
        msg: "El correo es obligatorio",
        error: true,
      });
    }

    // Validar si existe el correo en la db
    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email});
      console.log(data);

    return setAlerta({
      msg: data.msg,
      error: false,
    });
    } catch (error) {
      return setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
    
  }
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tú Acceso y No Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alerta alerta={alerta} />}
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercasek text-gray-600 block text-xl font-bold">
              Introduce tu Email
            </label>
            <input
              type="email"
              placeholder="ej: correo@correo.com"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => {setEmail(e.target.value)}}
            />
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
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
          <Link className="block text-center my-5 text-gray-500" to={"/"}>
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;

import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  const { auth, actualizarPerfil, guardarPassword } = useAuth();
  // En lugar de un state por input, sera una por objeto
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    old_pwd: '',
    new_pwd: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    if(password.new_pwd.length < 6) {
      setAlerta({
        msg: "La Contraseña debe tener minimo 6 caracteres",
        error: true
      });
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);

  };
  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Password</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600" htmlFor="">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="old_pwd"
                placeholder="Escribe tu actual contraseña"
                onChange={e => setPassword({
                  ...password, [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600" htmlFor="">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="new_pwd"
                placeholder="Escribe tu nueva contraseña"
                onChange={e => setPassword({
                  ...password, [e.target.name] : e.target.value
                })}
              />
            </div>
            <input
              type="submit"
              value="Cambiar Contraseña"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;

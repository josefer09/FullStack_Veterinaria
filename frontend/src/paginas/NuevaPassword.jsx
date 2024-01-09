import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

const NuevaPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPassworModificado] = useState(false);

  const { msg } = alerta;

  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu nueva Constraseña", error: false });
        setTokenValido(true);
      } catch (error) {
        return setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar Formulario
    if ([password, confirmarPassword].includes("")) {
      // Hay campos vacios
      setAlerta({ msg: "No se permiten campos vacios", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser de minimo 6 caracteres",
        error: true,
      });
      return;
    }

    if (password !== confirmarPassword) {
      setAlerta({ msg: "Las contraseñas no son iguales", error: true });
      return;
    }

    setAlerta({});

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setPassworModificado(true);
      return setAlerta({ msg: data.msg, error: false });
    } catch (error) {
      console.log(error);
      return setAlerta({ msg: error.response.data.msg, error: true });
    }
    
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no Pierdas Acceso a{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form action="" onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercasek text-gray-600 block text-xl font-bold">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Tú contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercasek text-gray-600 block text-xl font-bold">
                  Confirma tú Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Repite la contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Registrate"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>

            {passwordModificado && (
              <Link className="block text-center my-5 text-gray-500" to={"/"}>
                Inicia Sesión
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NuevaPassword;

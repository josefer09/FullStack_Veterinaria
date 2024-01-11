import { createContext, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";

const PacientesContex = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const {data} = await clienteAxios("/pacientes", config);
        setPacientes(data);
        return;
      } catch (error) {
        console.log(error.response);
      }
    };
    obtenerPacientes();
  }, [pacientes]);

  // Guardar paciente en la db
  const guardarPaciente = async (paciente) => {
    // Configuracion para ambos casos
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    if(paciente.id) {
      try {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
        console.log(data);
        // Itera sobre nuestro state, busca el que tiene el mismo id que estamos modificando y es el mismo del cual obtenemos la respuesta y entonces sobreescribe el objeto
        const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post("/pacientes", paciente, config);
        const { createdAt, updateAt, __v, ...pacienteAlmacenado } = data; // Crea un nuevo objeto sin los datos mencionados previamente
        setPacientes([pacienteAlmacenado, ...pacientes]);
        return;
      } catch (error) {
        console.log(error.response.data.msg);
        return;
      }
    }
    
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  }

  const eliminarPaciente = async paciente => {
    console.log(paciente);
    // Configuracion para ambos casos
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const {_id, nombre} = paciente;

    // Confirmar eliminar
    const confirmar = confirm(`¿Desea Eliminar el Registro de: ${nombre}`);

    if(confirmar) {
      try {
        const {data} = await clienteAxios.delete(`/pacientes/${_id}`, config);
        console.log(data);
        const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== _id);
        setPaciente(pacientesActualizados);
      } catch (error) {
        console.log(error);
      }
    }

  }
  return (
    <PacientesContex.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente
      }}
    >
      {children}
    </PacientesContex.Provider>
  );
};

export default PacientesContex;

import Paciente from "../models/Paciente.js";

const crearPaciente = async (req, res) => {
  // Crear Nuevo Paciente
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  try {
    // Guardar en la db
    const pacienteAlmacenado = await paciente.save();
    res.status(200).json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  try {
    const listaPacientes = await Paciente.find()
      .where("veterinario")
      .equals(req.veterinario);
    return res.status(200).json(listaPacientes);
  } catch (error) {
    console.log(error);
    const e = new Error("Error en el servidor");
    return res.status(404).json({ msg: e.message });
  }
};

const obtenerPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
      const e = new Error("Acción no valida");
      return res.status(403).json({ msg: e.message });
    }

    if (paciente) {
      return res.status(200).json(paciente);
    }
  } catch (error) {
    console.log(error);
  }
};
const actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { veterinario, nombre, propietario, email, fecha, sintomas } =
      req.body;

    // Construccion del objeto
    const infoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      veterinario,
    };
    const paciente = await Paciente.findByIdAndUpdate(id, infoPaciente);

    if (!paciente) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
      const e = new Error("Acción no valida");
      return res.status(403).json({ msg: e.message });
    }

    const pacienteActualizado = await paciente.save();
    res.status(200).json({ infoPaciente });
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if (!paciente) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
      const e = new Error("Acción no valida");
      return res.status(403).json({ msg: e.message });
    }

    await paciente.deleteOne();
    return res.status(200).json({msg: "Paciente Eliminado"});
  } catch (error) {
    console.log(error);
  }
};

export {
  crearPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};

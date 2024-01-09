import express from "express";
import {
  crearPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/Paciente.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, crearPaciente)
  .get(checkAuth, obtenerPacientes);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);

export default router;

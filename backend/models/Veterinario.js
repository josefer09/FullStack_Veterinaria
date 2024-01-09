import mongoose from "mongoose";
import bycript from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  telefono: {
    type: Number,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: function () {
      return generarId();
    },
  },
  confirmado: {
    type: Boolean,
    default: null,
  },
});

veterinarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycript.genSalt(10);
  this.password = await bycript.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bycript.compare(passwordFormulario, this.password); // el compare retorna true o false
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;

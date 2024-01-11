import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;
  // Verificar si el usuario ya existe
  const usuarioExiste = await Veterinario.findOne({ email });

  if (usuarioExiste) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    // Registrar el usuario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    // Enviar el email
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token,
    });

    return res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { veterinario } = req;
  res.json(veterinario);
};

const confirmar = async (req, res) => {
  console.log(req.params.token);

  const { token } = req.params;

  const confirmarUsuario = await Veterinario.findOne({ token });

  if (!confirmarUsuario) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    // Cambiando los datos del usuario una vez confirme
    confirmarUsuario.token = null;
    confirmarUsuario.confirmado = true;
    await confirmarUsuario.save();

    res.json({ msg: "Cuenta Confirmada" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar que el usuario a confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  // Autenticar la constrasena
  if (await usuario.comprobarPassword(password)) {
    // Autenticar
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
      web: usuario.web,
    });
  } else {
    const error = new Error("La Password es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeVeterinario = await Veterinario.findOne({ email });
  if (!existeVeterinario) {
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();
    existeVeterinario.save();
    // Enviar email con las instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });
    res.json({
      msg: "Hemos enviado un email a su correo con las instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });

  if (tokenValido) {
    res.status(200).json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token Invalido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validar el token y que existe
  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    return res.status(200).json({ msg: "Password actualizado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const actualizarPerfil = async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  // Veterinario intenta cambiar su email, validacion
  if (veterinario.email !== email) {
    const existeEmail = await Veterinario.findOne({ email });
    if (existeEmail) {
      const error = new Error("Ese Email ya esta en uso");
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    veterinario.nombre = req.body.nombre; // Si no esta presente el nombre, asignale el que ya esta en la db para no perder nada de campos
    veterinario.email = req.body.email;
    veterinario.web = req.body.web;
    veterinario.telefono = req.body.telefono;

    const veterinarioActualizado = await veterinario.save();
    res.json(veterinarioActualizado);
    return;
  } catch (error) {
    console.log(error);
  }
};

const actualizarPassword = async (req, res) => {
  // Leer Datos
  const { id } = req.veterinario;
  const { old_pwd, new_pwd } = req.body;

  // Comprobar que el veterinario exista
  const veterinario = await Veterinario.findById(id);
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar su password
  if (await veterinario.comprobarPassword(old_pwd)) {
    veterinario.password = new_pwd;
    await veterinario.save();
    return res.json({msg: 'Password Almacenado Correctamente'});
  } else {
    const error = new Error("El password actual es incorrecto");
    return res.status(400).json({ msg: error.message });
  }

  // Almacenar el nuevo password
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
};

import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {

    const {email} = req.body;
    // Verificar si el usuario ya existe
    const usuarioExiste = await Veterinario.findOne({email});

    if(usuarioExiste) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }
  try {
    // Registrar el usuario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando Perfil" });
};

export { registrar, perfil };

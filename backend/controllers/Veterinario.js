
const registrar = (req, res) => {
    res.send('Desde Veterinaria Router');
};

const perfil = (req, res) => {
    res.send('Desde Veterinaria Router Perfil');
};

export {
    registrar,
    perfil
}
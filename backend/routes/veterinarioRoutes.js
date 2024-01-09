import express from 'express';
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/Veterinario.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Area Publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/autenticar', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Area Privada
router.get('/perfil', checkAuth, perfil);


export default router;
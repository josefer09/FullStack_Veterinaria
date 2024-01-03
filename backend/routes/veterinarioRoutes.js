import express from 'express';
import { registrar, perfil } from '../controllers/Veterinario.js';

const router = express.Router();

router.post('/', registrar);

router.get('/perfil', perfil);

export default router;
import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import veterinarioRouter from './routes/veterinarioRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/veterinarios", veterinarioRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express conectado desde el puerto: ${PORT}`);
});

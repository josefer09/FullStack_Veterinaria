import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';

const app = express();

dotenv.config();

conectarDB();

app.use("/", (req, res) => {
    res.send('Hola Mundo');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express conectado desde el puerto: ${PORT}`);
});

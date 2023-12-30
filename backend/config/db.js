import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
        });

        const url = `${db.connection.host}, ${db.connection.port}`;
        console.log(`Aplicacion conectada a la DB de: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    };
};

export default conectarDB;
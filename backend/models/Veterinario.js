import mongoose from 'mongoose';

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
    },
    telefono: {
        type: Number,
        default: null,
        trim: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: null,
    },
});

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
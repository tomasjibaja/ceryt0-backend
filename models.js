const mongoose = require('mongoose');

// Definir el Schema (estructura de datos)
const scoreMarkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    score: Number
  },
  {
    timestamps: true
  }
);

// Exportar el modelo (forma de comunicarse)
module.exports = mongoose.model('scoremarks', scoreMarkSchema);
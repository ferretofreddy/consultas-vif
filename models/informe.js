const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const informeSchema = new Schema({
  nInforme: String,
  f_informe: Date,
  aprehendido: { type: Boolean, required: true, default: false },
  casoCLAIS: { type: Boolean, required: true, default: false },
  decA_Blanca: { type: Boolean, required: true, default: false },
  decA_Fuego: { type: Boolean, required: true, default: false },
  trasladoFiscalia: { type: Boolean, required: true, default: false },
  primerizo: { type: Boolean, required: true, default: false },
  casoPorDesovediencia: { type: Boolean, required: true, default: false },
  imputado: { type: Schema.Types.ObjectId, ref: 'Persona' },
  ofendido: { type: Schema.Types.ObjectId, ref: 'Persona' }
}, 
{
  timestamps: true
})

module.exports = mongoose.model('Informe', informeSchema);

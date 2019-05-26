const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const casoSchema = new Schema({
  expediente: String,
  juzgado: String,
  notifImputado: { type: Boolean, required: true, default: false },
  f_notifImputado: Date,
  notifOfendido: { type: Boolean, required: true, default: false },
  f_notifOfendido: Date,
  desalojo: { type: Boolean, required: true, default: false },
  cambioDomicilioVict: { type: Boolean, required: true, default: false },
  medidasProteccion: { type: Boolean, required: true, default: false },
  f_emisionMedidas: Date,
  imputado: { type: Schema.Types.ObjectId, ref: 'Persona' },
  ofendido: { type: Schema.Types.ObjectId, ref: 'Persona' }
}, 
{
  timestamps: true
})

module.exports = mongoose.model('Caso', casoSchema);

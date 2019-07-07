const mongoose = require('mongoose')

const Schema = mongoose.Schema

const casoSchema = new Schema({
  expediente: String,
  juzgado: String,
  notifImputado: { type: Boolean, required: true, default: false },
  f_notifImputado: { type: Date, required: true, default: Date.now },
  notifOfendido: { type: Boolean, required: true, default: false },
  f_notifOfendido: { type: Date, required: true, default: Date.now },
  desalojo: { type: Boolean, required: true, default: false },
  cambioDomicilioVict: { type: Boolean, required: true, default: false },
  medidasProteccion: { type: Boolean, required: true, default: false },
  f_emisionMedidas: { type: Date, required: true, default: Date.now },
  imputado: { type: Schema.Types.ObjectId, ref: 'Persona' },
  ofendido: { type: Schema.Types.ObjectId, ref: 'Persona' }
},

{
  timestamps: true
})

module.exports = mongoose.model('Caso', casoSchema)

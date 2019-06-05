const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personaSchema = new Schema({
  nombre: String,
  identificacion: String,
  f_nacimiento: Date,
  sexo: String,
  edad: Number,
  provincia: String,
  canton: String,
  distrito: String,
  direccion: String,
  casos: [{ type: Schema.Types.ObjectId, ref: 'Caso' }],
  informes: [{ type: Schema.Types.ObjectId, ref: 'Informe' }]
},
{
  timestamps: true
})

module.exports = mongoose.model('Persona', personaSchema)

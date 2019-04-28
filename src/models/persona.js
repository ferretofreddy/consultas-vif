import mongoose, { Schema } from 'mongoose'
const moment = require('moment-timezone')
const dateCR = moment.tz(Date.now(), 'America/Costa_Rica')
// import { Caso } from './caso'
// const { ObjectId } = Schema.Types

const personaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  identificacion: {
    type: String,
    required: true
  },
  f_nacimiento: { type: Date, default: dateCR },
  sexo: String,
  edad: Number,
  provincia: String,
  canton: String,
  distrito: String,
  direccion: String,
  casos: [{
    type: Schema.Types.ObjectId,
    ref: 'Caso'
  }]
}, {
  timestamps: true
})

const Persona = mongoose.model('Persona', personaSchema)

export default Persona

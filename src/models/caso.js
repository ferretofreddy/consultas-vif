import mongoose, { Schema } from 'mongoose'
const moment = require('moment-timezone')
const dateCR = moment.tz(Date.now(), 'America/Costa_Rica')
// import { Persona } from './'

// const { ObjectId } = Schema.Types

const casoSchema = new Schema({
  expediente: String,
  juzgado: String,
  notifImputado: {
    type: Boolean,
    required: true,
    default: false
  },
  f_notifImputado: { type: Date, default: dateCR },
  notifOfendido: {
    type: Boolean,
    required: true,
    default: false
  },
  f_notifOfendido: { type: Date, default: dateCR },
  desalojo: {
    type: Boolean,
    required: true,
    default: false
  },
  cambioDomicilioVict: {
    type: Boolean,
    required: true,
    default: false
  },
  medidasProteccion: {
    type: Boolean,
    required: true,
    default: false
  },
  f_emisionMedidas: { type: Date, default: dateCR },
  imputado: [{
    type: Schema.Types.ObjectId,
    ref: 'Persona'
  }],
  ofendido: [{
    type: Schema.Types.ObjectId,
    ref: 'Persona'
  }]
}, {
  timestamps: true
})

export default mongoose.model('Caso', casoSchema)

const DataLoader = require('dataloader')
const Persona = require('../../models/persona')
const Caso = require('../../models/caso')
const Informe = require('../../models/informe')

const casoLoader = new DataLoader(casoIds => {
  return casos(casoIds)
})

const informeLoader = new DataLoader(informeIds => {
  return informes(informeIds)
})

const personaLoader = new DataLoader(personaIds => {
  return Persona.find({ _id: { $in: personaIds } })
})

const casos = async casoIds => {
  try {
    const casos = await Caso.find({ _id: { $in: casoIds } })
    casos.sort((a, b) => {
      return (
        casoIds.indexOf(a._id.toString()) - casoIds.indexOf(b._id.toString())
      )
    })
    return casos.map(caso => {
      return {
        ...caso._doc,
        _id: caso.id,
        expediente: caso.expediente,
        juzgado: caso.juzgado,
        notifImputado: caso.notifImputado,
        f_notifImputado: new Date(caso._doc.f_notifImputado).toLocaleDateString(),
        notifOfendido: caso.notifOfendido,
        f_notifOfendido: new Date(caso._doc.f_notifOfendido).toLocaleDateString(),
        desalojo: caso.desalojo,
        cambioDomicilioVict: caso.cambioDomicilioVict,
        medidasProteccion: caso.medidasProteccion,
        f_emisionMedidas: new Date(caso._doc.f_emisionMedidas).toLocaleDateString(),
        imputado: persona.bind(this, caso.imputado),
        ofendido: persona.bind(this, caso.ofendido),
        createdAt: new Date(caso._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(caso._doc.updatedAt).toLocaleDateString()
      }
    })
  } catch (err) {
    throw err
  }
}

const informes = async informeIds => {
  try {
    const informes = await Informe.find({ _id: { $in: informeIds } })
    informes.sort((a, b) => {
      return (
        informeIds.indexOf(a._id.toString()) - informeIds.indexOf(b._id.toString())
      )
    })
    return informes.map(informe => {
      return {
        ...informe._doc,
        _id: informe.id,
        nInforme: informe.nInforme,
        f_informe: new Date(informe._doc.f_informe).toLocaleDateString(),
        aprehendido: informe.aprehendido,
        casoCLAIS: informe.casoCLAIS,
        decA_Blanca: informe.decA_Blanca,
        decA_Fuego: informe.decA_Fuego,
        trasladoFiscalia: informe.trasladoFiscalia,
        primerizo: informe.primerizo,
        casoPorDesovediencia: informe.casoPorDesovediencia,
        imputado: persona.bind(this, informe.imputado),
        ofendido: persona.bind(this, informe.ofendido),
        createdAt: new Date(informe._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(informe._doc.updatedAt).toLocaleDateString()
      }
    })
  } catch (err) {
    throw err
  }
}

const persona = async personaId => {
  try {
    const persona = await personaLoader.load(personaId.toString())
    return {
      ...persona._doc,
      _id: persona.id,
      nombre: persona.nombre,
      identificacion: persona.identificacion,
      f_nacimiento: new Date(persona._doc.f_nacimiento).toLocaleDateString(),
      sexo: persona.sexo,
      edad: persona.edad,
      provincia: persona.provincia,
      canton: persona.canton,
      distrito: persona.distrito,
      direccion: persona.direccion,
      casos: () => casoLoader.loadMany(persona._doc.casos),
      informes: () => informeLoader.loadMany(persona._doc.informes),
      createdAt: new Date(persona._doc.createdAt).toLocaleDateString(),
      updatedAt: new Date(persona._doc.updatedAt).toLocaleDateString()
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  personas: async () => {
    try {
      const personas = await Persona.find()
      return personas.map(persona => {
        return {
          ...persona._doc,
          _id: persona.id,
          nombre: persona.nombre,
          identificacion: persona.identificacion,
          f_nacimiento: new Date(persona._doc.f_nacimiento).toLocaleDateString(),
          sexo: persona.sexo,
          edad: persona.edad,
          provincia: persona.provincia,
          canton: persona.canton,
          distrito: persona.distrito,
          direccion: persona.direccion,
          casos: casos.bind(this, persona._doc.casos),
          informes: informes.bind(this, persona._doc.informes),
          createdAt: new Date(persona._doc.createdAt).toLocaleDateString(),
          updatedAt: new Date(persona._doc.updatedAt).toLocaleDateString()
        }
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  persona: async ({ ID }, req) => {
    if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    }
    try {
      const persona = await Persona.findById(ID)
      return {
        ...persona._doc,
        _id: persona.id,
        nombre: persona.nombre,
        identificacion: persona.identificacion,
        f_nacimiento: new Date(persona._doc.f_nacimiento).toLocaleDateString(),
        sexo: persona.sexo,
        edad: persona.edad,
        provincia: persona.provincia,
        canton: persona.canton,
        distrito: persona.distrito,
        direccion: persona.direccion,
        casos: casos.bind(this, persona._doc.casos),
        informes: informes.bind(this, persona._doc.informes),
        createdAt: new Date(persona._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(persona._doc.updatedAt).toLocaleDateString()
      }
    } catch (err) {
      throw err
    }
  },

  buscarPersona: async ({ identificacion }, req) => {
  /*   if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    } */
    try {
      const persona = await Persona.findOne({ identificacion: identificacion })
      return {
        ...persona._doc,
        _id: persona.id,
        nombre: persona.nombre,
        identificacion: persona.identificacion,
        f_nacimiento: new Date(persona._doc.f_nacimiento).toLocaleDateString(),
        sexo: persona.sexo,
        edad: persona.edad,
        provincia: persona.provincia,
        canton: persona.canton,
        distrito: persona.distrito,
        direccion: persona.direccion,
        casos: casos.bind(this, persona._doc.casos),
        informes: informes.bind(this, persona._doc.informes),
        createdAt: new Date(persona._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(persona._doc.updatedAt).toLocaleDateString()
      }
    } catch (err) {
      throw err
    }
  },
  editarPersona: async ({ identificacion, nombre, f_nacimiento, sexo, edad, provincia, canton, distrito, direccion }, req) => {
    if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    }
    try {
      const persona = await Persona.findOneAndUpdate({ identificacion: identificacion }, { $set: { nombre: nombre, f_nacimiento: f_nacimiento, sexo: sexo, edad: edad, provincia: provincia, canton: canton, distrito: distrito, direccion: direccion } }, { new: true })
      return {
        ...persona._doc,
        _id: persona.id,
        nombre: persona.nombre,
        identificacion: persona.identificacion,
        f_nacimiento: new Date(persona._doc.f_nacimiento).toLoca.toLocaleDateString(),
        sexo: persona.sexo,
        edad: persona.edad,
        provincia: persona.provincia,
        canton: persona.canton,
        distrito: persona.distrito,
        direccion: persona.direccion,
        casos: casos.bind(this, persona._doc.casos),
        informes: informes.bind(this, persona._doc.informes),
        createdAt: new Date(persona._doc.createdAt).toLoca.toLocaleDateString(),
        updatedAt: new Date(persona._doc.updatedAt).toLoca.toLocaleDateString()
      }
    } catch (err) {
      throw err
    }
  },

  buscarImputado: async ({ identificacion }, req) => {
    if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    }
    try {
      const persona = await Persona.findOne({ identificacion: identificacion })
      if (!persona) {
        throw new Error('Imputado no exixte!')
      }

      return { imputadoId: persona.id, identificacion: persona.identificacion }
    } catch (err) {
      throw err
    }
  },
  buscarOfendido: async ({ identificacion }, req) => {
    if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    }
    try {
      const persona = await Persona.findOne({ identificacion: identificacion })
      if (!persona) {
        throw new Error('Ofendido no existe!')
      }
      return { ofendidoId: persona.id, identificacion: persona.identificacion }
    } catch (err) {
      throw err
    }
  },

  crearPersona: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    }
    const personaExistente = await Persona.findOne({ identificacion: args.personaInput.identificacion })
    if (personaExistente) {
      throw new Error('Esta persona ya existe.')
    }

    try {
      const persona = new Persona({
        nombre: args.personaInput.nombre,
        identificacion: args.personaInput.identificacion,
        f_nacimiento: args.personaInput.f_nacimiento,
        sexo: args.personaInput.sexo,
        edad: +args.personaInput.edad,
        provincia: args.personaInput.provincia,
        canton: args.personaInput.canton,
        distrito: args.personaInput.distrito,
        direccion: args.personaInput.direccion
      })

      const result = await persona.save()

      return {
        ...result._doc,
        _id: result.id,
        nombre: result.nombre,
        identificacion: result.identificacion,
        f_nacimiento: new Date(result._doc.f_nacimiento).toLocaleDateString(),
        sexo: result.sexo,
        edad: result.edad,
        provincia: result.provincia,
        canton: result.canton,
        distrito: result.distrito,
        direccion: result.direccion,
        casos: casos.bind(this, result._doc.casos),
        createdAt: new Date(result._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(result._doc.updatedAt).toLocaleDateString()
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

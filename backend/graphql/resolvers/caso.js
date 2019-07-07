const DataLoader = require('dataloader')
const Caso = require('../../models/caso')
const Persona = require('../../models/persona')
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
  casos: async () => {
    try {
      const casos = await Caso.find()
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
      console.log(err)
      throw err
    }
  },

  expediente: async ({ expediente }, req) => {
    /* if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    } */
    try {
      const caso = await Caso.findOne({ expediente: expediente })
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
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  juzgado: async ({ juzgado }, req) => {
    if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    }
    try {
      const casos = await Caso.find({ juzgado: juzgado })
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
      console.log(err)
      throw err
    }
  },

  editarCaso: async ({ expediente, juzgado, notifImputado, f_notifImputado, notifOfendido, f_notifOfendido, desalojo, cambioDomicilioVict, medidasProteccion, f_emisionMedidas }, req) => {
    /* if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    } */
    try {
      const caso = await Caso.findOneAndUpdate({ expediente: expediente }, { $set: { juzgado: juzgado, notifImputado: notifImputado, f_notifImputado: f_notifImputado, notifOfendido: notifOfendido, f_notifOfendido: f_notifOfendido, desalojo: desalojo, cambioDomicilioVict: cambioDomicilioVict, medidasProteccion: medidasProteccion, f_emisionMedidas: f_emisionMedidas } }, { new: true })
      return {
        ...caso._doc,
        _id: caso.id,
        expediente: caso.expediente,
        juzgado: caso.juzgado,
        notifImputado: caso.notifImputado,
        f_notifImputado: new Date(caso._doc.f_notifImputado).toISOString(),
        notifOfendido: caso.notifOfendido,
        f_notifOfendido: new Date(caso._doc.f_notifOfendido).toISOString(),
        desalojo: caso.desalojo,
        cambioDomicilioVict: caso.cambioDomicilioVict,
        medidasProteccion: caso.medidasProteccion,
        f_emisionMedidas: new Date(caso._doc.f_emisionMedidas).toISOString(),
        imputado: persona.bind(this, caso.imputado),
        ofendido: persona.bind(this, caso.ofendido),
        createdAt: new Date(caso._doc.createdAt).toISOString(),
        updatedAt: new Date(caso._doc.updatedAt).toISOString()
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  crearCaso: async (args, req) => {
    /* if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    } */

    const casoExistente = await Caso.findOne({ expediente: args.casoInput.expediente })
    if (casoExistente) {
      throw new Error('Este numero expediente ya existe.')
    }
    const caso = new Caso({
      expediente: args.casoInput.expediente,
      juzgado: args.casoInput.juzgado,
      notifImputado: args.casoInput.notifImputado,
      f_notifImputado: new Date(args.casoInput.f_notifImputado).toISOString(),
      notifOfendido: args.casoInput.notifOfendido,
      f_notifOfendido: new Date(args.casoInput.f_notifOfendido).toISOString(),
      desalojo: args.casoInput.desalojo,
      cambioDomicilioVict: args.casoInput.cambioDomicilioVict,
      medidasProteccion: args.casoInput.medidasProteccion,
      f_emisionMedidas: new Date(args.casoInput.f_emisionMedidas).toISOString(),
      imputado: args.casoInput.imputado,
      ofendido: args.casoInput.ofendido
    })
    let casoCreado
    try {
      const result = await caso.save()
      casoCreado = {
        ...result._doc,
        _id: result.id,
        expediente: result.expediente,
        juzgado: result.juzgado,
        notifImputado: result.notifImputado,
        f_notifImputado: new Date(caso._doc.f_notifImputado).toLocaleDateString(),
        notifOfendido: result.notifOfendido,
        f_notifOfendido: new Date(result._doc.f_notifOfendido).toLocaleDateString(),
        desalojo: result.desalojo,
        cambioDomicilioVict: result.cambioDomicilioVict,
        medidasProteccion: result.medidasProteccion,
        f_emisionMedidas: new Date(caso._doc.f_emisionMedidas).toLocaleDateString(),
        imputado: persona.bind(this, result.imputado),
        ofendido: persona.bind(this, result.ofendido),
        createdAt: new Date(result._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(result._doc.updatedAt).toLocaleDateString()
      }

      const imputado = await Persona.findById(args.casoInput.imputado) // req.imputadoId Crear Variable para almacenar el _id del imputado buscado o creado

      if (!imputado) {
        throw new Error('Imputado no encontrado.')
      }
      imputado.casos.push(caso)
      await imputado.save()

      const ofendido = await Persona.findById(args.casoInput.ofendido) // req.ofendidoId Crear Variable para almacenar el _id del ofendido buscado o creado

      if (!ofendido) {
        throw new Error('Ofendido no encontrado.')
      }
      ofendido.casos.push(caso)
      await ofendido.save()

      return casoCreado
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

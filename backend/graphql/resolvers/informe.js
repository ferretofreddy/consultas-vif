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
  informes: async () => {
    try {
      const informes = await Informe.find()
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
      console.log(err)
      throw err
    }
  },

  numInforme: async ({ nInforme }, req) => {
    /* if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    } */
    try {
      const informe = await Informe.findOne({ nInforme: nInforme })
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
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  editarInforme: async ({ nInforme, f_informe, aprehendido, casoCLAIS, decA_Blanca, decA_Fuego, trasladoFiscalia, primerizo, casoPorDesovediencia }, req) => {
    /* if (!req.isAuth) {
      throw new Error('Acceso Denegado!');
    } */
    try {
      const informe = await Informe.findOneAndUpdate({ nInforme: nInforme }, { $set: { f_informe: f_informe, aprehendido: aprehendido, casoCLAIS: casoCLAIS, decA_Blanca: decA_Blanca, decA_Fuego: decA_Fuego, trasladoFiscalia: trasladoFiscalia, primerizo: primerizo, casoPorDesovediencia: casoPorDesovediencia } }, { new: true })
      return {
        ...informe._doc,
        _id: informe.id,
        nInforme: informe.nInforme,
        f_informe: new Date(informe._doc.f_informe).toISOString(),
        aprehendido: informe.aprehendido,
        casoCLAIS: informe.casoCLAIS,
        decA_Blanca: informe.decA_Blanca,
        decA_Fuego: informe.decA_Fuego,
        trasladoFiscalia: informe.trasladoFiscalia,
        primerizo: informe.primerizo,
        casoPorDesovediencia: informe.casoPorDesovediencia,
        imputado: persona.bind(this, informe.imputado),
        ofendido: persona.bind(this, informe.ofendido),
        createdAt: new Date(informe._doc.createdAt).toISOString(),
        updatedAt: new Date(informe._doc.updatedAt).toISOString()
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  crearInforme: async (args, req) => {
    /*  if (!req.isAuth) {
      throw new Error('Acceso Denegado!')
    } */

    const informeExistente = await Informe.findOne({ nInforme: args.informeInput.nInforme })
    if (informeExistente) {
      throw new Error('Este numero de informe ya existe.')
    }

    const informe = new Informe({
      nInforme: args.informeInput.nInforme,
      f_informe: args.informeInput.f_informe,
      aprehendido: args.informeInput.aprehendido,
      casoCLAIS: args.informeInput.casoCLAIS,
      decA_Blanca: args.informeInput.decA_Blanca,
      decA_Fuego: args.informeInput.decA_Fuego,
      trasladoFiscalia: args.informeInput.trasladoFiscalia,
      primerizo: args.informeInput.primerizo,
      casoPorDesovediencia: args.informeInput.casoPorDesovediencia,
      imputado: args.informeInput.imputado, // req.imputadoId,
      ofendido: args.informeInput.ofendido // req.ofendidoId
    })
    let informeCreado
    try {
      const result = await informe.save()
      informeCreado = {
        ...result._doc,
        _id: result.id,
        nInforme: result.nInforme,
        f_informe: new Date(result._doc.f_informe).toLocaleDateString(),
        aprehendido: result.aprehendido,
        casoCLAIS: result.casoCLAIS,
        decA_Blanca: result.decA_Blanca,
        decA_Fuego: result.decA_Fuego,
        trasladoFiscalia: result.trasladoFiscalia,
        primerizo: result.primerizo,
        casoPorDesovediencia: result.casoPorDesovediencia,
        imputado: persona.bind(this, result.imputado),
        ofendido: persona.bind(this, result.ofendido),
        createdAt: new Date(result._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(result._doc.updatedAt).toLocaleDateString()
      }

      const imputado = await Persona.findById(args.informeInput.imputado) // req.imputadoId Crear Variable para almacenar el _id del imputado buscado o creado

      if (!imputado) {
        throw new Error('Imputado no encontrado.')
      }
      imputado.informes.push(informe)
      await imputado.save()

      const ofendido = await Persona.findById(args.informeInput.ofendido) // req.ofendidoId Crear Variable para almacenar el _id del ofendido buscado o creado

      if (!ofendido) {
        throw new Error('Ofendido no encontrado.')
      }
      ofendido.informes.push(informe)
      await ofendido.save()

      return informeCreado
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

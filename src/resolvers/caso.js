import { Caso } from '../models'

export default {
  Query: {
    casos: (root, args, context, info) => {
      // TODO: auth, projection, pagination,

      return Caso.find({})
    },
    caso: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      return Caso.findById(id)
    },
    expediente: (root, { expediente }, context, info) => {
      // TODO: auth, projection, sanitization

      return Caso.find({ expediente: expediente })
    },
    juzgado: (root, { juzgado }, context, info) => {
      // TODO: auth, projection, sanitization

      return Caso.find({ juzgado: juzgado })
    }
  },
  Mutation: {
    addCaso: (root, args, context, info) => {
      // TODO: not auth

      // validation

      return Caso.create(args)
    }
  },
  Caso: {
    imputado: async (caso, args, context, info) => {
      return (await caso.populate('imputado').execPopulate()).imputado
    },
    ofendido: async (caso, args, context, info) => {
      return (await caso.populate('ofendido').execPopulate()).ofendido
    }
  }
}

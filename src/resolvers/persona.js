import { Persona } from '../models'

export default {
  Query: {
    personas: (root, args, context, info) => {
      // TODO: auth, projection, pagination,

      return Persona.find({})
    },
    persona: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      return Persona.findById(id)
    },
    identificacion: (root, { identificacion }, context, info) => {
      // TODO: auth, projection, sanitization

      return Persona.find({ identificacion: identificacion })
    }
  },
  Mutation: {
    addPersona: (root, args, context, info) => {
      // TODO: not auth

      // validation

      return Persona.create(args)
    },
    editPersona: (root, args, context, info) => {
      // TODO: not auth

      // validation
      const id = args.id
      const nombre = args.nombre
      const identificacion = args.identificacion
      // args.nombre, args.identificacion, args.f_nacimiento, args.sexo, args.edad, args.provincia, args.canton, args.distrito, args.direccion
      var persona = Persona.findByIdAndUpdate(id, { $set: { nombre: nombre, identificacion: identificacion } })
      return persona
    }
  },
  Persona: {
    casos: async (persona, args, { req }, info) => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      return (await persona.populate('casos').execPopulate()).casos
    }
  }
}

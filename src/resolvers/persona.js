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
    }
  },
  Persona: {
    casos: async (persona, args, { req }, info) => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      return (await persona.populate('casos').execPopulate()).casos
    }
  }
}

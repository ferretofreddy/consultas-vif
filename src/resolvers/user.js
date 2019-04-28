import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: auth, projection, pagination,

      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} no es una id de usuario válida.`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      // TODO: not auth

      // validation

      return User.create(args)
    }
  }
}

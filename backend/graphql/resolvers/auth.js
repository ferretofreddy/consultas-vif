const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')

module.exports = {
  crearUsuario: async args => {
    try {
      const existingUser = await User.findOne({ identificacion: args.userInput.identificacion })
      if (existingUser) {
        throw new Error('Este usuario ya existe')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        identificacion: args.userInput.identificacion,
        name: args.userInput.name,
        roll: args.userInput.roll
      })

      const result = await user.save()

      return {
        ...result._doc,
        _id: result.id,
        email: result.email,
        password: result.password,
        identificacion: result.identificacion,
        name: result.name,
        roll: result.roll
      }
    } catch (err) {
      throw err
    }
  },
  login: async ({ identificacion, password }) => {
    const user = await User.findOne({ identificacion: identificacion })
    if (!user) {
      throw new Error('Usuario no registrado!')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Contraseña incorrecta!')
    }
    const token = jwt.sign(
      { userId: user.id, identificacion: user.identificacion },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    )
    return { userId: user.id, identificacion: user.identificacion, name: user.name, roll: user.roll, token: token, tokenExpiration: 1 }
  },

  editarProfile: async ({ identificacion, oldPassword, newPassword1, newPassword2, name }) => {
    const user = await User.findOne({ identificacion: identificacion })
    if (!user) {
      throw new Error('Usuario no encontrado')
    }
    const isEqual = await bcrypt.compare(oldPassword, user.password)
    if (!isEqual) {
      throw new Error('Contraseña incorrecta!')
    }

    if (newPassword1 !== newPassword2) {
      throw new Error('Las nuevas contraseñas no son iguales')
    }
    const newpasswordEqual = newPassword2

    try {
      const hashedPassword = await bcrypt.hash(newpasswordEqual, 12)
      const updateProfile = await User.findOneAndUpdate({ identificacion: identificacion }, { $set: { password: hashedPassword, name: name } }, { new: true })
      if (!updateProfile) {
        throw new Error('Usuario no encontrado')
      }
      const token = jwt.sign(
        { userId: user.id, identificacion: user.identificacion },
        'somesupersecretkey',
        {
          expiresIn: '1h'
        }
      )
      return { userId: user.id, identificacion: user.identificacion, name: user.name, roll: user.roll, token: token, tokenExpiration: 1 }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

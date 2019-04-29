import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME
} from './config'

// Configuracion de zona horaria a zona horaria de Costa Rica

const moment = require('moment-timezone')
const dateCR = moment.tz(Date.now(), 'America/Costa_Rica')
console.log(dateCR);

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true`,
      { useNewUrlParser: true }
    )

    const app = express()

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true
    })

    server.applyMiddleware({ app })

    app.listen({ port: APP_PORT }, () =>
      console.log(`Servidor corriendo en: http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()

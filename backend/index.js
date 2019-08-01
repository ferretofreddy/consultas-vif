const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const path = require('path')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()

// MIDDLEWARE
app.use(bodyParser.json())

app.use((req, res, next) => { // configuracion de server
  res.setHeader('Access-Control-Allow-Origin', '*') // permitir conexxiones de los clientes
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200) // responder con estado 200 a Options para establecer la conexion exitosa
  }
  next()
})

app.use(isAuth)

app.use('/', express.static('build', { redirect: false }))

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
)

app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('build/index.html'))
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`, { useNewUrlParser: true }
  )
  .then(() => {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en: http://localhost:${PORT}/graphql`)
    )
  })
  .catch(err => {
    console.log(err)
  })

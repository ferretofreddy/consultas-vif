const authResolver = require('./auth')
const casoResolver = require('./caso')
const personaResolver = require('./persona')
const informeResolver = require('./informe')

const rootResolver = {
  ...authResolver,
  ...casoResolver,
  ...personaResolver,
  ...informeResolver
}

module.exports = rootResolver

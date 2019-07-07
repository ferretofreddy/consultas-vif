const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Persona {
  _id: ID!
  nombre: String
  identificacion: String
  f_nacimiento: String
  sexo: String
  edad: Int
  provincia: String
  canton: String
  distrito: String
  direccion: String
  casos: [Caso!]
  informes: [Informe!]
  createdAt: String!
  updatedAt: String!
}

type Caso {
  _id: ID!
  expediente: String!
  juzgado: String
  notifImputado: Boolean
  f_notifImputado: String
  notifOfendido: Boolean
  f_notifOfendido: String
  desalojo: Boolean
  cambioDomicilioVict: Boolean
  medidasProteccion: Boolean
  f_emisionMedidas: String
  imputado: Persona!
  ofendido: Persona!
  createdAt: String!
  updatedAt: String!
}

type Informe {
  _id: ID!
  nInforme: String!
  f_informe: String
  aprehendido: Boolean
  casoCLAIS: Boolean
  decA_Blanca: Boolean
  decA_Fuego: Boolean
  trasladoFiscalia: Boolean
  primerizo: Boolean
  casoPorDesovediencia: Boolean
  imputado: Persona!
  ofendido: Persona!
  createdAt: String!
  updatedAt: String!
}

type User {
  _id: ID!
  email: String
  identificacion: String
  name: String
  roll: String
  password: String
  createdAt: String!
  updatedAt: String!
}

type AuthData {
  userId: ID
  identificacion: String
  name: String
  roll: String
  token: String
  tokenExpiration: Int
}

type Imputado {
  imputadoId: ID
  identificacion: String
}

type Ofendido {
  ofendidoId: ID
  identificacion: String
}

input PersonaInput {
  nombre: String!
  identificacion: String!
  f_nacimiento: String
  sexo: String
  edad: Int
  provincia: String
  canton: String
  distrito: String
  direccion: String
}

input CasoInput {
  expediente: String!
  juzgado: String!
  notifImputado: Boolean
  f_notifImputado: String
  notifOfendido: Boolean
  f_notifOfendido: String
  desalojo: Boolean
  cambioDomicilioVict: Boolean
  medidasProteccion: Boolean
  f_emisionMedidas: String
  imputado: String!
  ofendido: String!
}

input InformeInput {
  nInforme: String!
  f_informe: String
  aprehendido: Boolean
  casoCLAIS: Boolean
  decA_Blanca: Boolean
  decA_Fuego: Boolean
  trasladoFiscalia: Boolean
  primerizo: Boolean
  casoPorDesovediencia: Boolean
  imputado: String!
  ofendido: String!
}

input UserInput {
  email: String!
  identificacion: String!
  name: String
  password: String!
  roll: String!
}

type RootQuery {
  personas: [Persona]
  persona(_id: ID!): Persona
  buscarPersona(identificacion: String!): Persona
  buscarImputado(identificacion: String!): Imputado
  buscarOfendido(identificacion: String!): Ofendido
  casos: [Caso!]!
  expediente(expediente: String!): Caso!
  juzgado(juzgado: String!): [Caso!]!
  informes: [Informe!]!
  numInforme(nInforme: String!): Informe!
  login(identificacion: String!, password: String!): AuthData!
  editarPersona(identificacion: String!, nombre: String!, f_nacimiento: String!, sexo: String!, edad: Int!, provincia: String!, canton: String!, distrito: String!, direccion: String!): Persona!
  editarCaso(expediente: String!, juzgado: String!, notifImputado: Boolean!, f_notifImputado: String!, notifOfendido: Boolean!, f_notifOfendido: String!, desalojo: Boolean!, cambioDomicilioVict: Boolean!, medidasProteccion: Boolean!, f_emisionMedidas: String!): Caso!
  editarInforme(nInforme: String!, f_informe: String!, aprehendido: Boolean!, casoCLAIS: Boolean!, decA_Blanca: Boolean!, decA_Fuego: Boolean!, trasladoFiscalia: Boolean!, primerizo: Boolean!, casoPorDesovediencia: Boolean!): Informe!
  editarProfile(identificacion: String!, oldPassword: String!, newPassword1: String!, newPassword2: String!, name: String!): AuthData!
}

type RootMutation {
  crearUsuario(userInput: UserInput): User!
  crearPersona(personaInput: PersonaInput): Persona! 
  crearCaso(casoInput: CasoInput): Caso! 
  crearInforme(informeInput: InformeInput): Informe!
  editarPersona(identificacion: String!, nombre: String!, f_nacimiento: String!, sexo: String!, edad: Int!, provincia: String!, canton: String!, distrito: String!, direccion: String!): Persona!
  editarCaso(expediente: String!, juzgado: String!, notifImputado: Boolean, f_notifImputado: String, notifOfendido: Boolean, f_notifOfendido: String, desalojo: Boolean, cambioDomicilioVict: Boolean, medidasProteccion: Boolean, f_emisionMedidas: String): Caso!
  editarInforme(nInforme: String!, f_informe: String!, aprehendido: Boolean!, casoCLAIS: Boolean!, decA_Blanca: Boolean!, decA_Fuego: Boolean!, trasladoFiscalia: Boolean!, primerizo: Boolean!, casoPorDesovediencia: Boolean!): Informe!
  editarProfile(identificacion: String!, oldPassword: String!, newPassword1: String!, newPassword2: String!, name: String!): AuthData!
}


schema {
  query: RootQuery
  mutation: RootMutation
}
`)

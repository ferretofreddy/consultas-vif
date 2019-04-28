import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        caso(id: ID!): Caso
        casos: [Caso!]!
        expediente(expediente: String!): [Caso!]!
        juzgado(juzgado: String!): [Caso!]!
    }

    extend type Mutation {
       addCaso(expediente: String!, juzgado: String!, notifImputado: Boolean, f_notifImputado: String, notifOfendido: Boolean, f_notifOfendido: String, desalojo: Boolean, cambioDomicilioVict: Boolean, medidasProteccion: Boolean, f_emisionMedidas: String, imputado: String, ofendido: String): Caso 
    }

    type Caso {
      id: ID!
      expediente: String!
      juzgado: String!
      notifImputado: Boolean!
      f_notifImputado: String!
      notifOfendido: Boolean!
      f_notifOfendido: String!
      desalojo: Boolean!
      cambioDomicilioVict: Boolean!
      medidasProteccion: Boolean!
      f_emisionMedidas: String!
      imputado: [Persona!]!
      ofendido: [Persona!]!
      createdAt: String!
      updatedAt: String!
    }
`

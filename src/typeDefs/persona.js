import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        persona(id: ID!): Persona
        personas: [Persona!]!
        identificacion(identificacion: String!): [Persona!]!
        
    }

    extend type Mutation {
       addPersona(nombre: String!, identificacion: String!, f_nacimiento: String, sexo: String, edad: Int, provincia: String, canton: String, distrito: String, direccion: String, casos: [String]): Persona 
    }

    type Persona {
      id: ID!
      nombre: String!
      identificacion: String!
      f_nacimiento: String!
      sexo: String!
      edad: Int!
      provincia: String!
      canton: String!
      distrito: String!
      direccion: String!
      casos: [Caso!]!
      createdAt: String!
      updatedAt: String!
    }
`

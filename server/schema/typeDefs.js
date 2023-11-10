const { gql } = require('apollo-server');

const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String!
    status: String!
    client: Client
  }

  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
    clients: [Client]
    client(id: ID!): Client
  }

  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client
    deleteClient(id: ID!): Client
    addProject(name: String!, description: String!, status: String, clientId: ID!): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, name: String, description: String, status: String): Project
  }
`;

module.exports = typeDefs;

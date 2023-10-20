const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

// MONGOOSE MODELS
const Project = require('../models/Project');
const Client = require('../models/Client');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.findById(parent.clientId);
      },
    },
  }),
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find(); // THIS RETURNS ALL PROJECTS IN DB
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id); // THIS RETURNS SINGLE PROJECT BY ITS ID FROM DB
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find(); // THIS REUTRNS ALL CLIENTS IN DB
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id); // THIS RETURNS SINGLE CLIENT BY ITS ID FROM DB
      },
    },
  },
});

// MUTATIONS
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // ADD CLIENT
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return Client.create(client); // CREATES NEW CLIENT WITH ID, NAME, EMAIL, PHONE
      },
    },
    // DELETE A CLIENT
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

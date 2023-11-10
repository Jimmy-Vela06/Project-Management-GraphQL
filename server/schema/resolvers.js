const Project = require('../models/Project');
const Client = require('../models/Client');

const resolvers = {
  Query: {
    projects: async () => {
      console.log('Fetching projects...');
      const result = await Project.find();
      console.log('Fetched projects:', result);
      return result;
    },
    project: async (parent, args) => {
      const result = await Project.findById(args.id);
      return result;
    },
    clients: async () => {
      const result = await Client.find();
      return result;
    },
    client: async (parent, args) => {
      const result = await Client.findById(args.id);
      return result;
    },
  },
  Mutation: {
    addClient: (parent, args) => {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      return client.save();
    },
    deleteClient: async (parent, args) => {
      const result = await Client.findByIdAndRemove(args.id);
      return result;
    },
    addProject: (parent, args) => {
      const project = new Project({
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId,
      });
      return project.save();
    },
    deleteProject: async (parent, args) => {
      const result = await Project.findByIdAndRemove(args.id);
      return result;
    },
    updateProject: async (parent, args) => {
      const result = await Project.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
        { new: true }
      );
      return result;
    },
  },
  Project: {
    client: async (parent) => {
      const result = await Client.findById(parent.clientId);
      return result;
      r;
    },
  },
};

module.exports = resolvers;

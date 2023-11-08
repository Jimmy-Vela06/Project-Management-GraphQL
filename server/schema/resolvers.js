const Project = require('../models/Project');
const Client = require('../models/Client');

const resolvers = {
  Query: {
    projects: () => {
      return Project.find(); // Assuming Project is a Mongoose model
    },
    project: (parent, args) => {
      return Project.findById(args.id);
    },
    clients: () => {
      return Client.find(); // Assuming Client is a Mongoose model
    },
    client: (parent, args) => {
      return Client.findById(args.id);
    },
  },
  Mutation: {
    addClient: (parent, args) => {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      return client.save(); // Assuming Client is a Mongoose model
    },
    deleteClient: (parent, args) => {
      return Client.findByIdAndRemove(args.id);
    },
    addProject: (parent, args) => {
      const project = new Project({
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId,
      });
      return project.save(); // Assuming Project is a Mongoose model
    },
    deleteProject: (parent, args) => {
      return Project.findByIdAndRemove(args.id);
    },
    updateProject: (parent, args) => {
      return Project.findByIdAndUpdate(
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
    },
  },
  Project: {
    client: (parent, args) => {
      return Client.findById(parent.clientId);
    },
  },
};

module.exports = resolvers;

const schema = require('./schema.js');
const { printSchema } = require('graphql');

const resolvers = require('./resolvers.js');

const schemaSDL = printSchema(schema);
const typeDefs = schemaSDL;

module.exports = { typeDefs, resolvers };

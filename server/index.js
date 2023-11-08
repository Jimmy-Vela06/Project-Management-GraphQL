const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');
// const { typeDefs } = require('./schema/index.js');
const schema = require('./schema/schema.js');
const db = require('./config/connection');

const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5001;

mongoose.set('strictQuery', false); // stops the DeprecationWarning
connectDB();

// const schema = makeExecutableSchema({ typeDefs });

const server = new ApolloServer({
  schema,
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const startApolloServer = async (schema) => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, console.log(` Server running on port: ${PORT} 🚀 `));

  //   db.once('open', () => {
  //     app.listen(PORT, () => {
  //       console.log(`API server running on port ${PORT}!`);
  //       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  //     });
  //   });
};

startApolloServer(schema);

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const { typeDefs, resolvers } = require('./schema/index.js');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const colors = require('colors');

const PORT = process.env.PORT || 5003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Your database connection logic
  db.once('open', () => {
    console.log('Apollo Server Connected to MongoDB');
  });

  // Start the Apollo Server integrated with Express
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`API server running on port ${PORT}!`.cyan.bold);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`.underline.bold);
};

startApolloServer();

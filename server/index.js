const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const { typeDefs, resolvers } = require('./schema/index.js');
const { ApolloServer, ForbiddenError } = require('apollo-server-express');
const path = require('path');
const colors = require('colors');

const PORT = process.env.PORT || 5003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  plugins: [
    {
      async requestDidStart() {
        return {
          willSendResponse({ response, context }) {
            if (context.req.method === 'GET') {
              throw new ForbiddenError('GET requests are not allowed for the GraphQL endpoint.');
            }
          },
        };
      },
    },
  ],
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  db.once('open', () => {
    console.log('Apollo Server Connected to MongoDB');
  });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`API server running on port ${PORT}!`.cyan.bold);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`.underline.bold);
};

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to your GraphQL API!');
});

// Define a route for POST requests at the root path
app.post('/', (req, res) => {
  res.send('Received a POST request at the root path!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ForbiddenError) {
    res.status(403).json({ error: 'Forbidden: GET requests are not allowed for the GraphQL endpoint.' });
  } else {
    console.error(err); // Log other errors for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

startApolloServer(typeDefs, resolvers);

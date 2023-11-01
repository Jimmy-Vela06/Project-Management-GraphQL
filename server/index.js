const express = require('express');
const cors = require('cors');
require('dotenv').config();
const colors = require('colors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const port = process.env.PORT || 5001;

const app = express();

// // Connect to database
mongoose.set('strictQuery', false); // stops the DeprecationWarning
connectDB();

app.use(cors());

app.get('/', (req, res) => {
  res.send('APP IS RUNNING.');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

if (process.env.NODE_ENV === 'production') {
  // Set build folder as static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Project...' });
  });
}

app.listen(port, console.log(` Server running on port: ${port} 🚀 `.white.bgBrightGreen.bold));

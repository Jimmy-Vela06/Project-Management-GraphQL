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

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(` Server running on port: ${port} 🚀 `.white.bgBrightGreen.bold));

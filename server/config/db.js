const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  conn.mongoose.set('strictQuery', true);
  console.log(`CONNECTION: MongoDB Has Been Connected TO ${conn.connection.host}`.blue.bold);
};

module.exports = connectDB;

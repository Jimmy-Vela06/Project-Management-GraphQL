const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb+srv://jimmyvela6:abc123ab12@projectmanagment.dlmavbg.mongodb.net/mgmt_db?retryWrites=true&w=majority'
  );
  conn.mongoose.set('strictQuery', true);
  introspection: true;
  console.log(`CONNECTION: MongoDB Has Been Connected TO ${conn.connection.host}`.blue.bold);
};

module.exports = connectDB;

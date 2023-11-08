const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  conn.mongoose.set('strictQuery', true);
  console.log(`CONNECTION: MongoDB Has Been Connected TO ${conn.connection.host}`);
};

module.exports = connectDB;

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = mongoose.connection;

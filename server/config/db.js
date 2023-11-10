// const mongoose = require('mongoose');

// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI);
//   conn.mongoose.set('strictQuery', true);
//   console.log(`CONNECTION: MongoDB Has Been Connected TO ${conn.connection.host}`);
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://jimmyvela6:abc123ab12@projectmanagment.dlmavbg.mongodb.net/mgmt_db?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;

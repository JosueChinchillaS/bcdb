// Database configuration

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    // In case of error
    console.log('An error occured');
    console.log(error);
    // Stop the app
    process.exit(1);
  }
};

module.exports = connection;

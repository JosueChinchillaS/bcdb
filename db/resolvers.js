// Importing the models
const User = require('../models/User');

// Bcrypt

const bcryptjs = require('bcryptjs');

require('dotenv').config({ path: '.env' });

const jwt = require('jsonwebtoken');

// Create token
const token = (user, secret, expiresIn) => {
  const { id, email, name, firstSurName } = user;
  return jwt.sign({ id, email, name, firstSurName }, secret, { expiresIn });
};

const resolvers = {
  // Queries
  Query: {
    getUser: async (_, { token }) => {
      const userId = await jwt.verify(token, process.env.SECRET);
      return userId;
    },
   
  },

  // Mutations
  Mutation: {
    createUser: async (_, { input }) => {
      const { email, password } = input;

      // Check if user exists

      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error('Este usuario ya está registrado!');
      }

      // Hashing password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      // Save user in the data base
      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    authUser: async (_, { input }) => {
      const { email, password } = input;

      // User exists
      const userExist = await User.findOne({ email });

      if (!userExist) {
        throw new Error('El usuario no existe!');
      }

      // Check password
      const isCorrect = await bcryptjs.compare(password, userExist.password);

      if (!isCorrect) {
        throw new Error('La contraseña es incorrecta!');
      }
      // Create token
      return { token: token(userExist, process.env.SECRET, '24h') };
    },
  },
};

module.exports = resolvers;

// Importing the models
const User = require('../models/User');
const MedicalRecord = require('../models/MedicalRecord');
const Inventory = require('../models/Inventory');

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
    // Users
    getUser: async (_, { token }) => {
      const userId = await jwt.verify(token, process.env.SECRET);
      return userId;
    },

    //Medical Records
    getMedicalRecords: async () => {
      try {
        const medicalRecords = await MedicalRecord.find({});
        return medicalRecords;
      } catch (error) {
        console.log(error);
      }
    },

    getMedicalRecordById: async (_, { id }) => {
      // Check if exist
      const medicalRecord = await MedicalRecord.findById(id);
      if (!medicalRecord) {
        throw new Error('No se ha encontrado la ficha médica');
      }

      return medicalRecord;
    },

    getMedicalRecordByUser: async (_, {}, ctx) => {
      try {
        const medicalRecord = await MedicalRecord.find({
          user: ctx.user.id.toString(),
        });
        return medicalRecord;
      } catch (error) {
        console.log(error);
      }
    },

    //Inventory
    getInventories: async () => {
      try {
        const inventory = await Inventory.find({});
        return inventory;
      } catch (error) {
        console.log(error);
      }
    },
    getInventoryById: async (_, { id }) => {
      // Check if exist
      const inventory = await Inventory.findById(id);
      if (!inventory) {
        throw new Error('No se ha encontrado la ficha médica');
      }

      return inventory;
    },

    getInventoryByUser: async (_, {}, ctx) => {
      try {
        const inventory = await Inventory.find({
          user: ctx.user.id.toString(),
        });
        return inventory;
      } catch (error) {
        console.log(error);
      }
    },
  },

  // Mutations
  Mutation: {
    //User Starts
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

    // Medical Record Starts
    createMedicalRecord: async (_, { input }, ctx) => {
      const medicalRecord = new MedicalRecord(input);
      medicalRecord.user = ctx.user.id;

      try {
        // Save medical record in the data base

        medicalRecord.save();

        return medicalRecord;
      } catch (error) {
        console.log(error);
      }
    },

    updateMedicalRecord: async (_, { id, input }) => {
      // Check if exist
      let medicalRecord = await MedicalRecord.findById(id);
      if (!medicalRecord) {
        throw new Error('No se ha encontrado la ficha médica');
      }

      // Save in data base

      medicalRecord = await MedicalRecord.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return medicalRecord;
    },

    deleteMedicalRecord: async (_, { id }) => {
      // Check if exist
      let medicalRecord = await MedicalRecord.findById(id);
      if (!medicalRecord) {
        throw new Error('No se ha encontrado la ficha médica');
      }

      // Delete

      await MedicalRecord.findOneAndDelete({ _id: id });
      return 'Se ha eliminado la ficha médica';
    },

    //Inventory Starts
    createInventory: async (_, { input }, ctx) => {
      //Assign user
      const newInventory = new Inventory(input);
      newInventory.user = ctx.user.id;

      //Save in database
      try {
        newInventory.save();
        return newInventory;
      } catch (error) {
        console.log(error);
      }
    },
    updateInventory: async (_, { id, input }) => {
      // Check if exist
      let inventory = await Inventory.findById(id);
      if (!inventory) {
        throw new Error('No se ha encontrado el instrumento');
      }

      // Save in data base

      inventory = await Inventory.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return inventory;
    },

    deleteInventory: async (_, { id }) => {
      // Check if exist
      let inventory = await Inventory.findById(id);
      if (!inventory) {
        throw new Error('No se ha encontrado el instrumento');
      }

      // Delete

      await Inventory.findOneAndDelete({ _id: id });
      return 'Se ha eliminado el instrumento';
    },
  },
};

module.exports = resolvers;

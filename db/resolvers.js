// Importing the models
const User = require('../models/User');

// Bcrypt

const bcryptjs = require('bcryptjs');

// const users = [
//   {
//     name: 'Josué',
//     email: 'josuechinchilla@gmail.com',
//     password: 'josue123',
//     firstSurName: 'Chinchilla',
//     secondSurName: 'Salazar',
//     state: 'Exalumno',
//     instrument: 'Clarinete',
//     grade: '',
//     phone: '+506 8444-0538',
//     rol: 'Líder',
//     carnet: '2011474',
//   },
//   {
//     name: 'Luis Fernando',
//     email: 'lsolano@gmail.com',
//     password: 'luis1223',
//     firstSurName: 'Solano',
//     secondSurName: 'Gamboa',
//     state: '',
//     instrument: '',
//     grade: '',
//     phone: '+506 87912093',
//     rol: 'Director',
//     carnet: '2012912',
//   },
// ];

// const profiles = [
//   {
//     identification: '1183609300',
//     birthday: '',
//     sex: 'Masculino',
//     bloodType: 'B+',
//     address: 'Poás de Aserrí',
//     familyMemberName: 'Josué Chinchilla Salazar',
//     familyMemberNumber: '89169888',
//     familyMemberNumberId: '108000052',
//     familyMemberRelationship: 'Padre',
//     illness: 'Migraña',
//     medicine: 'Ibuprofeno, Parecetamol',
//     medicineOnTour: 'Ibuprofeno',
//     vaccinated: 'Sí',
//     vaccineNumber: '3',
//     vaccineManufacturer: 'Pfizer',
//   },
// ];

// Resolvers

const resolvers = {
  // Queries
  Query: {
    getUsers: () => 'users',
    getProfiles: () => 'profiles',
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
  },
};

module.exports = resolvers;

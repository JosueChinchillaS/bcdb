const { ApolloServer, gql } = require('apollo-server');

// Creating the schema
const typeDefs = gql`
  type User {
    id: ID
    name: String
    firstSurName: String
    secondSurName: String
    email: String
    state: String
    grade: String
    phone: String
    rol: String
    instrument: String
    avatar: String
    carnet: String
    date: String
  }

  input UserInput {
    name: String!
    firstSurName: String!
    secondSurName: String!
    email: String!
    password: String!
    state: String
    grade: String
    phone: String!
    rol: String!
    instrument: String
    carnet: String
  }

  type Token {
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: UserInput): User
    authUser(input: AuthInput): Token
  }

  type Profile {
    user: User
    identification: String
    birthday: String
    sex: String
    bloodType: String
    address: String
    familyMemberName: String
    familyMemberNumber: String
    familyMemberNumberId: String
    familyMemberRelationship: String
    illness: [String]
    medicine: String
    medicineOnTour: [String]
    vaccinated: String
    vaccineNumber: Int
    vaccineManufacturer: String
  }

  type Inventory {
    user: User
    condition: String
    brand: String
    model: String
    numberId: String
    serie: String
  }

  type Query {
    getUser(token: String!): User
    getUsers: [User]
    getProfiles: [Profile]
    getInventory: [Inventory]
  }
`;

module.exports = typeDefs;

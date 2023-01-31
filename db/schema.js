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

  type MedicalRecord {
    id: ID
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
    medicine: [String]
    medicineOnTour: [String]
    vaccinated: String
    vaccineNumber: Int
    vaccineManufacturer: String
    user: ID
  }
  input MedicalRecordInput {
    identification: String!
    birthday: String!
    sex: String!
    bloodType: String!
    address: String!
    familyMemberName: String!
    familyMemberNumber: String!
    familyMemberNumberId: String!
    familyMemberRelationship: String!
    illness: String!
    medicine: [String]!
    medicineOnTour: [String]!
    vaccinated: String!
    vaccineNumber: Int!
    vaccineManufacturer: String!
  }

  type Inventory {
    id: ID
    condition: String
    brand: String
    model: String
    numberId: String
    serie: String
    user: ID
  }

  input InventoryInput {
    condition: String!
    brand: String!
    model: String
    numberId: String!
    serie: String
  }

  type Token {
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Mutation {
    #Users
    createUser(input: UserInput): User
    authUser(input: AuthInput): Token

    #Medical Record
    createMedicalRecord(input: MedicalRecordInput): MedicalRecord
    updateMedicalRecord(id: ID!, input: MedicalRecordInput): MedicalRecord
    deleteMedicalRecord(id: ID!): String

    #Inventories
    createInventory(input: InventoryInput): Inventory
    updateInventory(id: ID!, input: InventoryInput): Inventory
    deleteInventory(id: ID!): String
  }

  type Query {
    # Users
    getUser(token: String!): User
    getUsers: [User]

    # Medical Record
    getMedicalRecords: [MedicalRecord]
    getMedicalRecordById(id: ID!): MedicalRecord
    getMedicalRecordByUser: [MedicalRecord]
    # Inventory
    getInventories: [Inventory]
    getInventoryByUser: [Inventory]
    getInventoryById(id: ID!): Inventory
  }
`;

module.exports = typeDefs;

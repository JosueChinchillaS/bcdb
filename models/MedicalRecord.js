const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  identification: { type: String, required: true, unique: true },
  birthday: { type: Date, required: false, unique: false },
  sex: { type: String, required: true, unique: false },
  bloodType: { type: String, required: true, unique: false },
  address: { type: String, required: true, unique: false },
  familyMemberName: { type: String, required: true, unique: false },
  familyMemberNumber: { type: String, required: true, unique: false },
  familyMemberNumberId: { type: String, required: true, unique: false },
  familyMemberRelationship: { type: String, required: true, unique: false },
  illness: { type: [String], required: true, unique: false },
  medicine: { type: [String], required: true, unique: false },
  medicineOnTour: { type: [String], required: true, unique: false },
  vaccinated: { type: String, required: true, unique: false },
  vaccineNumber: { type: Number, required: true, unique: false },
  vaccineManufacturer: { type: String, required: true, unique: false },
});

module.exports = MedicalRecord = mongoose.model(
  'Medicalrecord',
  MedicalRecordSchema
);

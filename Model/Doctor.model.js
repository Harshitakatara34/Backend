const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Image: { type: String, required: true },
  Specialization: { type: String, required: true },
  Experience: { type: Number, required: true },
  Location: { type: String, required: true },
  Date: { type: String, required: true },
  Slot: { type: Number, required: true },
  Fee: { type: Number, required: true },
});

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = {
  DoctorModel,
};

const express = require("express");
const { DoctorModel } = require("../Model/Doctor.model");
const appointments = express.Router();

appointments.post("/appointments", async (req, res) => {
  try {
    const newAppointment = await DoctorModel.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

appointments.get("/appointments", async (req, res) => {
  const { page = 1, specialization, sortBy, search } = req.query;
  const limit = 5;

  try {
    const query = {};

    if (specialization) {
      query.specialization = specialization;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const totalCount = await DoctorModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const appointments = await DoctorModel.find(query)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ appointments, totalPages });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

appointments.put("/appointments/:id", async (req, res) => {
  try {
    await DoctorModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: "Update successful" });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

appointments.delete("/appointments/:id", async (req, res) => {
  try {
    const deleted = await DoctorModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = {
  appointments,
};

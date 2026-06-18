const doctor = require("../model/doctor");
const appointments = require("../model/appointments");
const pquery = require("../model/patientmessage");
const ambulance = require("../model/Ambulance");
const service = require("../model/service");
const bcryptjs = require('bcryptjs');

const add_doctor = async (req, res) => {
  try {
    const { name, expertise, image, date, email, password, desc, contact, ammount } = req.body;
    const expertiseList = Array.isArray(expertise) ? expertise.filter(Boolean) : [];
    const dateList = Array.isArray(date) ? date.filter(Boolean) : [];

    if (!name || !image || !expertiseList.length || !dateList.length || !email || !password || !desc || !contact || !ammount) {
      return res.status(400).json({ message: "Please fill all doctor details and upload a doctor photo." });
    } else {
      const db_doctor = await doctor.findOne({ email });
      if (!db_doctor) {
        const hashed_password = await bcryptjs.hash(password, 8);
        await doctor.create({ name, image, expertise: expertiseList, date: dateList, email, password: hashed_password, desc, contact, ammount });
        return res.status(200).json({ message: "doctor added" });
      }
      return res.status(409).json({ message: "doctor already exists" });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const delete_doctor = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(204).json({ message: "no id sent" });
    } else {
      const db_doctor = await doctor.findOne({ _id });
      if (db_doctor) {
        await doctor.deleteOne({ _id });
        return res.json({ message: "doctor deleted" });
      }
      return res.status(404).json({ message: "no doctor found found" });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const update_doctor = async (req, res) => {
  try {
    const _id = req.params.id;
    const { name, expertise, image, date, email, password, desc, contact, ammount } = req.body;
    const expertiseList = Array.isArray(expertise) ? expertise.filter(Boolean) : [];
    const dateList = Array.isArray(date) ? date.filter(Boolean) : [];

    if (!_id || !name || !image || !expertiseList.length || !dateList.length || !email || !desc || !contact || !ammount) {
      return res.status(400).json({ message: "Please fill all doctor details and upload a doctor photo." });
    }

    const existingDoctor = await doctor.findById(_id);
    if (!existingDoctor) {
      return res.status(404).json({ message: "doctor not found" });
    }

    const emailOwner = await doctor.findOne({ email, _id: { $ne: _id } });
    if (emailOwner) {
      return res.status(409).json({ message: "doctor email already exists" });
    }

    const updateFields = { name, image, expertise: expertiseList, date: dateList, email, desc, contact, ammount };
    if (password) {
      updateFields.password = await bcryptjs.hash(password, 8);
    }

    const updatedDoctor = await doctor.findByIdAndUpdate(_id, updateFields, { new: true });
    return res.status(200).json({ message: "doctor updated", doctor: updatedDoctor });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const get_services = async (req, res) => {
  try {
    const services = await service.find({}).select("-__v");
    return res.status(200).json({ services });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const add_service = async (req, res) => {
  try {
    const { name, description, features, image } = req.body;
    const featureList = Array.isArray(features) ? features.filter(Boolean) : [];
    if (!name || !description || !featureList.length || !image) {
      return res.status(400).json({ message: "Please fill all service details and upload a service image." });
    }
    const createdService = await service.create({ name, description, features: featureList, image });
    return res.status(201).json({ message: "service added", service: createdService });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const update_service = async (req, res) => {
  try {
    const _id = req.params.id;
    const { name, description, features, image } = req.body;
    const featureList = Array.isArray(features) ? features.filter(Boolean) : [];
    if (!_id || !name || !description || !featureList.length || !image) {
      return res.status(400).json({ message: "Please fill all service details and upload a service image." });
    }
    const updatedService = await service.findByIdAndUpdate(
      _id,
      { name, description, features: featureList, image },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "service not found" });
    }
    return res.status(200).json({ message: "service updated", service: updatedService });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const delete_service = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "no id sent" });
    }
    const deletedService = await service.findByIdAndDelete(_id);
    if (!deletedService) {
      return res.status(404).json({ message: "service not found" });
    }
    return res.status(200).json({ message: "service deleted" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const user_query = async (req, res) => {
  try {
    const allQuery = await pquery.find({}).select("-__v ");
    return res.status(200).json(allQuery);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const ambulance_service = async (req, res) => {
  try {
    const get_ambulance = await ambulance.find({}).select("-__v ");
    return res.status(200).json(get_ambulance);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update_appointment = async (req, res) => {
  try {
    const { _id, status, invoice } = req.body;
    if (!_id || !status || !invoice) {
      return res.status(202).json({ message: "incomplete-content" });
    } else {
      const appointment = await appointments.findOne({ _id });
      if (!appointment) {
        return res.status(401).json({ message: "no appointment exist" });
      } else {
        await appointments.findByIdAndUpdate({ _id }, { status, invoice });
        return res.status(200).json({ message: "appointment updated" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const all_appointments = async (req, res) => {
  try {
    const all_appointments = await appointments.find().populate("user").populate("doctor");
    if (!all_appointments) {
      return res.status(401).json({ message: "no appointments found" });
    } else {
      return res.json({ all_appointments });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const single_appointments = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointments.findById(id).populate("doctor").populate("user");
    if (!appointment) {
      return res.status(401).json({ message: "no appointments found" });
    } else {
      return res.json({ appointment });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  add_doctor,
  update_doctor,
  delete_doctor,
  all_appointments,
  update_appointment,
  user_query,
  ambulance_service,
  single_appointments,
  get_services,
  add_service,
  update_service,
  delete_service,
};

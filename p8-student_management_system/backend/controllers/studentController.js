const Student = require("../models/Student");

// Create student
async function createStudent(req, res) {
  try {
    const { studentId, name, email, phone, course, semester } = req.body;

    const existingStudent = await Student.findOne({
      $or: [{ studentId: studentId }, { email: email }],
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student ID or email already exists",
      });
    }

    const student = await Student.create({
      studentId,
      name,
      email,
      phone,
      course,
      semester,
    });

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
}

// Get all students
async function getStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get one student
async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update student
async function updateStudent(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({
        message: "Invalid data or duplicate student ID/email",
      });
    }

    res.status(500).json({ message: error.message });
  }
}

// Delete student
async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
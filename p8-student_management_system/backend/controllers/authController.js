const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerAdmin(req, res) {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username: username });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      adminId: newAdmin._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginAdmin(req, res) {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username: username });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      username: admin.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
};
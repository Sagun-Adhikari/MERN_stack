const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerAdmin(req, res){
    const {username, password}=req.body;
    
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists",
      });
    }

    const hashedpw= await bcrypt.hash(password,10);

    const admin=await Admin.create({
        username,
        password:hashedpw
        
    })
    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });





}


async function loginAdmin(req,reg){
    const {username, password} = req.body;
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
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
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
}

module.exports = { registerAdmin, loginAdmin };
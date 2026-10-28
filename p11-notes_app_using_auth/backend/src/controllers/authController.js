const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const user=require('../models/User')

//register usr
async function registerUser(req,res){
    
    const {name,email,password}=req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const exsistinguser=await user.fineOne({email});
    if(exsistinguser){
        return res.status(400).json({
        message: "Email already registered",
      });
    }


    const hashedpassword=await bcrypt.hash(password,10);
    const user=await user.create({
        name,
        email,
        password:hashedpassword
    });

    res.status(201).json({
        message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    
    

}


async function loginUser(req,res){
    const {email,password}=req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user= await user.findOne({email})
    if(!user){
        return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token= jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
}

module.exports = { registerUser, loginUser };


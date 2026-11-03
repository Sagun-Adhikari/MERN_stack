const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// SIGNUP API
async function signup(req, res) {
    const { username, secret_key, diary_name } = req.body;

    const existingdiary = await User.findOne({ diary_name });

    if (existingdiary) {
        return res.status(400).json({
            message: "Diary already registered",
        });
    }

    const hashedkey = await bcrypt.hash(secret_key, 10);

    const user = await User.create({
        username,
        secret_key: hashedkey,
        diary_name
    });

    res.status(201).json({
        message: "Registration successful",
        user: {
            id: user._id,
            username: user.username,
            diary_name: user.diary_name
        }
    });
}

async function signin(req,res){
    const { diary_name, secret_key } = req.body;

    const user = await User.findOne({ diary_name });
    if (!user) {
        return res.status(401).json({
            message: "Invalid diary name or secret key"
        });
    }

    const isMatch = await bcrypt.compare(secret_key, user.secret_key);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid diary name or secret key"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    res.status(200).json({
        message: "Signin successful",
        token,
        user: {
            id: user._id,
            username: user.username,
            diary_name: user.diary_name
        }
    });
}

module.exports = { signup, signin };
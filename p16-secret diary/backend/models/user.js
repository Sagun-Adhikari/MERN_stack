const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    secret_key:{
        type:String
    },
    diary_name:{
        type:String
    }
});
const User = mongoose.model("User", userSchema);
module.exports=User;
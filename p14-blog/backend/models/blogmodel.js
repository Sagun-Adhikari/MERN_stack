const mongoose= require('mongoose')

const blogSchema= new mongoose.Schema(
    {
    title:{
        type:String
    },
    content:{
        type:String
    }
    
},{ timestamps: true})


const blog=mongoose.model("blog",blogSchema)
module.exports=blog
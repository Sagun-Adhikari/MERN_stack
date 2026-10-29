const blog = require('../models/blogmodel')

//create blog
const createblog = async (req, res) => {
    const { title, content } = req.body;

    const newblog = await blog.create({ title, content })

    res.status(201).json({
        message: "blog created successfully",
        blog: newblog
    })
}


const readblog= async ()=>{
    const blogs=await blog.find();
    res.status(200).json({
        message:"blog is read successfully"
    })
}

const updateblog= async (req,res)=>{
    const {title,content}= res.body;
    const blog=await blog.findByIdAndUpdate(
        req.params.id, //k ko according/k ko basis maa
        {title,content}, //k update garni
        {new:true,runValidators: true }
    );
    if(!blog){
        return res.status(404).json({
        message: "blog not found"
      });
    }
    res.status(200).json({
      message: "Note updated successfully",
      blog
    });
}


//delete the blogs
 const deleteblog= async (req,res)=>{
    const blog = await blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "blog not found"
      });
    }
    res.status(200).json({
      message: "blog deleted successfully"
    });
 }

module.exports = { createblog, readblog,updateblog,deleteblog}
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

module.exports = { createblog }
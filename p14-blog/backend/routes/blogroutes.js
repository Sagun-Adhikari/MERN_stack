const express = require('express')
const router = express.Router()

const { createblog, readblog,updateblog,deleteblog}= require('../controllers/blogcontroller')

//create blog route
router.post("/", createblog)
router.get("/", readblog)
router.put("/:id", updateblog)
router.delete("/:id", deleteblog)


module.exports = router;
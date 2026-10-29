const express = require('express')
const router = express.Router()

const { createblog } = require('../controllers/blogcontroller')

//create blog route
router.post("/", createblog)

module.exports = router;
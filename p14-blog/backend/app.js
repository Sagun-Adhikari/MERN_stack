const express = require('express');
const cors = require('cors');
const blogroutes = require('./routes/blogroutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogroutes);

module.exports = app;
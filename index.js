const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const PORT = process.env.PORT || 3001

// configurations
require('dotenv').config();
app.use(express.json())
app.use(cors());

// mongoose connection to DB
mongoose.connect(process.env.MONGO_URI)

// Routes
app.use('/users', userRoutes)

// Running server
app.listen(PORT, () => {
    console.log(`Server running in port: http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./src/models/userModel')
const XLSX = require('xlsx');
const userRoutes = require('./src/routes/userRoutes');


const PORT = 3001

require('dotenv').config();
app.use(express.json())
app.use(cors());
app.use(express.static('assets'));

mongoose.connect(process.env.MONGO_URI)

app.use('/users', userRoutes)
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.post('/excel', (req, res) => {
//     const workbook = XLSX.readFile('./assets/data.xlsx');
//     const sheet_name = workbook.SheetNames[0];
//     const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);
//     res.json(sheet_data);
// });

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
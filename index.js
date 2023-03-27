const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./src/models/Users')
const XLSX = require('xlsx');

app.use(express.json())
app.use(cors());
app.use(express.static('assets'));


const port = 3001

mongoose.connect("mongodb+srv://eduardogrq:Tuyyosomos1mismo@crud.t9c1tvi.mongodb.net/keyence?retryWrites=true&w=majority")

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/excel', (req, res) => {
    const workbook = XLSX.readFile('./assets/data.xlsx');
    const sheet_name = workbook.SheetNames[0];
    const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);
    res.json(sheet_data);
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
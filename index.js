const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/Users')

app.use(express.json())
app.use(cors());

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

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
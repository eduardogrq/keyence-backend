const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json())
app.use(cors());

const port = 3001

mongoose.connect("mongodb+srv://eduardogrq:Tuyyosomos1mismo@crud.t9c1tvi.mongodb.net/?retryWrites=true&w=majority")

app.get('/getData', (req, res) => {
    res.json("Hello")
})

app.post('/getData', (req, res) => {
    const myUser = req.body;
    res.json(myUser);
  });
  
  app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });
let ScoreMarkModel = require('./models');
const mongoose = require('mongoose');
const dbConfig = require('./database');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Node server started succesfully at port: ' + port));

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: ['https://ceryt0.vercel.app'],
  methods: ['POST', 'GET'],
  credentials: true
}));

app.get('/', (req, res) => {
  console.log('GET request received at root');
  console.log(dbConfig);
  res.send('Server OK, running at PORT: ' + port);
})

app.get('/scoremarks', async (req, res) => {
  console.log('GET request received at /scoremarks');
  const scoremarks = await ScoreMarkModel.find().sort({score: -1});
  res
    .status(200)
    .send(scoremarks);
})

app.post('/add-scoremark', async (req, res) => {
  console.log('POST request received at /addscoremark');
  let newScore = new ScoreMarkModel({
    name: req.body.name,
    score: req.body.score
  });
  newScore.save();
  res
    .status(200)
    .send(newScore)
})


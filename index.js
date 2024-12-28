const mongoose = require('mongoose');
const dbConfig = require('./database');
const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

let ScoreMarkModel = require('./models');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose 
      .connect(MONGO_URL)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
        console.log(err)
      });
    }
}

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


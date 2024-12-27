const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

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

module.exports = new Database();
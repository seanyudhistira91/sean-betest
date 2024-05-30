// App.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.loadMiddlewares();
    this.loadRoutes();
    this.connectDatabase();

  }

  loadMiddlewares() {
    this.app.use(express.json());
  }

  loadRoutes() {
    this.app.use('/', require('./routes'));
  }

  async connectDatabase() {
    await connectDB();
  }



  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

module.exports = App;

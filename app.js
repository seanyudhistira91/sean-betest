require('dotenv').config();
const App = require('./application');

const appInstance = new App();
appInstance.start();

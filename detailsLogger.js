const config = require('config')

const stinker = (req, res, next) => {
  // Configuration - export NODE_ENV=development/production/etc
  console.log("Application Name: " + config.get("name"));
  console.log("Mail Server: " + config.get("mail.host"));
  console.log("Mail Password: " + config.get("mail.password")); // from custom-environment-variables.json | set in CLI `export app_password=1234`
  next();
};

module.exports = stinker;

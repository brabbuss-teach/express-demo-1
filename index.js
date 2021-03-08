// require('debug') calls a fxn w/takes an arg => require('debug')(arg)
// that arg is an arbitrary namespace for debugging
const debug = require("debug")("app:startup");
const morgan = require("morgan"); // https://expressjs.com/en/resources/middleware/morgan.html
const helmet = require("helmet"); // https://github.com/helmetjs/helmet
const courses = require('./courses/courses')
const home = require('./home/home')
const express = require("express");
const app = express(); // naming convention // access to app.get(), put, post, and delete

// https://expressjs.com/en/resources/middleware.html
// used in the middle of a req/res cycle
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // allows form with keys
app.use(express.static("public")); // direct to folder: css, images, other static assets - http://localhost:3000/readme.txt
app.use(helmet());
app.use('/api/courses', courses)
app.use('/', home)

app.set('view engine', 'pug')
app.set('views', './views') //by default folder name

// Selective middleware based on ENV
if (app.get("env") === "development") {
  app.use(morgan("tiny")); //ex GET /api/courses 200 79 - 3.975 ms | can be added to log file | may want to not have for prod, clogs mware pipeline
  debug("Morgan enabled...");
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

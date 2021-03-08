const express = require("express");
const router = express.Router(); // for this module, we use Router() instead of express alone - that belongs to index.js

router.get("/", (req, res) => {
  res.render('index',{title:"Express Demo App", message: "Hello World"})
});

module.exports = router;

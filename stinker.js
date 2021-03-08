const stinker = (req, res, next) => {
  console.log("Stinking...");
  next();
};

module.exports = stinker;

const Joi = require("joi");
const express = require("express");
const router = express.Router(); // for this module, we use Router() instead of express alone - that belongs to index.js

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with given ID not found"); // 404
  res.send(course);
});

router.post("/", (req, res) => {
  // validate
  const { error } = validateCourse(req.body);
  // if invalid, 400 - bad request
  if (error) return res.status(400).send(error.details[0].message); // there is an array of errors - work through one at a time with this method

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // look up course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if na = 404
  if (!course)
    return res.status(404).send("The course with given ID not found"); // 404

  // validate
  const { error } = validateCourse(req.body);
  // if invalid, 400 - bad request
  if (error) return res.status(400).send(error.details[0].message); // there is an array of errors - work through one at a time with this method

  // update course
  course.name = req.body.name;
  // return updated course
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID not found"); // 404

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const validateCourse = course => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

module.exports = router;
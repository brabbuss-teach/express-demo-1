const Joi = require('joi');
const express = require("express");
const app = express(); // naming convention
// access to app.get(), put, post, and delete

app.use(express.json())

const courses = [
  {id:1, name: 'course1'},
  {id:2, name: 'course2'},
  {id:3, name: 'course3'},
]

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('The course with given ID not found')// 404
  res.send(course)
})

app.post('/api/courses', (req, res) => {
  // validate
  const {error} = validateCourse(req.body)
  // if invalid, 400 - bad request
  if (error) return res.status(400).send(error.details[0].message) // there is an array of errors - work through one at a time with this method 

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req,res) => {
  // look up course
  const course = courses.find(c => c.id === parseInt(req.params.id))
  // if na = 404
  if (!course) return res.status(404).send('The course with given ID not found')// 404

  
  // validate
  const {error} = validateCourse(req.body)
  // if invalid, 400 - bad request
  if (error) return res.status(400).send(error.details[0].message) // there is an array of errors - work through one at a time with this method

  // update course
  course.name = req.body.name
  // return updated course
  res.send(course)
})

app.delete('/api/courses/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id))
   if (!course) return res.status(404).send('The course with given ID not found')// 404

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
})

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })
  return schema.validate(course);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

/* The API controller
   Exports 3 methods:
   * postUser - Creates a new user
   * addCar - Adds car to the car lot of given user
   * list - Returns a list of all users
   * show - Displayes a user and its car lot
 */

'use strict'
let pageInfo = require('../models/html/page-index')
let User = require('../models/db/models').user
let Car = require('../models/db/models').car

exports.getHome = (req, res) => {
  let info = pageInfo.homePage
  res.render('home', info)
}

exports.getUser = (req, res) =>{
  let info = pageInfo.register
  res.render('register', info)
}

exports.postUser = (req, res) => {
  new User({
      name: req.body.name,
      username: req.body.username
    })
    .save()
    .catch(console.error)
    .then(console.log)
  
  let info = pageInfo.register
  info.message = `Thank you for registering`
  res.render('home', info)
}

exports.listUsers = (req, res) => {
  User
    .find()
    .then((result) => {
      let info = pageInfo.listUsers
      info.users = result
      res.render('list-users', info)
    })
}

exports.displayUser = (req, res) => {
  let user = req.params.username
  User
    .findOne({ username: user })
    .populate('cars')
    .then((result) => {
      let info = pageInfo.displayUser
      info.user = result
      res.render('display-user', info)
  })
}

exports.postCar = (req, res) => {
  let user = req.params.username
  User
    .findOne({ username: user })
    .catch(console.error)
    .then((user) => {
      let car = new Car({
          _owner: user.username,
          make: req.body.make,
          model: req.body.model,
          description: req.body.description,
          year: req.body.year
        })
          .save()
          .catch(console.error)
          .then((car => {
            user
              .cars
              .push(car)
            user
              .save()
              .catch(console.error)
              .then(res.redirect('back'))
          }))
    })
}

exports.listCars = (req, res) => {
  Car
    .find()
    .then((result) => {
      let info = pageInfo.listCars
      info.cars = result
      res.render('list-cars', info)
    })
}

exports.displayCar = (req, res) => {
  let car = req.params.car
  Car
    .findOne({_id: car})
    .then((result) => {
      let info = pageInfo.displayCar
      info.car = result
      res.render('display-car', info)
    })
}

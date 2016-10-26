'use strict'
let menuItems = require('./menu').menuItems

module.exports = {
  homePage: { title: 'Home', menuItems, message: 'Welcome to expressjs-pug demo app' },
  register: { title: 'Register user', menuItems },
  listUsers: { title: 'View users', menuItems},
  displayUser: { title: 'View user information', menuItems},
  listCars: { title: 'View cars', menuItems},
  displayCar: { title: 'View car information', menuItems}
}
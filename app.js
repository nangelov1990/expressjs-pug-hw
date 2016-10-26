'use strict'
let express = require('express')
let bodyParser = require('body-parser')

let mongoose = require('mongoose')
mongoose.Promise = global.Promise

let dbName = 'expressjs-pug-db'
let connection = 'mongodb://localhost:27017/' + dbName
mongoose.connect(connection)

const port = 2993

let app = express()
app.set('view engine', 'pug')
app.set('views', 'views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

let api = require('./controllers/api.js')
app.get('/', api.getHome)
app.get('/register', api.getUser)
app.post('/register', api.postUser)
app.get('/users', api.listUsers)
app.get('/users/:username', api.displayUser)
app.post('/users/:username/car', api.postCar)
app.get('/cars', api.listCars)
app.get('/cars/:car', api.displayCar)

app.listen(port)

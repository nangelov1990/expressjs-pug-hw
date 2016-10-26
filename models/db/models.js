'use strict'
let mongoose = require('mongoose')
  ,Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId

let userSchema = new Schema({
  userId: ObjectId,
  name: String,
  username: String,
  cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }]
})

let carSchema = new Schema({
  _owner: { type: String, ref: 'User' },
  make: String,
  model: String,
  description: String,
  year: String
})

module.exports.car = mongoose.model('Car', carSchema)
module.exports.user = mongoose.model('User', userSchema)

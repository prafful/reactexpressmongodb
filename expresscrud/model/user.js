var mongoose = require('mongoose')

var mongoSchema = mongoose.Schema

var userSchema = new mongoSchema({
    "name": String,
    "location":String
})

module.exports = mongoose.model('friends', userSchema)
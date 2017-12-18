'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema ({
	user : String,
	pass : String
})


module.exports = mongoose.model('User', UserSchema)
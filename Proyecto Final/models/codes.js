'use strict'

// Se incluyen las directivas y librerías
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Se define el esquema de datos que se guardará en la base de datos
const CodeSchema = Schema ({
	fecha : String,
	lenguaje : String,
	titulo : String,
	descripcion : String,
	link : String,
	disponible : Boolean
})

// Se exporta el módulo para poder llamarlo desde server.js
module.exports = mongoose.model('Code', CodeSchema)
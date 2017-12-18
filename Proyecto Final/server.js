/*____________________________
    Archivo que contiene la configuración de la REST API

*/


// Se incluyen las directivas
const express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    path = require('path'),
    mongoose = require('mongoose')

const port = process.env.PORT || 3000

// Al no ser una libería instalada por npm -i, hay que indicar la ruta
const Code =  require ('./models/codes')
const User = require ('./models/user')

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())

var router = express.Router()
/*
router.get('/', function(req, res) {  
   res.send("Hello World!")
});
====================================
app.get('/', (req,res) => {
    res.send({ message: 'Hello World!'})
})
*/

// Configuración de la ruta de la aplicación (html, css, angular, javascript)
app.use(express.static(__dirname + '/public'));


// Devuelve todos los códigos de la base de datos
app.get('/api/codes', (req,res) => {
    Code.find({}, (err,codes) => {
        console.log(codes)
        // Si se produce un error
        if(err) return res.status(500).send({message : `Error al realizar la petición ${err}`})

        // Si el array de productos está indefinido (vacío)
        if(!codes) return res.status(404).send({message : `No existen códigos.` })

        // Si tiene éxito
        res.status(200).send({codes})
    })
})


// Devuelve el usuario de la base de datos
app.get('/api/user', (req,res) => {
    User.find({}, (err,users) => {
        // Si se produce un error al relizar la llamada HTTP
        if(err) return res.status(500).send({message : `Error al realizar la petición ${err}`})

        // Si el array de usuarios está indefinido (vacío)
        if(!users) return res.status(404).send({message : `No existen usuarios.`})

        // Si tiene éxito
        res.status(200).send({users})
    })
})


app.post('/api/addCode', (req,res) => {
    /* Imprime por la consola (linea de comandos) los datos mandados en el body del post (con Postman o fiddler para hacer pruebas)
    console.log('POST /api/code')
    console.log(req.body)
    */

    // Creamos un objeto de tipo codigo, el cual se guardará en la base de datos. Pero antes hay que definir todos sus campos (Que se pasarán en el cuerpo del POST)
    let code = new Code ()
    code.fecha = req.body.fecha
    code.lenguaje = req.body.lenguaje
    code.titulo = req.body.titulo
    code.descripcion = req.body.descripcion
    code.link = req.body.link
    code.disponible = false

    // Se guardan los datos para almacenarlo en la base de datos
    code.save((err,codeStored) => {
        // Si se produce algún error mientras intentamos guardar el producto, mandamos un mensaje de error 500 (fallo del servidor) y un mensaje
        if(err) res.status(500).send({message : `Error al guardar el código en la Base de Datos: ${err}`})

        // Si el producto se guarda correctamente
        res.status(200).send({message : codeStored})
    })
})


// Actualiza un producto
app.put('/api/code/:codeId', (req,res) => {
    let codeId = req.params.codeId
    // Almacena los campos que queremos actualizar
    let update = req.body
    console.log(update)

    Code.findByIdAndUpdate(codeId, {disponible: true}, (err,codeUpd) => {
        // Si se produce un error al actualizar el producto
        if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

        //
        res.status(200).send({ code: codeUpd })
    })
})

// Elimina un elemento de la base de datos
app.delete('/api/code/:codeId', (req, res) => {
    let codeId = req.params.codeId

    Code.findById(codeId, (err, code) => {
        // Si existe un error
        if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

        // Si existe un error al borrar el producto
        code.remove( err => {
            if(err) res.status(500).send({ message: `Error al borrar el código: ${err} `})
            res.status(200).send({message: `El código ha sido eliminado`})
        })

        // Si tiene éxito al borrar el producto

        })

    })


app.use(router)

// app.listen(3000, function() { console.log("Node server runing on http://localhost:3000")});
// ECMA Script 6 permite llamar a una variable por medio de ${nombreVariable} dentro de un string, siempre y cuando ese String vaya comprendido entre comillas inversas ` ` 

// Conexión de mongoose con la base de datos "shop"
mongoose.connect('mongodb://localhost:27017/wikicode', (err, res) => {
    // Si existe un error en la conexión, se muestra un mensaje por consola y el callback del error
    if(err) console.log(`Error al conectar a la Base de Datos: ${err}`)
    // Si no se produce ningún error, se muestra un mensaje confirmando la conexión
    console.log('Conexión a la Base de Datos establecida...')

    // Se define en qué puerto escuchará las llamadas la API
    app.listen(port, () => {  
        // Si el servidor se inicia correctamente, se muestra un mensaje confirmando la conexión y el puerto en que está escuchando.
        console.log(`Node server running on http://localhost:${port}`)
    })
} )
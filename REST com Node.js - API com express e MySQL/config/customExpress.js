//importa pacotes
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

//exporta função
module.exports = () => {
    //cria variável app
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    //importa controllers
    consign()
        .include('controllers')
        .into(app)

    return app
}
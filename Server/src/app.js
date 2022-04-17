const path = require('path');
const api = require('./api.js');
// const apimessages = require('./apimessages.js');


// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// importer le paquet express
express = require('express');
// cree une application express
const app = express()
const cors = require("cors")
app.use(cors()) 
api_1 = require("./api.js");
// api_2 = require("./apimessages.js");
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks"
}));

// app.use('/apimessages', apimessages.default());
app.use('/api', api.default());

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;


const express = require("express")

const app = express()
debugger
const routes = require('./routes.js')


// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// On ouvre une connexion à notre base de données

routes.implement(app);


  app.listen(3000,() => console.log("Awaiting requests."))

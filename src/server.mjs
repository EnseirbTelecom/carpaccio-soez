import express from 'express'
import bodyParser from "body-parser"
import {implement} from './routes'

const app = express()




// Express middleware to parse requests' body

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// On ouvre une connexion à notre base de données

  implement(app);


  app.listen(3000,() => console.log("Awaiting requests."))

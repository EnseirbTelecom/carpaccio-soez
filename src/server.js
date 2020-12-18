import 'express-async-errors'
import express from 'express'
import bodyParser from 'body-parser'
import BillModule from './bill/bill.module'
import DefaultModule from './default/default.module'
import { invalidRequestErrorHandler } from './common/validation'

const modules = [BillModule, DefaultModule]

const app = express()

// Express middleware to parse requests' body

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

let module
for (module of modules) {
  if (module.implement !== undefined) {
    module.implement(app)
  }
}

app.use(invalidRequestErrorHandler)

app.listen(3000, () => console.log('Awaiting requests.'))

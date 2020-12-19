import { FetchError } from 'node-fetch'

export function throwInvalidArgumentError () {
  throw new TypeError('invalid argument')
}

export function fetchErrorHandler (err, req, res, next) {
  if (err instanceof FetchError) {
    console.log(err.message)
    res.status(500).json({ error: 'Error while fetching data from a third party server: ' + err.message })
  } else {
    next(err)
  }
}

export function serverErrorHandler (err, req, res, next) {
  console.log(err.message)
  res.status(500).json({ error: 'Internal Server Error' })
}

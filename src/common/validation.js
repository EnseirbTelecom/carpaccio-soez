// ----validators / transformers----

/**
 * An example of validator, that check that value is 1
 * A validator does not change the value field, when a transformer does
 * in this case if :
 *  return {valid: true, value: 1 }
 * was replaced by
 *  return {valid: true, value: 2 }
 * this function would be a transformer
 * Note that validators can also not specify value, therefore :
 *  return {valid: true}
 * is a valid validator
 * @param {*} value the value to be validated
 * @param {string} name the name to use to designate the value (for message)
 * @returns {object} if validation successfull {valid: true, value: transformedValue or undefined}
 *                   if didn't pass validation {valid: false , message: string explaining the validation }
 */
export function validatorExample (value, name = 'value') {
  if (value === 1) {
    return { valid: true, value: 1 }
  } else {
    return { valid: false, message: `${name} should be 1` }
  }
}
// NOTE this function is only exported to silence standardJS about the fact that it is unused

/**
 * transormer that parses JSON into an object
 * @param {*} value JSON Parseable
 * @param {string} name
 * @see validatorExample
 */
export function jsonParse (value, name = 'value') {
  try {
    const obj = JSON.parse(value)
    return { valid: true, value: obj }
  } catch (error) {
    return { valid: false, message: `${name} couldn't be JSON parsed` }
  }
}

/**
 * validator that verify that value is an Array
 * @param {*} value
 * @param {string} name
 * @see validatorExample
 */
export function isArray (value, name = 'value') {
  if (Array.isArray(value)) {
    return { valid: true }
  } else {
    return { valid: false, message: `${name} couldn't be understood as an Array` }
  }
}

/**
 * function that builds a validator/transformer that will apply validator on every element of value
 * (given that value is iterable)
 * @param {function} validator a validator function @see validatorExample
 * @returns {function} a validator function @see validatorExample
 */
export function forEach (validator) {
  return (value, name = 'value') => {
    const newValue = []
    let result
    for (const el of value) {
      result = validator(el, 'a ' + name + ' element')
      if (!result.valid) {
        return result
      };
      if (!(result.value === undefined)) {
        newValue.push(result.value)
      }
    }
    return { valid: true, value: (newValue.length > 0) ? newValue : undefined }
  }
}

/**
 * function that builds a validator that will check that value is longer than minLen
 * @param {number} minLen the minimum length (not strict) that the returned validator will accept
 * @returns {function} the validator function @see validatorExample
 */
export function minLength (minLen) {
  return (value, name = 'value') => {
    if (value.length && value.length >= minLen) {
      return { valid: true }
    } else {
      return {
        valid: false,
        message: `${name} should be longer than ${minLen - 1}`
      }
    }
  }
}

/**
 * a transformer that will try to cast the object to number (fail on NaN)
 * @param {*} value value to be casted to number
 * @param {*} name
 * @see validatorExample
 */
export function toNumber (value, name = 'value') {
  const valueNumber = Number(value)
  if (Number.isNaN(valueNumber)) {
    return {
      valid: false,
      message: `${name} must be a number`
    }
  } else {
    return {
      valid: true,
      value: valueNumber
    }
  }
}

/**
 * function that builds a validator that will check that value is higher than minValue
 * @param {number} minValue the minimum value that the returned validator will accept
 * @param {number} mode tells if the comparison will be strict or not, 'equal' -> not strict, any other value -> 'strict'
 * @returns {function} the validator function @see validatorExample
 */
export function minimum (minValue, mode = 'strict') {
  const isStrict = (mode === 'strict')
  return (value, name = 'value') => {
    const cond = (isStrict) ? value > minValue : value >= minValue
    const equalText = (!isStrict) ? 'or equal to ' : ''
    if (cond) {
      return { valid: true }
    } else {
      return {
        valid: false,
        message: `${name} must be higher than ${equalText}${minValue}`
      }
    }
  }
}

/**
 * function that builds a validator that will check that value is lower than maxValue
 * @param {number} maxValue the maximum value that the returned validator will accept
 * @param {number} mode tells if the comparison will be strict or not, 'equal' -> not strict, any other value -> 'strict'
 * @returns {function} the validator function @see validatorExample
 */
export function maximum (maxValue, mode = 'strict') {
  const isStrict = (mode === 'strict')
  return (value, name = 'value') => {
    const cond = (isStrict) ? value < maxValue : value <= maxValue
    const equalText = (!isStrict) ? 'or equal to ' : ''
    if (cond) {
      return { valid: true }
    } else {
      return {
        valid: false,
        message: `${name} must be lower than ${equalText}${maxValue}`
      }
    }
  }
}

/**
 * a validator that will check that the value is an integer
 * @param {*} value
 * @param {*} name
 * @see validatorExample
 */
export function isInt (value, name = 'value') {
  if (typeof value === 'number' && Number.isInteger(value)) {
    return { valid: true }
  } else {
    return {
      valid: false,
      message: `${name} must be an integer`
    }
  }
}

/**
 * function that builds a validator that will perfom sequentialy the validators/transformers
 * contained in 'validators'. If one of this validations fails, the returned validator
 * stop and return the result of the failing validation
 * @param {*} validators the validators/transformers that will be applied sequentially by returned validator
 * @returns {function} the validator function @see validatorExample
 */
export function chainValidator (validators) {
  return (value, name = 'value') => {
    let result
    for (const validator of validators) {
      result = validator(value, name)
      if (!result.valid) {
        return result
      };
      if (!(result.value === undefined)) {
        value = result.value
      }
    }
  }
}

/**
 * function that builds a validator/transformer following the schema given by a dto
 * a dto is an object that has same fields that the object to be validated
 * this fields should be objects with the attribute 'validators' containing
 * the array of validators to be perfomed on the associated field.
 * This objects can also have the field 'optional': true, that way if the field
 * is absent from the object to be validated then the returned validator will simply
 * skip the validation of this field (ie: a field with this 'optional' flag passes
 * when associated data is missing)
 * @param {*} DTO
 * @returns {function} the validator/transformer function @see validatorExample
 */
export function validateDTO (DTO) {
  return (value, name = 'value') => validateDTOaux(DTO, value, name + '.')
}

function validateDTOaux (DTO, data, name = '') {
  let value
  let result
  const newData = {}
  const prefixTofield = name + '.'
  for (const field in DTO) {
    if (data[field] === undefined) {
      if (DTO[field].optional) {
        continue
      } else {
        return {
          valid: false,
          message: `${prefixTofield + field} is required`
        }
      }
    }
    value = data[field]
    result = chainValidator(DTO[field].validators)(value, prefixTofield + field)
    if (!result.valid) {
      return result
    };
    newData[field] = value
  }
  return { valid: true, value: newData }
}

// ---- utilities ----

/**
 * A custom error type that will be raised by assertValid
 */
export class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Raise an error if validationResult is invalid
 * else returns the validationResult's value
 * @param {*} validationResult the result of validator/transformer @see validatorExample
 */
export function assertValid (validationResult) {
  if (!validationResult.valid) {
    throw new ValidationError(validationResult.message)
  } else {
    return validationResult.value
  }
}

/**
 * An error handler for express that catch only ValidationErrors
 * if ValidationError is catched the response is sent with error code 400
 * (bad request) with the message associated with the error
 * @param {*} err error
 * @param {*} req request
 * @param {*} res response
 * @param {*} next fucntion that call next errorHandler/
 */
export function invalidRequestErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message })
  } else {
    next(err)
  }
}

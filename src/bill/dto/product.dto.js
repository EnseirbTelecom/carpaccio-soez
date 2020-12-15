import { minimum, toNumber, isInt, jsonParse, forEach, minLength, isArray } from '../../common/validation'

export const ProductDTO = {

  prices: {
    validators: [
      jsonParse,
      isArray,
      minLength(1),
      forEach(toNumber),
      forEach(minimum(0))
    ]
  },

  quantities: {
    validators: [
      jsonParse,
      isArray,
      minLength(1),
      forEach(toNumber),
      forEach(minimum(0, 'strict')),
      forEach(isInt)
    ]
  }
}

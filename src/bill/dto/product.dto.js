import { minimum, toNumber, isInt, jsonParse, forEach, minLength, isArray, isIn } from '../../common/validation'
import country from '../../country/country.module'
import discount from '../../discount/discount.module'

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
  },

  country: {
    validators: [
      isIn(country.service.countryCodes)
    ]
  },

  discount: {
    validators: [
      isIn(discount.service.discountNames)
    ],
    optional: true
  },

  currency: {
    validators: [
      isIn(country.service.currencyCodeList)
    ],
    optional: true
  }
}

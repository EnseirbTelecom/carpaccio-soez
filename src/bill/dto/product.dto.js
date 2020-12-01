import { minimum, toNumber, isInt, jsonParse, forEach, minLength, isArray}  from '../../common/validation'


export let ProductDTO = {

  prices : { 
    validators : [
      jsonParse,
      isArray,
      minLength(1), 
      forEach(toNumber), 
      forEach(minimum(0,'strict'))
    ]
  },

  quantities : {
    validators : [
      jsonParse,
      isArray,
      minLength(1),
      forEach(toNumber),
      forEach(minimum(0)),
      forEach(isInt)
    ]
  }
}
import { minimum, toNumber, isInt}  from '../validation'


export let ProductDTO = {

  prices : { 
    validators : [toNumber, minimum(0,'strict')]
  },

  quantities : {
    validators : [toNumber, minimum(0), isInt]
  }
}
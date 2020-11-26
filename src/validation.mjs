export function jsonParse(value, name){
  try {
    const obj = JSON.parse(value);
    return {valid: true, value:obj}
  }catch (error){
    return {valid: false, message: `${name} couldn't be JSON parsed`}
  }
}
export function isArray(value,name){
  if (Array.isArray(value)){
    return {valid: true, value:value}
  } else {
    return {valid: false, message: `${name} couldn't be understood as an Array`}
  }
}

export function forEach(validator){
  return (value, name) =>{
    let newValue = [];
    let  result;
    for (let el of value){
      result = validator(el,"a "+ name + " element");
      if (!result.valid){
        return result;
      };
      if ( !(result.value===undefined) ){
        newValue.push(result.value);
      }
    }
    return {valid : true, value : (newValue.length > 0)? newValue : undefined}
  }
}
export function minLength(minLen){
  return (value, name)=> {
    if (value.length && value.length >= minLen){
      return { valid: true }
    } else {
      return {
        valid : false,
        message : `${name} should be longer than ${minLen-1}`
      }
    }
  }
}


export function toNumber(value, name){
  const valueNumber = Number(value);
  if (Number.isNaN(valueNumber)){
    return {
      valid : false,
      message : `${name} must be a number`
    }
  } else {
    return {
      valid : true,
      value : valueNumber
    }
  }
}
export function minimum(minValue, mode = "equal"){
  return (value, name)=> {
    const cond =  (mode=="equal")? value >= minValue : value > minValue;
    const equalText =  (mode=="equal")? "or equal to " : "";
    if (cond){
      return { valid: true }
    } else {
      return {
        valid : false,
        message : `${name} must be higher than ${equalText}${minValue}`
      }
    }
  }
}
export function maximum(maxValue, mode = "equal"){
  return (value, name)=> {
    const cond =  (mode=="equal")? value <= maxValue : value < maxValue;
    const equalText =  (mode=="equal")? "or equal to " : "";
    if (cond){
      return { valid: true }
    } else {
      return {
        valid : false,
        message : `${name} must be lower than ${equalText}${maxValue}`
      }
    }
  }
}

export function isInt(value, name){
  if (typeof value === "number" && Number.isInteger(value)){
    return { valid: true }
  } else {
    return {
      valid : false,
      message : `${name} must be an integer`
    }
  }
}
export function validateNested(DTO){
  return (value,name) => validate(DTO, value, name+" > ")
}

export function validate(DTO, data, prefixToFields = ""){
  let value;
  let result;
  let newData = {};
  for (let field in DTO){
    if (data[field] === undefined){
      if (DTO[field]['optional']){
        continue;
      } else {
        return {
          valid : false,
          message : `${prefixToFields+field} is required`
        };
      }
    }
    value = data[field];
    for (let validator of DTO[field].validators){
      result = validator(value, prefixToFields+field);
      if (!result.valid){
        return result;
      };
      if ( !(result.value===undefined) ){
        value = result.value;
      }
    }
    newData[field] = value
  }
  return {valid : true, data : newData};
}
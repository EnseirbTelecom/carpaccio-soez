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

export function validate(DTO, data){
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
          message : `${field} is required`
        };
      }
    }
    value = data[field];
    for (let validator of DTO[field].validators){
      result = validator(value,field);
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
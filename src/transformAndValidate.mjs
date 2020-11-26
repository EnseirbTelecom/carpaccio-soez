async function validateAndConvert(classToConvert, fields) {
  const result = new ValidationResult();
  result.data = plainToClass(classToConvert, fields);
  await validate(result.data).then(errors => {
      // errors is an array of validation errors
      if (errors.length > 0) {
          let errorTexts = Array();
          for (const errorItem of errors) {
              errorTexts = errorTexts.concat(errorItem.constraints);
          }
          result.error = errorTexts;
          return result;
      }
  });
  return result;
}



const esmImport = require('esm')(module,{mode:"all"});

const validationFunc = esmImport('../src/common/validation')
//const { ValidationError } = esmImport('../src/common/validation');



// Test of Validator isArray

test('Test if input is an Array', () => {
    expect(validationFunc.isArray([ 0 , 1]).valid).toBe(true)
})

test('Test if input an Array', () => {
    expect(validationFunc.isArray("string").valid).toBe(false)
})

// Test of transformer toNumber

test('Test if output is a number ',() => {
    expect(validationFunc.toNumber('2').valid).toBe(true)
    expect(validationFunc.toNumber('2').value).toBe(2)
    expect(typeof(validationFunc.toNumber('2').value)).toBe('number')
})

test('Test if output is a number ',() => {
    expect(validationFunc.toNumber('foo').valid).toBe(false)
    expect(typeof(validationFunc.toNumber('foo').value)).toBe('undefined')
})

  test('Test if output is a number ',() => {
    expect(validationFunc.toNumber('100').valid).toBe(true)
    expect(validationFunc.toNumber('100').value).toBe(100)
    expect(typeof(validationFunc.toNumber('100').value)).toBe('number')

})

// Test of validator isInt

test('Test if output is a int ',() => {
    expect(validationFunc.isInt(100).valid).toBe(true)
})

test('Test if output is a number ',() => {
    expect(validationFunc.isInt(1.1).valid).toBe(false)
})

test('Test if output is a number ',() => {
    expect(validationFunc.isInt('100').valid).toBe(false)
})

test('Test if output is a number ',() => {
    expect(validationFunc.isInt(-1).valid).toBe(true)
})



// Test of maximun, returns a validator function 

test('Test if maximum retruns a decorator',() => {
    expect(validationFunc.maximum(8)(1).valid).toBe(true)
})

test('Test if maximum retruns a decorator',() => {
    expect(validationFunc.maximum(8,'equal')(8).valid).toBe(true)
})

test('Test if maximum retruns a decorator',() => {
    expect(validationFunc.maximum(8)(8).valid).toBe(false)
})

test('Test if output is a function',() => {
    expect(validationFunc.maximum(8)(9).valid).toBe(false)
})


// Test of minimum, returns a validator function 

test('Test if minimun retruns a validator',() => {
    expect(validationFunc.minimum(1)(3).valid).toBe(true)
})

test('Test if minimun retruns a validator',() => {
    expect(validationFunc.minimum(8,'equal')(8).valid).toBe(true)
})

test('Test if minimun retruns a validator',() => {
    expect(validationFunc.minimum(8)(8).valid).toBe(false)
})

test('Test if minimun retruns a validator',() => {
    expect(validationFunc.minimum(9)(8).valid).toBe(false)
})


// Test of minLength, returns a validator function 

test('Test if minLength retruns a validator',() => {
    expect(validationFunc.minLength(1)('   ').valid).toBe(true)
})

test('Test if minLength retruns a validator',() => {
    expect(validationFunc.minLength(1)('').valid).toBe(false)
})

test('Test if minLength retruns a validator',() => {
    expect(validationFunc.minLength(2)([1]).valid).toBe(false)
})

test('Test if minLength retruns a validator',() => {
    expect(validationFunc.minLength(2)([1,2]).valid).toBe(true)
})

// Test of transformer jsonParse

test('Test if jsonParse retruns javascript obj',() => {
    expect(validationFunc.jsonParse('{ "name":"John", "age":30, "city":"New York"}').valid).toBe(true)
    expect(validationFunc.jsonParse('{ "name":"John", "age":30, "city":"New York"}').value)
    .toStrictEqual({ "name":"John", "age":30, "city":"New York"})
})

test('Test if jsonParse detects uncorrect json',() => {
    expect(validationFunc.jsonParse('"name":"John", "age":30, "city":"New York"}').valid).toBe(false)
})



// Test of ChainValidator

// Test of validateDTO

// Test of validateDTOaux

// Test of assertValid

/*  test('Test of assertValid',() => {
    expect( ()=>{
        validationFunc.assertValid({valid:false,message:"Erreur"})
    })
    .toThrowError("Erreur")
    })  */

// Test of invalidRequestErrorHandle
/* 
test('Test of invalidRequestErrorHandle',() => {
    expect(validationFunc.minLength(2)([1,2]).valid).toBe(true)
}) */
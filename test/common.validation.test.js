const esmImport = require('esm')(module);

const validationFunc = esmImport('../src/common/validation')

let fruits = [ 0 , 1]


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
    expect(validationFunc.toNumber('2').value instanceof Number ).toBe(true)
})

test('Test if output is a number ',() => {
    expect(validationFunc.toNumber('foo').valid).toBe(false)
    expect(validationFunc.toNumber('foo').value instanceof Number ).toBe(false)
})

test('Test if output is a number ',() => {
    expect(validationFunc.toNumber(' ').valid).toBe(true)
    expect(validationFunc.toNumber(' ').value instanceof Number ).toBe(false)
})

  test('Test if output is a number ',() => {
    expect(validationFunc.toNumber('100').valid).toBe(true)
    expect(validationFunc.toNumber('100').value instanceof Number ).toBe(false)
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



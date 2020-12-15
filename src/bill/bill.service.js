// function that throws a TypeError, with the message '{nameOfTheCallingFunction} : invalid argument'
const throwInvalidArgumentError = () => { throw new TypeError('invalid argument') }

class BillServiceClass {
  async totalPrice (bill) {
    let sum = 0
    this.assertHaveSameLength(bill.quantities)
    for (const k in bill.prices) {
      sum += await this.articleRawPrice(bill.quantities[k], bill.prices[k])
    }
    return sum
  }

  assertHaveSameLength (array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
      throwInvalidArgumentError()
    }
  }

  assertPriceValid (price) {
    if (price <= 0) {
      throwInvalidArgumentError()
    }
  }

  assertQuantityValid (quantity) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throwInvalidArgumentError()
    }
  }

  async articleRawPrice (number, price) {
    this.assertPriceValid(price)
    this.assertQuantityValid(number)
    return number * price
  }
}
export const BillService = new BillServiceClass()
export default BillService

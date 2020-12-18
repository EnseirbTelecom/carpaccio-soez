import { throwInvalidArgumentError } from '../common/utils'
import country from '../country/country.module'
import discount from '../discount/discount.module'

class BillServiceClass {
  async totalPrice (bill) {
    let sum = 0
    this.assertHaveSameLength(bill.quantities, bill.prices)
    for (const k in bill.prices) {
      sum += await this.articleRawPrice(bill.quantities[k], bill.prices[k])
    }
    const postTaxPrice = await country.service.applyTaxes(sum, bill.country)
    const postDiscountPrice = this.applyDiscount(postTaxPrice, bill.discount)
    return postDiscountPrice
  }

  applyDiscount (price, discountName) {
    if (discountName === undefined) {
      return price
    } else {
      return discount.service.applyDiscountByName(discountName, price)
    }
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

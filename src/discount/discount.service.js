import CONST from './discount.const'
import bill from '../bill/bill.module'
import { throwInvalidArgumentError } from '../common/utils'

class DiscountServiceClass {
  constructor () {
    this.discountFunctionNames = {
      NO_DISCOUNT: 'noDiscount',
      FLAT_DISCOUNT: 'flatDiscount',
      PROGRESSIVE_DISCOUNT: 'progressiveDiscount',
      FIXED_DISCOUNT: 'fixedDiscount'
    }
    this.discountNames = Object.keys(this.discountFunctionNames)
  }

  assertIsValidDiscountName (name) {
    if (!(name in this.discountFunctionNames)) {
      throwInvalidArgumentError()
    }
  }

  applyDiscountByName (name, price) {
    this.assertIsValidDiscountName(name)
    return this[this.discountFunctionNames[name]](price)
  }

  noDiscount (price) {
    bill.service.assertPriceValid(price)
    return price
  }

  flatDiscount (price) {
    bill.service.assertPriceValid(price)
    return price * (1 - CONST.FLAT_DISCOUNT)
  }

  /**
   * A function that gets the appropriate discount on a level like oject
   * @param {number} price
   * @param {Object} levelObject an object organised like so:
   *    'minimum price' : 'associated discount'
   */
  _getAppropriateDiscount (price, discountLevel) {
    let discount = 0
    for (const minAmount in discountLevel) {
      if (minAmount <= price) {
        discount = discountLevel[minAmount]
      } else {
        break
      }
    }
    return discount
  }

  fixedDiscount (price) {
    bill.service.assertPriceValid(price)
    return price - this._getAppropriateDiscount(price, CONST.FIXED_DISCOUNT)
  }

  progressiveDiscount (price) {
    bill.service.assertPriceValid(price)
    return price * (1 - this._getAppropriateDiscount(price, CONST.PROGRESSIVE_DISCOUNT))
  }
}
export const DiscountService = new DiscountServiceClass()
export default DiscountService

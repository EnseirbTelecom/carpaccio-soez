import taxesRates from './taxesRates.const'
import { throwInvalidArgumentError } from '../common/utils'
import bill from '../bill/bill.module'

class CountryServiceClass {
  constructor () {
    this.taxesRates = taxesRates
    this.countryCodes = Object.keys(taxesRates)
  }

  async applyTaxes (price, code) {
    bill.service.assertPriceValid(price)
    this.assertIsCountryCode(code)
    return price * (1 + taxesRates[code])
  }

  assertIsCountryCode (code) {
    if (!this.countryCodes.includes(code)) {
      throwInvalidArgumentError()
    }
  }
}
export const CountryService = new CountryServiceClass()
export default CountryService

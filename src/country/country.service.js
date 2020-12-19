import taxesRates from './taxesRates.const'
import { throwInvalidArgumentError } from '../common/utils'
import { currencyCodeList } from './currency.const'
import bill from '../bill/bill.module'
import fetch from 'node-fetch'

class ChangeRateHandler {
  constructor () {
    this.currentChangeRateDate = new Date(0)
  }

  async get (currency) {
    await this.refreshIfOutdated()
    return this.changeRates[currency]
  }

  async refreshIfOutdated () {
    if (this.isDataOutdated()) {
      await this.refresh()
    }
  }

  assertIsValidCurrencyCode (code) {
    if (!currencyCodeList.includes(code)) {
      throwInvalidArgumentError()
    }
  }

  isDataOutdated () {
    // ChangeRates are updated everyday
    return (new Date() - this.currentChangeRateDate) > 24 * 60 * 60 * 1000
  }

  async refresh () {
    const response = await fetch('https://api.exchangeratesapi.io/latest')
    const data = await response.json()
    const date = new Date(data.date)
    // Change Rates are updated at CET 16h00 = UTC 15h00
    date.setUTCHours(15)
    this.currentChangeRateDate = date
    this.changeRates = data.rates
  }
}

class CountryServiceClass {
  constructor () {
    this.taxesRates = taxesRates
    this.currencyCodeList = currencyCodeList
    this.changeRate = new ChangeRateHandler()
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

  async convertToCurrency (price, code) {
    bill.service.assertPriceValid(price)
    const rate = await this.changeRate.get(code)
    return rate * price
  }
}
export const CountryService = new CountryServiceClass()
export default CountryService

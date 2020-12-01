
class BillServiceClass {
  async totalPrice(bill){
    let sum = 0;
    this.assertHaveSameLength(bill.quantities);
    for (let k in bill.prices){
      sum += await this.articleRawPrice(bill.quantities[k], bill.prices[k]);
    }
    return sum;
  }

  assertHaveSameLength(array1, array2){
    if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length){
      throw new TypeError("Invalid argument");
    }
  }

  assertPriceValid(price){
    if (price <= 0){
      throw new TypeError("Invalid argument");
    }
  }

  assertQuantityValid(quantity){
    if (!Number.isInteger(quantity) || quantity<0){
      throw new TypeError("Invalid argument");
    }
  }

  async articleRawPrice(number, price){
    this.assertPriceValid(price);
    this.assertQuantityValid(number)
    return number*price;
  }
}
export const BillService = new BillServiceClass()
export default BillService;
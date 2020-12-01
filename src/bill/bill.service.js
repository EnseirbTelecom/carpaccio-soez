
export const BillService = {
  async totalPrice(bill){
    let sum = 0;
    if (bill.quantities.length != bill.prices.length){
      throw new TypeError("invalid argument");
    }
    for (let k in bill.prices){
      sum += await this.articleRawPrice(bill.quantities[k], bill.prices[k]);
    }
    return sum;
  },

  async articleRawPrice(number, price){
    return number*price;
  }
}
export default BillService;
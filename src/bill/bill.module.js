import { implement } from './bill.routes'
import BillService from './bill.service'
import { ProductDTO } from './dto/product.dto' 

const BillModule = {
  implement : implement,
  service : BillService,
  dto : {
    ProductDTO 
  } 
}
export default BillModule;

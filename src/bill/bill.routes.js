import { ProductDTO } from './dto/product.dto'
import { validate } from '../common/validation'
import { BillService } from './bill.service'

export function implement(app){
    
  app.post('/bill', async (req,res) => {
    try {
      const validationResult = await validate(ProductDTO, req.body);
      if (!validationResult.valid) {
          return res.status(400).json({error : validationResult.message});
      }
      const data = validationResult.data;
      if (data.quantities.length !== data.prices.length ){
        return res.status(400).json({error: "Quantities and prices should have the same length"});
      }
      const total = await BillService.totalPrice(data);
      return res.status(200).json({total});
    } catch (err) {
      return res.status(500).json(err.message);
    }
  })
}
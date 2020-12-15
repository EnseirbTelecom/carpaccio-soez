import { ProductDTO } from './dto/product.dto'
import { assertValid, validateDTO } from '../common/validation'
import { BillService } from './bill.service'

export function implement (app) {
  app.post('/bill', async function billRoute (req, res) {
    const data = assertValid(validateDTO(ProductDTO)(req.body))
    if (data.quantities.length !== data.prices.length) {
      return res.status(400).json({ error: 'Quantities and prices should have the same length' })
    }
    const total = BillService.totalPrice(data)
    return res.status(200).json({ total })
  })
}

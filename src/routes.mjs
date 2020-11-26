import {ProductDTO} from './dto/product.dto.mjs'
/* File that is in charge of implementing the routes to the app*/
import { validate } from './validation'

export function implement(app){
  app.get('/api',(req,res) => {
    return res.status(200).json({api : "it340-foo"});   
  })
  app.post('/bill', async (req,res) => {
    const validationResult = await validate(ProductDTO, req.body);
    if (!validationResult.valid) {
        return res.status(400).send(validationResult.message);
    }
    let data = validationResult.data;
    return res.status(200).json(data)
  }
  
  )
}


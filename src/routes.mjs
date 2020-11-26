//import {ProductDTO} from './dto/product.dto.mjs'
/* File that is in charge of implementing the routes to the app*/




export function implement(app){
  app.get('/api',(req,res) => {
    return res.status(200).json({api : "it340-foo"});   
  })
  app.post('/bill', async (req,res) => {
    // const conversionResult = await validateAndConvert(ProductDTO, req.body);
    // if (conversionResult.error) {
    //     res.status(400).send(conversionResult.error);
    // } else {
    //     res.json(conversionResult.data);
    // }

  }
  
  )
}


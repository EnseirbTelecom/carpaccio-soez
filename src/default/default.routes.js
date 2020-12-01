export function implement(app){
  app.get('/api',(req,res) => {
    return res.status(200).json({api : "it340-foo"});   
  })
}


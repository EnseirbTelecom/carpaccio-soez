export function implement (app) {
  app.get('/api', (req, res) => {
    return res.status(200).json({ id: 'it340-foo' })
  })
}

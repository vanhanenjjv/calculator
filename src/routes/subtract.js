import express from 'express'

const router = new express.Router()

router.post('/', (req, res) => {
  const { a, b } = req.body
  const result = a - b

  return res.json({ result })
})

export default router

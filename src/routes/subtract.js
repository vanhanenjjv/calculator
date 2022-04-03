import express from 'express'

const router = new express.Router()

router.post('/', (req, res) => {
  const { minuend, subtrahend } = req.body;
  const result = minuend - subtrahend

  return res.json({ result })
})

export default router

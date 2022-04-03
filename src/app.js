import express from 'express'

const PORT = 8080

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello, world!')
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

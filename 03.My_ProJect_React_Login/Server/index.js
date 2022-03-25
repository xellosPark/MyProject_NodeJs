const express = require('express')
const app = express()
const port = 5000

mongodb+srv://xellos:<password>@boilerplate.g1rjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
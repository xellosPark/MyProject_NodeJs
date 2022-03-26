const express = require('express')
const app = express()
const port = 5000

//MongoDB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://xellos:sv7788@boilerplate.g1rjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //6.0 이상에서 자동으로 설정
  //useCreateIndex: true,
  //useFindAndModify : false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
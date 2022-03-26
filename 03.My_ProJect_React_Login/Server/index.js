const express = require('express')
const app = express()
const port = 5000

// Db Schema 데이를 갖져 온다
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

//MongoDB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //6.0 이상에서 자동으로 설정
  //useCreateIndex: true,
  //useFindAndModify : false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~~안녕하세요 ~')
})

app.post('/register', (req, res)=>{
  // 회원 가입 할때 필요한 정보들을 Client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body)
  
  // MongoDb 
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
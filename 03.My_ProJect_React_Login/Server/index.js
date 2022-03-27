const express = require('express')
const app = express()
const port = 5000

// Db Schema 데이를 갖져 온다
const bodyParser = require("body-parser");

const config = require("./config/key");

const cookieParser = require("cookie-parser");

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post('/login', (req, res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  // Mogodb 제공하는 findOnd 함수
  User.findOne({ email: req.body.email }, (err, user) => {
    // 유저가 없는 경우
    console.log('test1');
    if(!user) {
      console.log('test2');
      return res.json({
        loginSuccess: false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    console.log('test3_1');
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log('err',err);
      console.log('isMatch', isMatch);
      if( !isMatch )
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
      console.log('test4');
        //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 토큰을 저정한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.toKen)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
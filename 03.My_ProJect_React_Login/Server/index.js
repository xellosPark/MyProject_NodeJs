const express = require('express')
const app = express()
const port = 5000

// Db Schema 데이를 갖져 온다
const bodyParser = require("body-parser")
const config = require("./config/key")
const cookieParser = require("cookie-parser")
const { auth } = require('./middleware/auth')
const { User } = require("./models/User")


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());


//MongoDB 연결
const mongoose = require('mongoose')
const res = require('express/lib/response')
const req = require('express/lib/request')
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

// 회원 가입
app.post('/api/users/register', (req, res)=>{
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

// 로그인
app.post('/api/users/login', (req, res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  // Mogodb 제공하는 findOnd 함수
  User.findOne({ email: req.body.email }, (err, user) => {
    // 유저가 없는 경우
    if(!user) {
      return res.json({
        loginSuccess: false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if( !isMatch )
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 토큰을 저정한다. 어디에? 쿠키, 로컬스토리지
        //console.log('user.toKen',user.toKen);
        res.cookie("x_auth", user.toKen)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

//Router 기능 (user, product, comment) <- Express 지원
// 1./api/user/login 2./api/product/create 3./api/product
// auth 미들웨어

app.get('/api/users/auth', auth, (err, user) => {
  // 여기 까지 미들웨어를 통과해 왔다는 애기는 Authentication(인증) 이 True 상태
  res.status(200).json({
    _id: req.user._id,
    // role 1 어디민 role 2 특정 부서 어드민
    // role 0 -> 일반유저 role 0이 아니면 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  console.log("err1");
  User.findOneAndUpdate({ _id: req.user._id},
    // auth 선언
    { toKen: "" }
    ,(err, user) => {
      if( err ) return res.json({ success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
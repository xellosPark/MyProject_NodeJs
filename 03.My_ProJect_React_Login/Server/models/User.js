const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { use } = require('express/lib/router');
const jwt = require('jsonwebtoken');
//10은 2^10번 round를 돌림을 의미
const saltRounds = 10;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    // 관리자 등급
    role: {
        type: Number,
        default: 0
    },
    image: String,
    // 유효성 체크
    token: {
        type: String
    },
    // 유효기간
    tokenExp: {
        type: Number
    }
})
// save 하기 전에 암호화 처리
userSchema.pre('save', function( next ){

    // 비밀번호를 암호화 시킨다.
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });
    
    // var user = this;
    let user = this;

    // 암호가 변경될때만 사용(isModified)
    // bcrypt 숫자를 hash  처리 함 
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
      next()
    }
})

// 함수 멤버 (입력된 패스워드, 콜백) 
userSchema.methods.comparePassword = function(PlainPassword, cb) {
    //PlainPassword 1234567 암회화된 비밀번호 "$2b$10$ndRQ5KOn3nEBXRo9pDvARu1o0HoC15ZYar7wKGxRoEDcd88vwteOO"
    bcrypt.compare(PlainPassword, this.password, function(err, isMatch) {
        // 비밀번호 틀린경우에 
        if(err) return cb(err)
        cb(null, isMatch)
        // 비밀번호 맞는경우 (isMatch : true)
        
    })
}
//token 생성하기 (cd 콜백)
userSchema.methods.generateToken = function(cb){
    let user = this;
    // console.log('user._id', user._id)
    // jsonwebtokend을 이용해서 token를 생성하기
    var token = jwt.sign(user._id.toHexString(),'secretToken')
    //user.id + 'secretToken' = token ->
    //'secretToken' -> user._id
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}
userSchema.statics.findByToken = function(token, cb){
    let user = this;
    //토큰을 decode 한다.
    //console.log('token', token);
    jwt.verify(token, 'secretToken', function(err,decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이어트에서 가져온 token과 db에 보관된 token이 일치하는지 확인
        //console.log('decoded', decoded);
        user.findOne({"id": decoded, "token": token},
        function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }
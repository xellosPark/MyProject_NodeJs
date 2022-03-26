const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { use } = require('express/lib/router');
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
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
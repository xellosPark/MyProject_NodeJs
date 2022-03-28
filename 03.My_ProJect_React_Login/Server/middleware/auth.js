const { User } = require("../models/User");

let auth = ( req, res, next ) => {
    // 인증 처리를 하는곳
    
    // cilet cookie에서 토큰을 가져온다.
    // 토큰을 복호화 한후에 유저를 찾는다.
    // req.cookies cookie지원 멤버
    //console.log("req",req);

    let token = req.cookies.x_auth;
    User.findByToken(token, (err, user) => {
        
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        //  index file에서 req.token, req.user 그대로 쓸수 있게
        req.token = token;
        req.user = user;
        next();
    })
    // 유저가 있으면 인증 OKay

    // 유저가 없으면 인증 NO !
    
}

module.exports = { auth };
const { User } = require('../models/User');

let auth = (req, res, next) => {

    let token = req.cookies.x_auth; //쿠키 값에서 token을 가져와서

    // 인증 처리를 하는 곳
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token; // token과 user를 넣어줌으로 인해서 
        req.user = user;
        next(); // next가 없으면 middle ware에 갖혀버림
    });

    // 클라이언트 쿠키에서 토큰을 가져온다.

    // 토큰을 복호화한 후 유저를 찾는다.
    

    // 유저가 있으면 인증okay 없으면 인증 No! 
}


module.exports = { auth };
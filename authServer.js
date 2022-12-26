const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



function authorizeCustomer(req, res, next) {
    let token = req.cookies.token;
    if(token == null){
        res.status = 401;
        return res.redirect('/signin');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status = 403;
            return res.redirect('/signin');
        }
        
        if(req.user.role != 'customer'){
            res.status = 403;
            return res.redirect('/signin');
        }
        req.user = decoded;
        next();
    });
};

function authorizeOffice(req, res, next) {
    let token = req.cookies.token;
    if(token == null){
        res.status = 401;
        return res.redirect('/signin');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status = 403;
            return res.redirect('/signin');
        }
        if(req.user.role != 'office'){
            res.status = 403;
            return res.redirect('/signin');
        }
        req.user = decoded;
        next();
    });
}
module.exports = {authorizeCustomer, authorizeOffice};
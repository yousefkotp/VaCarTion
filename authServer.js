const jwt = require('jsonwebtoken');

function authorizeAdmin(req, res, next) {
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
        req.user = decoded;
        if(req.user.role != 'admin'){
            res.status = 403;
            return res.redirect('/signin');
        }
        next();
    });
};

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
        req.user = decoded;
        if(req.user.role != 'customer'){
            res.status = 403;
            return res.redirect('/signin');
        }
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
        req.user = decoded;
        if(req.user.role != 'office'){
            res.status = 403;
            return res.redirect('/signin');
        }
        next();
    });
}
module.exports = {authorizeAdmin, authorizeCustomer, authorizeOffice};
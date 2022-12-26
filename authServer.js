const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());

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
        if(decoded.role != 'admin'){
            res.status = 403;
            return res.redirect('/signin');
        }
        req.user = decoded;
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
        
        if(decoded.role != 'customer'){
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
        if(decoded.role != 'office'){
            res.status = 403;
            return res.redirect('/signin');
        }
        req.user = decoded;
        next();
    });
}
module.exports = {authorizeAdmin, authorizeCustomer, authorizeOffice};
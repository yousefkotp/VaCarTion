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

function decodeToken(token){
    let decodedToken = jwt.decode(token);
    return decodedToken;
}


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

function authroizeAdminOrCustomer(req, res, next) {
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
        if(decoded.role != 'admin' && decoded.role != 'customer'){
            res.status = 403;
            return res.redirect('/signin');
        }
        req.user = decoded;
        next();
    });
}

function checkWhereToGo(req,res,next){
    if(req.cookies.token === undefined){
        next();
        return;
    }
    let decodedToken = decodeToken(req.cookies.token);
    if(decodedToken.exp < Date.now() / 1000){
        res.clearCookie("token");
        next();
        return;
    }
    if(decodedToken && decodedToken.role === "admin")
        res.redirect("/admin");
    else if(decodedToken && decodedToken.role === "customer")
        res.redirect("/customer-home");
    else if(decodedToken && decodedToken.role === "office")
        res.redirect("/office-home");
}

module.exports = {authorizeAdmin, authorizeCustomer, authorizeOffice, authroizeAdminOrCustomer, decodeToken, checkWhereToGo};
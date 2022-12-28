//
require('dotenv').config()
const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require('path');
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");


const {decodeToken, authorizeAdmin, authorizeCustomer, authorizeOffice, authroizeAdminOrCustomer} = require('./authServer');
const saltRound = 10;
const cookieOptions = {secure: false}; //change secure to true when deploying

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname +'/public')));
app.use(express.static("static"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
db.connect();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


// msh 3arf a run query begeb not authorized f 3mlt leha comment
// host: "db4free.net",
// port: "3306",
// user: "car_sys_admin",
// password: "dbdbdb123",
// database: "carrentalsysdb12"

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/signin", (req, res) => {
    res.sendFile(__dirname + "/views/signin.html");
});
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/signup.html");
});

app.get("/office_signup",(req,res)=>{
    res.sendFile(__dirname + "/views/office_signup.html");
});

app.get("/new_car", (req, res) => {
    res.sendFile(__dirname + "/views/car_form.html");
});

app.get("/admin", authorizeAdmin,(req, res) => {
    res.sendFile(__dirname + "/views/admin_home.html");
});

app.get("/payments-search", authorizeAdmin, (req, res) => {
    res.sendFile(__dirname + "/views/payment_report_search.html");
});

app.get("/cars-status-search", authorizeAdmin, (req, res) => {
    res.sendFile(__dirname + "/views/car_status_search.html");
});

app.get("/customer-res-search", authorizeAdmin, (req, res) => {
    res.sendFile(__dirname + "/views/customer_res_search.html");
});

app.get("/car-res-search", authorizeAdmin, (req, res) => {
    res.sendFile(__dirname + "/views/car_res_search.html");
});

app.get("/res-search", authorizeAdmin, (req, res) => {
    res.sendFile(__dirname + "/views/res_search.html");
});

app.get("/reserve", (req, res) => {
    res.sendFile(__dirname + "/views/reserve.html");
});

app.get("/car-form", (req, res) => {
    res.sendFile(__dirname + "/views/car_form.html");
});

app.get("/advanced-search", (req, res) => {
    res.sendFile(__dirname + "/views/advanced_search.html");
});

app.get("/office-home",(req,res)=>{
    res.sendFile(__dirname + "/views/office_home.html");
});

app.get("/customer-home",(req,res)=>{
    res.sendFile(__dirname + "/views/customer_home.html");
});

/*post requests*/
// ---------------------------------------------------------------------------------------------------------------------

app.post("/signup-landing",(req,res)=>{
    email = req.body.email;
    res.render("signup.ejs",{userEmail:email});
});

app.post("/signin", (req,res)=>{
    //check first in customer, if it doesn't exist check in office
    email = req.body.email;
    password = req.body.password;
    //check in admin in database
    db.query("SELECT * FROM admin WHERE email = ?", [email], (err, result) => {
        if(err)
            return res.send({message: err});
        if(result.length > 0){
            //check if the password is correct
            bcrypt.compare(password, result[0].password, function(err, response) {
                if(response){
                    //authenticating and authorize the user
                    const user = result[0];
                    const accessToken = jwt.sign({user, role:"admin"}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1h"});
                    res.cookie("token", accessToken, cookieOptions);
                    res.redirect("/admin");
                }
            });
        }else{
            //check in customer
            db.query("SELECT * FROM customer WHERE email = ?", [email], (err, result) => {
                if(err)
                    return res.send({message: err});
                if(result.length > 0){
                    bcrypt.compare(password, result[0].password, function(err, response) {
                        if(response){
                            const user = result[0];
                            const accessToken = jwt.sign({user, role:"customer"}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1h"});
                            res.cookie("token", accessToken, cookieOptions);
                            res.redirect("/customer-home");
                        }
                    });
                }else{
                    db.query("SELECT * FROM office WHERE email = ?", [email], (err, result) => {
                        if(err)
                            return res.send({message: err});
                        if(result.length > 0){
                            bcrypt.compare(password, result[0].password, function(err, response) {
                                if(response){
                                    const user = result[0];
                                    const accessToken = jwt.sign({user, role:"office"}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1h"});
                                    res.cookie("token", accessToken, cookieOptions);
                                    res.redirect("/office-home")
                                }else
                                    res.sendFile(__dirname + "/views/signin.html");
                            });
                        }else{
                            res.sendFile(__dirname + "/views/signin.html");
                        }
                    });
                }
            });
        }
    });
});

app.post("/signup",(req,res)=>{
    //signing up as a customer
    let email = req.body.email;
    let password = req.body.password;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let ssn = req.body.ssn;
    let creditCardNo = req.body.credit_card_no;
    let holdreName = req.body.holder_name;
    let expDate = req.body.credit_card_expiry_date;
    let cvv = req.body.credit_card_cvv;
    let phone = req.body.phone_no;
    //add credit card info to the database
    db.query("INSERT INTO credit_card (card_no, holder_name, exp_date, cvv) VALUES (?,?,?,?)",
    [creditCardNo, holdreName, expDate, cvv], (err, result) => {
        if(err)
            return res.send({message: err});
    });
    //convert password to hash
    bcrypt.hash(password, saltRound, function(err, hash) {
        //store the info inside the database
        db.query("INSERT INTO customer (email, password, fname, lname, ssn, phone_no) VALUES (?,?,?,?,?,?)",
        [email, hash, fName, lName, ssn, phone], (err, result) => {
            if(err)
                return res.send({message: err});

            db.query("INSERT INTO customer_credit (ssn, card_no) VALUES (?,?)",
            [ssn, creditCardNo], (err, result) => {
                if(err){
                    res.send({message: err});
                }else{
                    //authenticating and authorize the user
                    const user = result[0];
                    const accessToken = jwt.sign({user, role:"customer"}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1h"});
                    res.cookie("token", accessToken, cookieOptions);
                    /*Sending mail*/
                    var mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'Welcome to VaCarTion🚘💚',
                        text: "habiby ahamo"
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                           // res.send("failure");
                
                        } else {
                           console.log('Email sent: ' + info.response);
                           //res.send("success");
                        }
                    });
                    res.redirect("/signin");
                }
            });
        });
    });
});

app.post("/office-signup",(req,res)=>{
    //signing up as an office
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone_no;
    let password = req.body.password;
    let country = req.body.country;
    let city = req.body.city;
    let building_no = req.body.building_no;

    //convert password to hash
    bcrypt.hash(password, saltRound, function(err, hash) {
        //store the info inside the database
        db.query("INSERT INTO office (email, password, name, phone_no, country, city, building_no) VALUES (?,?,?,?,?,?,?)",
        [email, hash, name, phone, country, city, building_no], (err, result) => {
            if(err)
                return res.send({message: err});
            
            //authenticating and authorize the user
            const user = result[0];
            const accessToken = jwt.sign({user, role:"office"}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1h"});
            res.cookie("token", accessToken, cookieOptions);
            res.redirect("/signin");
        });
    });
});

//post request to add a car
app.post("/add-car", (req, res) => {
    let plateId = req.body.plate_id;
    let model = req.body.model;
    let make = req.body.make;
    let year = req.body.year;
    let price = req.body.price;
    let officeId = req.user.office_id;
    //store the info inside the database
    db.query("INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES (?,?,?,?,?,?)",
    [plateId, model, make, year, price, officeId], (err, result) => {
        if(err)
            return res.send({message: err});
        //make the car status = 0 (available) in the car_status table
        db.query("INSERT INTO car_status (plate_id) VALUES (?)",
        [plateId], (err, result) => {
            if(err)
                return res.send({message: err});
            res.sendFile(__dirname + "/views/office_home.html");
        });
    });
});

//post request to add a reservation
app.post("/add-reservation", (req, res) => {
    let ssn = req.user.ssn;
    let plateId = req.body.plateId;
    let pickupDate = req.body.pickupDate;
    let returnDate = req.body.returnDate;
    //get the current date
    //store the info inside the database
    db.query("INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES (?,?,?,?)",
    [ssn, plateId, pickupDate, returnDate], (err, result) => {
        if(err)
            return res.send({message: err});
        
        db.query("INSERT INTO car_status (plate_id, status_code, status_date) VALUES (?,?)",
        [plateId, 3, pickupDate], (err, result) => {
            if(err)
                return res.send({message: err});
            db.query("INSERT INTO car_status (plate_id, status_code, status_date) VALUES (?,?,?)",
            [plateId, 0, returnDate], (err, result) => {
                if(err)
                    return res.send({message: err});
                res.sendFile(__dirname + "/views/customer_home.html");
            });
        });
    });
});


//check if ssn is already taken in customer
app.post("/check-ssn-customer", (req, res) => {
    let ssn = req.body.ssn;
    db.query("SELECT * FROM customer WHERE ssn = ?", [ssn], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({taken: result.length > 0});
    });
});

//check if email is already taken in customer
app.post("/check-email-customer", (req, res) => {
    let email = req.body.email;
    db.query("SELECT * FROM customer WHERE email = ?", [email], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({taken: result.length > 0});
    });
});

//check if email is already taken for office
app.post("/check-email-office", (req, res) => {
    let email = req.body.email;
    db.query("SELECT * FROM office WHERE email = ?", [email], (req, result) => {
        if(err)
            return res.send({message: err});
        res.send({taken: result.length > 0});
    });
});

//check if phone is already taken for customer
app.post("/check-phone-customer", (req, res) => {
    let phone = req.body.phone;
    db.query("SELECT * FROM customer WHERE phone_no = ?", [phone], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({taken: result.length > 0});
    });
});

//check if phone is already taken for office
app.post("/check-phone-office", (req, res) => {
    let phone = req.body.phone;
    db.query("SELECT * FROM office WHERE phone_no = ?", [phone], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({taken: result.length > 0});
    });
});

//car reservation search
app.post("/get-car-reservation", authorizeAdmin, (req,res)=>
{
    var plate_id=req.body.plate_id;
    ///get the reservation info from the database
    db.query("SELECT * FROM reservation NATURAL INNER JOIN car WHERE plate_id = ?",
    [plate_id], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({reservation: result,message : "success"});
    });
});

//get customer name from ssn
app.post("/get-customer-name", authroizeAdminOrCustomer,(req,res)=>
{
    let token = decodeToken(req.cookies.token);
    var ssn = token.user.ssn;
    ///get the reservation info from the database
    db.query("SELECT fname,lname FROM customer WHERE ssn = ?",
    [ssn], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({customer: result,message : "success"});
    });
});

//get office name from office_id
app.post("/get-office-name", authorizeOffice,(req,res)=>
{
    let token = decodeToken(req.cookies.token);
    var id = token.user.office_id;
    console.log(id);
    ///get the reservation info from the database
    db.query("SELECT name FROM office WHERE office_id = ?",
    [id], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({office: result,message : "success"});
    });
});
// TODO
// office reservations search
app.post("/get-office-reservation", authroizeAdminOrCustomer, (req,res)=>
{
    //get decoded token from the request
    user = decodeToken(req.cookies.token);
    var id = user.user.office_id;
    if(ssn == null)
        id=req.body.office_id;
    ///get the reservation info from the database
    db.
    db.query("SELECT *, ((return_date-pickup_date+1)*price )as revenue FROM reservation as r NATURAL INNER JOIN customer INNER JOIN car as c on c.plate_id = r.plate_id WHERE r.ssn = ?",
    [ssn], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({reservation: result, message : "success"});
    });
});

// customer reservation search
app.post("/get-customer-reservation", authroizeAdminOrCustomer, (req,res)=>
{
    //get decoded token from the request
    user = decodeToken(req.cookies.token);
    var ssn = user.user.ssn;
    if(ssn == null)
        ssn=req.body.ssn;
    ///get the reservation info from the database
    db.query("SELECT *, ((return_date-pickup_date+1)*price )as revenue FROM reservation as r NATURAL INNER JOIN customer INNER JOIN car as c on c.plate_id = r.plate_id WHERE r.ssn = ?",
    [ssn], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({reservation: result, message : "success"});
    });
});


//payments at certain period search
app.post("/get-payments-within-period", authorizeAdmin, (req, res) => {
    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
    //get the payments info from the database within the period
    db.query("SELECT *,((return_date-pickup_date+1)*price )as revenue FROM reservation NATURAL INNER JOIN car WHERE payment_date BETWEEN ? AND ?",
    [start_date, end_date], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({payment: result, message : "success"});
    });
});


// reservations at certain period search
app.post("/get-reservations-within-period", authorizeAdmin,(req, res) => {
    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
    //get the reservation info from the database within the period
    db.query("SELECT * FROM reservation as r NATURAL INNER JOIN customer INNER JOIN car as c on c.plate_id = r.plate_id WHERE reserve_date BETWEEN ? AND ?",
    [start_date, end_date], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({reservation: result, message : "success"});
    });
});

// reservation at certain period search for a specific car
app.post("/get-car-reservation-within-period", authorizeAdmin, (req,res)=>{
    var plate_id=req.body.plate_id;
    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
    ///get the reservation info from the database
    db.query("SELECT * FROM reservation as r NATURAL INNER JOIN customer INNER JOIN car as c on c.plate_id = r.plate_id WHERE r.plate_id = ? AND reserve_date BETWEEN ? AND ?",
    [plate_id, start_date, end_date], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({reservation: result, message : "success"});
    });
});

//list the cars that are available at a certain date
app.post("/get-cars-available", (req, res) => {
    var date = req.body.date;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE plate_id NOT IN (SELECT DISTINCT plate_id FROM reservation WHERE return_date >= ? AND reserve_date <= ?)",
    [date, date], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({availableCars: result, message : "success"});
    });
});

//get all the models of cars
app.post("/get-all-cars-models", (req, res) => {
    //get the cars info from the database
    db.query("SELECT DISTINCT model FROM car",
    (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({carModels: result, message : "success"});
    });
});

//get all the makes of cars for a specific model
app.post("/get-all-cars-makes", (req, res) => {
    var model=req.body.model;
    //get the cars info from the database
    db.query("SELECT DISTINCT make FROM car WHERE model = ?",
    [model], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({carMakes: result, message : "success"});
    });
});

//get the cars with specific model
app.post("/get-cars-using-model", (req, res) => {
    var model=req.body.model;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE model = ?",
    [model], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({cars: result, message : "success"});
    });
});

//get the cars with specific make
app.post("/get-cars-using-make", (req, res) => {
    var make=req.body.make;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE make = ?",
    [make], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({cars: result, message : "success"});
    });
});

//get the cars with specific model and make
app.post("/get-cars-using-model-and-make", (req, res) => {
    var model=req.body.model;
    var make=req.body.make;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE model = ? AND make = ?",
    [model, make], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({cars: result, message : "success"});
    });
});

//get the cars with specific office id
app.post("/get-cars-using-office", (req, res) => {
    var office_id=req.body.office_id;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE office_id = ?",
    [office_id], (err, result) => {
        if(err)
            return res.send({message: err});
        res.send({cars: result, message : "success"});
    });
});

app.post("/get-most-rented-model", authorizeAdmin, (req,res)=>{
    db.query("SELECT model, COUNT(*) as count FROM reservation NATURAL INNER JOIN car GROUP BY model ORDER BY count DESC LIMIT 1",(err,result)=>{
        if(err)
            return res.send({message: err});
        res.send({mostRentedModel: result, message : "success"});
    });
});

app.post("/get-most-rented-make", authorizeAdmin, (req,res)=>{
    db.query("SELECT make, COUNT(*) as count FROM reservation NATURAL INNER JOIN car GROUP BY make ORDER BY count DESC LIMIT 1",(err,result)=>{
        if(err)
            return res.send({message: err});
        res.send({mostRentedMake: result, message : "success"});
    });
});

app.post("/get-most-profitable-office", authorizeAdmin, (req,res)=>{
    let query = `SELECT o.name, o.office_id, SUM(((r.return_date-r.pickup_date+1)*c.price )) as total
                FROM reservation as r
                NATURAL INNER JOIN car as c
                INNER JOIN office as o ON o.office_id = c.office_id
                WHERE r.payment_date is not null
                GROUP BY c.office_id 
                ORDER BY total DESC 
                LIMIT 1;`
    db.query(query,(err,result)=>{
        if(err)
            return res.send({message: err});
        res.send({mostProfitableOffice: result, message : "success"});
    });
});

app.post("/get-car-status-on-a-day", authorizeAdmin, (req,res)=>{
    let date = req.body.date;
    let query = `SELECT *
                FROM car_status
                NATURAL INNER JOIN car
                WHERE (plate_id,status_date) in (SELECT plate_id, MAX(status_date)
                                                FROM car_status
                                                where status_date <= ?
                                                GROUP BY plate_id);`
    db.query(query,[date],(err,result)=>{
        if(err)
            return res.send({message: err});
        res.send({carStatus: result, message : "success"});
    });
});

app.post("/advanced-search", authorizeAdmin,(req,res)=>{
    let model = req.body.model;
    let make = req.body.make;
    let year = req.body.year;
    let plate_id = req.body.plate_id;
    let ssn = req.body.ssn;
    let fname = req.body.fName;
    let lname = req.body.lName;
    let customerEmail = req.body.email;
    let customerPhone = req.body.phone_no;
    let reservationDate = req.body.reservation_date;
    //query reservation and join with customer and car to get the info
    let query1 = `SELECT * FROM reservation as r
                NATURAL LEFT JOIN car AS c
                LEFT JOIN customer AS cu ON cu.ssn = r.ssn
                `
                
    let join = `UNION ALL\n`
    let query2 = `SELECT * FROM reservation as r
                NATURAL RIGHT JOIN car As c
                RIGHT JOIN customer AS cu ON cu.ssn = r.ssn
                WHERE r.plate_id IS NULL`;
                
    //add the conditions to the query
    let conditions = [];
    if(model != "" && model != null){
        conditions.push(`c.model = '${model}'`);
    }
    if(make != "" && make != null){
        conditions.push(`c.make = '${make}'`);
    }
    if(year != "" && year != null){
        conditions.push(`c.year = '${year}'`);
    }
    if(plate_id != "" && plate_id != null){
        conditions.push(`c.plate_id = '${plate_id}'`);
    }
    if(ssn != "" && ssn != null){
        conditions.push(`cu.ssn = '${ssn}'`);
    }
    if(fname != "" && fname != null){
        conditions.push(`cu.fname = '${fname}'`);
    }
    if(lname != "" && lname != null){
        conditions.push(`cu.lname = '${lname}'`);
    }
    if(customerEmail != "" && customerEmail != null){
        conditions.push(`cu.email = '${customerEmail}'`);
    }
    if(customerPhone != "" && customerPhone != null){
        conditions.push(`cu.phone_no = '${customerPhone}'`);
    }
    if(reservationDate != "" && reservationDate != null){
        conditions.push(`r.reservation_date = '${reservationDate}'`);
    }
    if(conditions.length > 0){
        query1 += " WHERE " + conditions.join(" AND ");
    }
    if(conditions.length > 0){
        query2 += " AND " + conditions.join(" AND ");
    }
    let query = query1 + join + query2;
    db.query
    (query,(err,result)=>{
        if(err)
            return res.send({message: err});
        res.send({reservation: result, message : "success"});
    }
    );
});

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
});


app.use(connectLiveReload());

app.listen(process.env.PORT || 3000, () => { 
    console.log("server started on port: ", process.env.PORT || 3000) 
});

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });


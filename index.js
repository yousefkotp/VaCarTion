// la tanso npm install 3ashan kol el dependencies tenzel 3andko
// type "$ npm run watch" in terminal instead of "node index.js" to make your server update whenever any change happen
require('dotenv').config()
const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require('path');
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const saltRound = 10;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname +'/public')));
app.use(express.static("static"));
app.use(express.urlencoded({extended:true}));

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
//connect to the database
const db = mysql.createConnection({
    host: "db4free.net",
    port: "3306",
    user: "car_sys_admin",
    password: "dbdbdb123",
    database: "carrentalsysdb12"
});
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


app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/views/admin_home.html");
});

app.get("/payments-search", (req, res) => {
    res.sendFile(__dirname + "/views/payment_report_search.html");
});

app.get("/cars-status-search", (req, res) => {
    res.sendFile(__dirname + "/views/car_status_search.html");
});

app.get("/customer-res-search", (req, res) => {
    res.sendFile(__dirname + "/views/customer_res_search.html");
});

app.get("/car-res-search", (req, res) => {
    res.sendFile(__dirname + "/views/car_res_search.html");
});

app.get("/res-search", (req, res) => {
    res.sendFile(__dirname + "/views/res_search.html");
});

app.get("/reserve", (req, res) => {
    res.sendFile(__dirname + "/views/reserve.html");
});




/*post requests*/
// ---------------------------------------------------------------------------------------------------------------------

app.post("/signup-landing",(req,res)=>{
    email = req.body.email;
    res.render("signup.ejs",{userEmail:email});
});

app.post("/signin",(req,res)=>{
    //check first in customer, if it doesn't exist check in office
    email = req.body.email;
    password = req.body.password;
    //convert password to hash
    bcrypt.hash(password, saltRound, function(err, hash) {
        //check if email and password match in customer
        db.query("SELECT * FROM customer WHERE email = ? AND password = ?",
        [email, hash], (err, result) => {
            if(err){
                //return that login failed
                return res.send({message: err});
            }
            else{
                if(result.length > 0){
                    res.sendFile(__dirname + "/views/customer_home.html");
                }
                else{
                    //check if email and password match in office
                    db.query("SELECT * FROM office WHERE email = ? AND password = ?",
                    [email, hash], (err, result) => {
                        if(err){
                            //return that login failed
                            return res.send({message: err});
                        }
                        else{
                            if(result.length > 0){
                                res.sendFile(__dirname + "/views/office_home.html");
                            }
                            else{
                                res.sendFile(__dirname + "/views/signin.html");
                            }
                        }
                    });
                }
            }
        });
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
    //convert password to hash
    bcrypt.hash(password, saltRound, function(err, hash) {
        //store the info inside the database
        db.query("INSERT INTO customer (email, password, fname, lname, ssn, phone_no, card_no, holder_name, exp_date, cvv) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [email, hash, fName, lName, ssn, phone, creditCardNo, holdreName, expDate, cvv], (err, result) => {
            if(err){
                //return that registration failed
                return res.send({message: err});
            }
            else{
                res.sendFile(__dirname + "/views/customer_home.html");
            }
        });
    });
});

app.post("/office-signup",(req,res)=>{
    //signing up as an office
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let phone = req.body.phone_no;
    let country = req.body.country;
    let city = req.body.city;
    let building_no = req.body.building_no;

    //convert password to hash
    bcrypt.hash(password, saltRound, function(err, hash) {
        //store the info inside the database
        db.query("INSERT INTO office (email, password, name, phone_no, country, city, building_no) VALUES (?,?,?,?,?,?,?)",
        [email, hash, name, phone, country, city, building_no], (err, result) => {
            if(err){
                return res.send({message: err});
            }
            else{
                res.sendFile(__dirname + "/views/office_home.html");
            }
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
    let officeId = req.body.office_id;
    //store the info inside the database
    db.query("INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES (?,?,?,?,?,?)",
    [plateId, model, make, year, price, officeId], (err, result) => {
        if(err){
            return res.send({message: err});
        }
        else{
            res.sendFile(__dirname + "/views/office_home.html");
        }
    });
});

//post request to add a reservation
app.post("/add-reservation", (req, res) => {
    let customerId = req.body.customerId;
    let plateId = req.body.plateId;
    let pickupDate = req.body.pickupDate;
    let returnDate = req.body.returnDate;
    //get the current date
    let reserveDate = new Date().toISOString().split('T')[0];//YYYY-MM-DD
    //store the info inside the database
    db.query("INSERT INTO reservation (ssn, plate_id, pickup_date, return_date, reserve_date) VALUES (?,?,?,?,?)",
    [customerId, plateId, pickupDate, returnDate, reserveDate], (err, result) => {
        if(err){
            return res.send({message: err});
        }
        else{
            res.sendFile(__dirname + "/views/customer_home.html");
        }
    });
});



//check if ssn is already taken in customer
app.post("/check-ssn-customer", (req, res) => {
    let ssn = req.body.ssn;
    db.query("SELECT * FROM customer WHERE ssn = ?", [ssn], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({taken: result.length > 0});
    });
});

//check if email is already taken in customer
app.post("/check-email-customer", (req, res) => {
    let email = req.body.email;
    db.query("SELECT * FROM customer WHERE email = ?", [email], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({taken: result.length > 0});
    });
});

//check if email is already taken for office
app.post("/check-email-office", (req, res) => {
    let email = req.body.email;
    db.query("SELECT * FROM office WHERE email = ?", [email], (req, result) => {
        if(err)
            return res.send({message: err});
        return res.send({taken: result.length > 0});
    });
});

//check if phone is already taken for customer
app.post("/check-phone-customer", (req, res) => {
    let phone = req.body.phone;
    db.query("SELECT * FROM customer WHERE phone_no = ?", [phone], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({taken: result.length > 0});
    });
});

//check if phone is already taken for office
app.post("/check-phone-office", (req, res) => {
    let phone = req.body.phone;
    db.query("SELECT * FROM office WHERE phone_no = ?", [phone], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({taken: result.length > 0});
    });
});

//car reservation search
app.post("/get-car-reservation",(req,res)=>
{
    var plate_id=req.body.plate_id;
    ///get the reservation info from the database
    db.query("SELECT * FROM reservation WHERE plate_id = ?",
    [plate_id], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({reservation: result,message : "success"});
    });
});


// customer reservation search
app.post("/get-customer-reservation",(req,res)=>
{
    var ssn=req.body.ssn;
    ///get the reservation info from the database
    db.query("SELECT * FROM customer NATURAL INNER JOIN reservation WHERE ssn = ?",
    [ssn], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});


// cars status at certain day search
app.post("/get-cars-status", (req, res) => {
    var date=req.body.date;
    console.log(date);
    ///write the query then redirect to your new page
});


//payments at certain period search
app.post("/get-payments-within-period", (req, res) => {
   var start_date=req.body.start_date;
   var end_date=req.body.end_date;
   //get the payments info from the database within the period
    db.query("SELECT * FROM reservation as r NATURAL INNER JOIN customer NATURAL INNER JOIN car WHERE payment_date BETWEEN ? AND ?",
    [start_date, end_date], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});


// reservations at certain period search
app.post("/get-reservations-within-period", (req, res) => {
    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
    //get the reservation info from the database within the period
    db.query("SELECT * FROM reservation WHERE reserve_date BETWEEN ? AND ?",
    [start_date, end_date], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//list the cars that are available at a certain date
app.post("/get-cars-available", (req, res) => {
    var date=req.body.date;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE plate_id NOT IN (SELECT plate_id FROM reservation WHERE return_date < ?)",
    [date], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//get all the models of cars
app.post("/get-cars-models", (req, res) => {
    //get the cars info from the database
    db.query("SELECT DISTINCT model FROM car",
    (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//get all the makes of cars for a specific model
app.post("/get-cars-makes", (req, res) => {
    var model=req.body.model;
    //get the cars info from the database
    db.query("SELECT DISTINCT make FROM car WHERE model = ?",
    [model], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//get the cars with specific model
app.post("/get-cars-model", (req, res) => {
    var model=req.body.model;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE model = ?",
    [model], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//get the cars with specific make
app.post("/get-cars-make", (req, res) => {
    var make=req.body.make;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE make = ?",
    [make], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//get the cars with specific model and make
app.post("/get-cars-model-make", (req, res) => {
    var model=req.body.model;
    var make=req.body.make;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE model = ? AND make = ?",
    [model, make], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

//get the cars with specific office id
app.post("/get-cars-of-office", (req, res) => {
    var office_id=req.body.office_id;
    //get the cars info from the database
    db.query("SELECT * FROM car WHERE office_id = ?",
    [office_id], (err, result) => {
        if(err)
            return res.send({message: err});
        return res.send({message: result});
    });
});

app.use(connectLiveReload());

app.listen(3000, () => { 
    console.log("server started") 
});

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });


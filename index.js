// la tanso npm install 3ashan kol el dependencies tenzel 3andko
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


//connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
}
);

app.get("/signin", (req, res) => {
    res.sendFile(__dirname + "/views/signin.html");
}
);
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/signup.html");
}
);

app.get("/office_signup",(req,res)=>{
    res.sendFile(__dirname + "/views/office_signup.html");
});

app.get("/new_car", (req, res) => {

    res.sendFile(__dirname + "/views/car_form.html");
}
);


app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/views/admin_home.html");
}
);

app.get("/payments-search", (req, res) => {

    res.sendFile(__dirname + "/views/payment_report_search.html");
}
);

app.get("/cars-status-search", (req, res) => {

    res.sendFile(__dirname + "/views/car_status_search.html");
}
);

app.get("/customer-res-search", (req, res) => {

    res.sendFile(__dirname + "/views/customer_res_search.html");
}
);

app.get("/car-res-search", (req, res) => {

    res.sendFile(__dirname + "/views/car_res_search.html");
}
);

app.get("/res-search", (req, res) => {
    res.sendFile(__dirname + "/views/res_search.html");
}
);


/*post requests*/
// ---------------------------------------------------------------------------------------------------------------------


app.post("/signup_landing",(req,res)=>{
    email = req.body.email;
    res.render("signup.ejs",{userEmail:email});
});

app.post("/signin",(req,res)=>{
    //check first in customer, if it doesn't exist check in office
    email = req.body.email;
    password = req.body.password;
    //convert password to hash
    bcrypt.hash(password, saltRound, function(err, hash) {
        // Store hash in your password DB.
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

app.post("/office_signup",(req,res)=>{
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

//car reservation search
app.post("/car-res-search",(req,res)=>
{
    var plate_id=req.body.plate_id;
    console.log(plate_id);
    ///write the query then redirect to your new page;
});


// customer reservation search
app.post("/customer-res-search",(req,res)=>
{
    var username=req.body.username;
    var email=req.body.email;
    console.log(email+" "+username);
    ///write the query then redirect to your new page;
});


// cars status at certain day search
app.post("/cars-status-search", (req, res) => {

    var date=req.body.date;
    console.log(date);
    ///write the query then redirect to your new page
});


//payments at certain period search
app.post("/payments-search", (req, res) => {

   var start_date=req.body.start_date;
   var end_date=req.body.end_date;
   console.log(start_date+" ");
   console.log(end_date);
    ///write the query then redirect to your new page
});


// reservations at certain period search
app.post("/res-search", (req, res) => {

    var start_date=req.body.start_date;
    var end_date=req.body.end_date;
    console.log(start_date+" ");
    console.log(end_date);
     ///write the query then redirect to your new page
}
);


app.listen(3000, () => { 
    console.log("server started") 
});
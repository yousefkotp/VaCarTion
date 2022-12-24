// la tanso npm install 3ashan kol el dependencies tenzel 3andko
require('dotenv').config()
const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require('path');
const ejs = require("ejs");

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
    email = req.body.email;
    password = req.body.password;

});

app.post("/signup",(req,res)=>{
    
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


app.listen(3000, () => { console.log("server started") });
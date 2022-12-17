//sib el body parser msh hy3ml azma ya joe
// la tanso npm install 3ashan kol el dependencies tenzel 3andko
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));


app.get("/", (req, res) => {

    res.sendFile(__dirname + "/html/home.html");

}
);
app.get("/signup", (req, res) => {

    res.sendFile(__dirname + "/html/signup.html");

}
);

app.get("/new_car", (req, res) => {

    res.sendFile(__dirname + "/html/car_form.html");
}
);

app.get("/admin", (req, res) => {

    res.sendFile(__dirname + "/html/admin_home.html");
}
);


app.get("/payments-search", (req, res) => {

    res.sendFile(__dirname + "/html/payment_report_search.html");
}
);

app.get("/cars-status-search", (req, res) => {

    res.sendFile(__dirname + "/html/car_status_search.html");
}
);



app.listen(3000, () => { console.log("server started") });
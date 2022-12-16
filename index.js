//sib el body parser msh hy3ml azma ya joe
// la tanso npm install 3ashan kol el dependencies tenzel 3andko
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));


app.get("/", (req, res) => {

    res.sendFile(__dirname + "/home.html");

}
);
app.get("/signup", (req, res) => {

    res.sendFile(__dirname + "/signup.html");

}
);

app.get("/new_car", (req, res) => {

    res.sendFile(__dirname + "/car_form.html");
}
);

app.get("/admin", (req, res) => {

    res.sendFile(__dirname + "/admin_home.html");
}
);






app.listen(3000, () => { console.log("server started") });
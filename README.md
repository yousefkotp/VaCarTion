<div style = "text-align: center;">
<h1> Car-Rental-System </h1>
</div>



## Table of Contents
- [Car-Rental-System](#car-rental-system)
    - [Overview](#overview)
    - [Dependencies](#dependencies)
    - [Tech Stack](#tech-stack)
    - [Database Schema](#database-schema)
    - [ER Diagram](#er-diagram)
    - [Deployment](#deployment)
    - [Contributers](#contributers)

## Overview
A car rental system which enables customers to rent cars they need and manage their reservations with the option of paying later. The car agencies are allowed to register on the system and add their cars to the system. The system admin can manage the whole system. The system is built using Node.js and Express.js. The database is built using MySQL.

## Dependencies
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [EJS](https://ejs.co/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemailer](https://nodemailer.com/about/)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)

- To install all the dependencies, run the following command in the terminal:

```bash
npm install
```
## Database Schema

### DDL
- You can find the database schema in the following link: [Database Schema](https://github.com/yousefkotp/Car-Rental-System/blob/main/DDL.sql)

### ER Diagram
<!-- embed the photo whose link is  here -->
![ER Diagram](https://github.com/yousefkotp/Car-Rental-System/blob/main/ER%20model/ER%20diagram.png)
## Authentication and Authorization
- The system uses [JSON Web Tokens](https://jwt.io/) for authentication and authorization.
- The system uses [cookie-parser](https://www.npmjs.com/package/cookie-parser) to store the access token in the cookies.

## Deployment

1- Create a database with the explained [database schema](#database-schema) and [ER diagram](#er-diagram)

2- Configure the .env file and set the following variables:

    - DB_HOST 
    - DB_USER 
    - DB_PORT 
    - DB_PASS 
    - DB_NAME 
    - ACCESS_TOKEN_SECRET -> Secret key for generating access tokens 
    - EMAIL -> Email address from which you want to send the emails 
    - PASSWORD -> Password of the email address 

3- Make sure you have installed all the [dependencies](#dependencies) by running the following command in the terminal:

```bash
npm install
```

4- Run the following command in the terminal to start the server:

```bash
npm start
```

5- Open the browser and go to the following link:

```bash
http://localhost:3000
``` 

<!--add a bold note -->
- **Note:** If you want to run the server on a different port, you can change the port number in index.js file


## Contributers

1. [Yousef Kotp](https://github.com/yousefkotp)

2. [Mohamed Farid](https://github.com/MohamedFarid612)

3. [Adham Mohamed](https://github.com/adhammohamed1)

4. [Hossam Elshamy](https://github.com/hossamelshamyy)




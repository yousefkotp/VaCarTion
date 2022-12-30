# Car-Rental-System

## Table of Contents
- [Car-Rental-System](#car-rental-system)
    - [Overview](#overview)
    - [Features](#features)
    - [Dependencies](#dependencies)
    - [Tech Stack](#tech-stack)
    - [Database Schema](#database-schema)
    - [ER Diagram](#er-diagram)
    - [Deployment](#deployment)
    - [Contributers](#contributers)

## Overview


## Features
- Customer Can:
    - Register and Login
    - View all the cars available
    - Book a car
    - View all the bookings
    - Choose to pay now or later
    - View all the cars he has booked


- Admin can:
    - Login
    - View the most rented model
    - View the most rented make
    - View the most profitable office
    - View all the current and previous bookings
    - View all the cars
    - View all the customers
    - View detailed payment report for a specific interval
    - View car status on a specific date
    - View all the current and previous bookings of a specific customer
    - View all the current and previous bookings of a specific car
    - View all the current and previous bookings of a specific office
    - View all the current and previous bookings of a specific model
    - View all the current and previous bookings of a specific make
    - View all the current and previous bookings of a specific office

- Office can:
    - Register and Login
    - View all the bookings of its cars
    - View all its cars
    - View all the of its customers
    - Add a new car
    - Delete a car
    - Update the status of a car
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

## Tech Stack

## Database Schema

## ER Diagram

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




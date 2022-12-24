CREATE SCHEMA `car-rental-system`;
USE `car-rental-system`;

CREATE TABLE customer (
    ssn INT,
    fname VARCHAR(256) NOT NULL,
    lname VARCHAR(256) NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL,
    phone_no VARCHAR(256) UNIQUE NOT NULL,
    photo BLOB NULL,
    wallet REAL DEFAULT 0,
    holder_name VARCHAR(256) NOT NULL,
    card_no VARCHAR(256) NOT NULL,
    cvv INT NOT NULL,
    exp_date DATE NOT NULL,
    CONSTRAINT customer_pk PRIMARY KEY (ssn)
);

CREATE TABLE office(
    office_id INT AUTO INCREMENT,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL,
    phone_no VARCHAR(256) UNIQUE NOT NULL,
    country VARCHAR(256) NOT NULL,
    city VARCHAR(256) NOT NULL,
    building_no VARCHAR(256) NOT NULL,
    CONSTRAINT office_pk PRIMARY KEY (office_id)
);

CREATE TABLE car(
    plate_id INT,
    model VARCHAR(256) NOT NULL,
    make VARCHAR(256) NOT NULL,
    year YEAR NOT NULL,
    price REAL NOT NULL,
    office_id INT NOT NULL,
    CONSTRAINT car_pk PRIMARY KEY (plate_id),
    CONSTRAINT car_office_fk FOREIGN KEY (office_id) REFERENCES office(office_id)
);

CREATE TABLE reservation(
    reservation_no INT AUTO INCREMENT,
    ssn INT NOT NULL,
    car_id INT NOT NULL,
    reserve_date DATE NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    payment_date DATE NOT NULL,
    CONSTRAINT reservation_pk PRIMARY KEY (reservation_no),
    CONSTRAINT reservation_customer_fk FOREIGN KEY (ssn) REFERENCES customer(ssn),
    CONSTRAINT reservation_car_fk FOREIGN KEY (car_id) REFERENCES car(plate_id)
);

CREATE TABLE car_photos(
    plate_id INT,
    photo BLOB,    
    CONSTRAINT car_photos_pk PRIMARY KEY (plate_id),
    CONSTRAINT car_photos_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id)
);

CREATE TABLE car_status(
    plate_id INT,
    status_code INT,
    status_date DATE,
    CONSTRAINT car_status_pk PRIMARY KEY (plate_id),
    CONSTRAINT car_status_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id)
);
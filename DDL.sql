CREATE SCHEMA `car-rental-system`;
USE `car-rental-system`;

CREATE TABLE customer (
    ssn INT,
    fname VARCHAR(256),
    lname VARCHAR(256),
    email VARCHAR(256) UNIQUE,
    phone_no VARCHAR(256) UNIQUE,
    photo BLOB,
    wallet REAL,
    holder_name VARCHAR(256),
    card_no VARCHAR(256),
    cvv INT,
    exp_date DATE,
    CONSTRAINT customer_pk PRIMARY KEY (ssn)
);

CREATE TABLE office(
    office_id INT,
    name VARCHAR(256),
    email VARCHAR(256),
    phone_no VARCHAR(256),
    country VARCHAR(256),
    city VARCHAR(256),
    building_no VARCHAR(256),
    CONSTRAINT office_pk PRIMARY KEY (office_id)
);

CREATE TABLE car(
    plate_id INT,
    model VARCHAR(256),
    make VARCHAR(256),
    year YEAR,
    price REAL,
    office_id INT,
    CONSTRAINT car_pk PRIMARY KEY (plate_id),
    CONSTRAINT car_office_fk FOREIGN KEY (office_id) REFERENCES office(office_id)
);

CREATE TABLE reservation(
    reservation_no INT,
    ssn INT,
    car_id INT,
    reserve_date DATE,
    pickup_date DATE,
    return_date DATE,
    payment_date DATE,
    CONSTRAINT reservation_pk PRIMARY KEY (reservation_no),
    CONSTRAINT reservation_customer_fk FOREIGN KEY (ssn) REFERENCES customer(ssn),
    CONSTRAINT reservation_car_fk FOREIGN KEY (car_id) REFERENCES car(plate_id)
);

CREATE TABLE car_photos(
    plate_id INT,
    photo BLOB,
    CONSTRAINT car_photos_pk PRIMARY KEY (plate_id,photo),
    CONSTRAINT car_photos_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id)
);

CREATE TABLE car_status(
    plate_id INT,
    status_code INT,
    status_date DATE,
    CONSTRAINT car_status_pk PRIMARY KEY (plate_id),
    CONSTRAINT car_status_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id)
);
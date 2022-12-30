CREATE SCHEMA `car-rental-system`;
USE `car-rental-system`;

CREATE TABLE admin(
    email VARCHAR(64),
    password VARCHAR(256) NOT NULL,
    CONSTRAINT admin_pk PRIMARY KEY (email)
);

CREATE TABLE customer (
    ssn CHAR(6),
    fname VARCHAR(32) NOT NULL,
    lname VARCHAR(32) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    phone_no CHAR(11) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    wallet REAL DEFAULT 0,
    CONSTRAINT customer_pk PRIMARY KEY (ssn)
);

CREATE TABLE credit_card(
    card_no CHAR(16),
    holder_name VARCHAR(64) NOT NULL,
    cvv CHAR(3) NOT NULL,
    exp_date DATE NOT NULL,
    CONSTRAINT credit_card_pk PRIMARY KEY (card_no)
);

CREATE TABLE customer_credit(
    ssn CHAR(6),
    card_no CHAR(16),
    CONSTRAINT customer_credit_pk PRIMARY KEY (ssn, card_no),
    CONSTRAINT customer_credit_customer_fk FOREIGN KEY (ssn) REFERENCES customer(ssn),
    CONSTRAINT customer_credit_card_fk FOREIGN KEY (card_no) REFERENCES credit_card(card_no) ON DELETE CASCADE
);

CREATE TABLE office(
    office_id INT AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    phone_no CHAR(11) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    country VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL,
    building_no VARCHAR(16) NOT NULL,
    CONSTRAINT office_pk PRIMARY KEY (office_id)
);

CREATE TABLE car(
    plate_id VARCHAR(8),
    model VARCHAR(32) NOT NULL,
    make VARCHAR(32) NOT NULL,
    year YEAR NOT NULL,
    price REAL NOT NULL,
    registration_date DATE DEFAULT (CURRENT_DATE),
    office_id INT NOT NULL,
    CONSTRAINT car_pk PRIMARY KEY (plate_id),
    CONSTRAINT car_office_fk FOREIGN KEY (office_id) REFERENCES office(office_id) ON DELETE CASCADE
);

CREATE TABLE reservation(
    reservation_no INT AUTO_INCREMENT,
    ssn CHAR(6) NOT NULL,
    plate_id VARCHAR(8) NOT NULL,
    reserve_date DATE DEFAULT (CURRENT_DATE),
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    payment_date DATE DEFAULT NULL,
    CONSTRAINT reservation_pk PRIMARY KEY (reservation_no),
    CONSTRAINT reservation_customer_fk FOREIGN KEY (ssn) REFERENCES customer(ssn),
    CONSTRAINT reservation_car_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id) ON DELETE CASCADE
);

CREATE TABLE car_photos(
    plate_id VARCHAR(8),
    photo VARCHAR(512),
    CONSTRAINT car_photos_pk PRIMARY KEY (plate_id,photo),
    CONSTRAINT car_photos_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id) ON DELETE CASCADE
);

-- 0-> available, 1-> in maintainance, 2-> being cleaned, 3-> rented
CREATE TABLE car_status(
    plate_id VARCHAR(8),
    status_code SMALLINT DEFAULT 0,
    status_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT car_status_pk PRIMARY KEY (plate_id,status_code,status_date),
    CONSTRAINT car_status_fk FOREIGN KEY (plate_id) REFERENCES car(plate_id) ON DELETE CASCADE
);

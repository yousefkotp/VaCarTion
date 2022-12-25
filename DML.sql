--password is = 123 but $2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe in bcrypt
-- generate values to insert into the credit_card table
INSERT INTO credit_card VALUES ('0234567890123456', 'Farid Mohamed', '123', '2023-06-31');
INSERT INTO credit_card VALUES ('1234567890123457', 'Ashraf Yousef', '345', '2023-08-31');
INSERT INTO credit_card VALUES ('2234567890123458', 'Hossam Elshamy', '156', '2023-09-31');
INSERT INTO credit_card VALUES ('3234567890123459', 'Yousef Ashraf', '466', '2023-10-31');
INSERT INTO credit_card VALUES ('4234567890123460', 'Adham Mohamed', '854', '2023-11-31');
INSERT INTO credit_card VALUES ('5234567890123461', 'Mohamed Farid', '233', '2023-12-31');



-- generate values to insert into the customer table
INSERT INTO customer (ssn, fname, lname, email, phone_no, password)
VALUES('123456','Farid','Mohamed','farid@gmail.com','01012345678','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','0234567890123456'),
VALUES('234567','Ashraf','Yousef','ashraf@gmail.com','01123456789','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','1234567890123457'),
VALUES('345678','Hossam','Elshamy','hossam@gmail.com','01234567890','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','2234567890123458'),
VALUES('456789','Yousef','Ashraf','yousef@gmail.com','01512345678','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','3234567890123459'),
VALUES('567890','Adham','Mohamed','domziano@gmail.com','01623456789','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','4234567890123460'),
VALUES('678901','Mohamed','Farid','mohamed@gmail.com','01734567890','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','5234567890123461');

--generate credit card to customer
INSERT INTO customer_credit(ssn, card_no)
VALUES ('123456','0234567890123456'),
VALUES ('234567','1234567890123457'),
VALUES ('345678','2234567890123458'),
VALUES ('456789','3234567890123459'),
VALUES ('567890','4234567890123460'),
VALUES ('678901','5234567890123461');

--generate values to insert into the office table
INSERT INTO office (name, email, phone_no, password, country, city, building_no)
VALUES('Limozin Gold','limozin@gold.com','01532345678','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','Egypt','Cairo','1'),
VALUES('El AML','aml@forreal.com','01123456289','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','Egypt','Alexandria','2'),
VALUES('Safe Ride Office','contact@saferide.com','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','345678','Egypt','Giza','3'),
VALUES('Lambo office','lambo@lambo.com','01512345698','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','Egypt','Cairo','4'),
VALUES('Trust Limo','trust@gmail.com','01623456389','$2a$10$5IC.IhPacM5CMrbuz.O6He/ELafovg6kCn1chplnPZZFRM26AyQOe','Egypt','Giza','5');



--generate values to insert into the car table
INSERT INTO car (plate_id, model, make, year, price, office_id)
VALUES('12345678','Audi','A4','2019','10','1'),
VALUES('23456789','BMW','X5','2018','15','2'),
VALUES('34567890','Mercedes','C200','2017','5','3'),
VALUES('45678901','Audi','A6','2016','7.5','4'),
VALUES('56789012','BMW','X6','2015','2.5','5');


--generate values to insert into the car_photo table
INSERT INTO car_photo (plate_id, photo)
VALUES('12345678','https://www.audi.com/content/dam/gbp2/experience-audi/audi-models/a4-saloon/2019/audi-a4-saloon-2019-models.jpg?imwidth=1920'),
VALUES('23456789','https://www.bmw.com/content/dam/bmw/common/all-models/x-series/x5/2018/at-a-glance/bmw-x5-2018-models-at-a-glance.jpg?imwidth=1920'),
VALUES('34567890','https://www.mercedes-benz.com/en/vehicles/passenger-cars/mercedes-benz-c-class/saloon/c200-4matic/2017/design/exterior/mercedes-benz-c-class-saloon-c200-4matic-design-exterior-1920x1080-01.jpg'),
VALUES('45678901','https://www.audi.com/content/dam/gbp2/experience-audi/audi-models/a6-saloon/2019/audi-a6-saloon-2019-models.jpg?imwidth=1920'),
VALUES('56789012','https://www.bmw.com/content/dam/bmw/common/all-models/x-series/x6/2018/at-a-glance/bmw-x6-2018-models-at-a-glance.jpg?imwidth=1920');


--generate values to insert into the car_status table
INSERT INTO car_status (plate_id, status)
VALUES('12345678','0'),
VALUES('23456789','0'),
VALUES('34567890','0'),
VALUES('45678901','0'),
VALUES('56789012','0');


--generate values to insert into the reservation table
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date)
VALUES('123456','12345678','2022-12-28','2019-12-30'),
VALUES('234567','23456789','2022-12-28','2019-12-30'),
VALUES('345678','34567890','2022-12-28','2019-12-30'),
VALUES('456789','45678901','2022-12-28','2019-12-30'),
VALUES('567890','56789012','2022-12-28','2019-12-30');


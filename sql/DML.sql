-- password is = 123 but $2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq in bcrypt

-- generate values to insert into the admin table
INSERT INTO admin VALUES ('admin@gmail.com','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');

-- generate values to insert into the credit_card table
INSERT INTO credit_card VALUES ('0234567890123456', 'Farid Mohamed', '123', '2023-06-15');
INSERT INTO credit_card VALUES ('1234567890123457', 'Ashraf Yousef', '345', '2023-08-15');
INSERT INTO credit_card VALUES ('2234567890123458', 'Hossam Elshamy', '156', '2023-09-15');
INSERT INTO credit_card VALUES ('3234567890123459', 'Yousef Ashraf', '466', '2023-10-15');
INSERT INTO credit_card VALUES ('4234567890123460', 'Adham Mohamed', '854', '2023-11-15');
INSERT INTO credit_card VALUES ('5234567890123461', 'Mohamed Farid', '233', '2023-12-15');
INSERT INTO credit_card VALUES ('6015407408396551', 'Hamdy Abdo', '233', '2023-1-15');
INSERT INTO credit_card VALUES ('1644329983776598', 'Hamo Hazem', '233', '2023-2-15');
INSERT INTO credit_card VALUES ('5208149342853291', 'Sara Ahmed', '233', '2023-2-15');
INSERT INTO credit_card VALUES ('8098889348092690', 'Omnya fahmy', '233', '2023-4-15');
INSERT INTO credit_card VALUES ('2863293231626997', 'Ziad hassan', '233', '2023-12-20');
INSERT INTO credit_card VALUES ('6155282084657216', 'Leonel Messi', '233', '2023-12-21');
INSERT INTO credit_card VALUES ('9211973616180012', 'Cristiano Ronaldo', '233', '2023-12-22');
INSERT INTO credit_card VALUES ('8199147665644771', 'Mohamed salah', '233', '2023-12-23');



-- generate values to insert into the customer table
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('123456','Farid','Mohamed','farid@gmail.com','01012345678','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('234567','Ashraf','Yousef','ashraf@gmail.com','01123456789','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('345678','Hossam','Elshamy','hossam@gmail.com','01234567890','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('456789','Yousef','Ashraf','yousef@gmail.com','01512345678','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('567890','Adham','Mohamed','domziano@gmail.com','01623456789','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('322224','Mohamed','Farid','mohamed@gmail.com','01676795318','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('319824','Hamdy','Abdo','hamdy@gmail.com','01676795295','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('190797','Hamo','Hazem','hamo@gmail.com','01849247007','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('663117','Sara','Ahmed','sara@gmail.com','01834748737','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('621413','Omnya','fahmy','Omnya@gmail.com','01983260933','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('752665','Ziad','hassan','ziad@gmail.com','01116897861','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('149282','Leonel','Messi','messi@gmail.com','01111111110','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('269282','Cristiano','Ronaldo','ronaldo@gmail.com','01088377112','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');
INSERT INTO customer (ssn, fname, lname, email, phone_no, password) VALUES('859282','Mohamed','salah','salah@gmail.com','01404205590','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq');

-- generate credit card to customer
INSERT INTO customer_credit(ssn, card_no) VALUES ('123456','0234567890123456');
INSERT INTO customer_credit(ssn, card_no) VALUES ('234567','1234567890123457');
INSERT INTO customer_credit(ssn, card_no) VALUES ('345678','2234567890123458');
INSERT INTO customer_credit(ssn, card_no) VALUES ('456789','3234567890123459');
INSERT INTO customer_credit(ssn, card_no) VALUES ('567890','4234567890123460');
INSERT INTO customer_credit(ssn, card_no) VALUES ('322224','5234567890123461');
INSERT INTO customer_credit(ssn, card_no) VALUES ('319824','6015407408396551');
INSERT INTO customer_credit(ssn, card_no) VALUES ('190797','1644329983776598');
INSERT INTO customer_credit(ssn, card_no) VALUES ('663117','5208149342853291');
INSERT INTO customer_credit(ssn, card_no) VALUES ('621413','8098889348092690');
INSERT INTO customer_credit(ssn, card_no) VALUES ('752665','2863293231626997');
INSERT INTO customer_credit(ssn, card_no) VALUES ('149282','6155282084657216');
INSERT INTO customer_credit(ssn, card_no) VALUES ('269282','9211973616180012');
INSERT INTO customer_credit(ssn, card_no) VALUES ('859282','8199147665644771');


-- generate values to insert into the office table
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Limozin Gold','limozin@gold.com','01532345678','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Cairo','1');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('El AML','aml@forreal.com','01123456289','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Alexandria','2');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Safe Ride Office','contact@saferide.com', '01158456289','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Giza','3');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Lambo office','lambo@lambo.com','01512345698','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Cairo','4');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Elnaggar office','naggar@gmail.com','01623411389','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Giza','5');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Elzeny office','elzeny@gmail.com','01548456389','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Giza','6');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Elasdka2 Limo','elasdka2@gmail.com','01227856389','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Giza','7');
INSERT INTO office (name, email, phone_no, password, country, city, building_no) VALUES('Uber office','uber@gmail.com','01273456341','$2b$10$rVf5FqeP7PkC0Qj6No0sbONn7zQyZH0Z2l871rFA4IFPg9Iyo1EIq','Egypt','Giza','8');



-- generate values to insert into the car table
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('12345678','Audi','A4','2019','10','1');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('23456789','BMW','X5','2018','15','2');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('34567890','Mercedes','C200','2017','5','3');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('45678901','Audi','A6','2016','7.5','4');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('56789012','BMW','X6','2015','2.5','5');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('49716490','Audi','TT','2019','15','1');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('34553551','Jaguar','XJ','2018','13.5','2');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('90212135','Honda','Civic','2021','17','3');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('66420197','Infiniti','Q50','2020','30','4');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('16086698','Alfa Romeo','Giulia','2022','35','5');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('60818556','Mini','Clubman','2016','19','6');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('56357347','Nissan','GT-R','2024','120','7');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('31742611','Tesla','Model S','2021','50','8');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('97785008','Hyundai','Tucson','2018','14.5','8');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('88367004','Kia','Picanto','2015','0.25','7');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('93194878','Renault','Kadjar','2020','2.5','6');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('92374360','Chevrolet','Malibu','2019','9.5','5');
INSERT INTO car (plate_id, model, make, year, price, office_id) VALUES('74800293','Land Rover','Range Evoque','2021','22.5','4');


-- generate values to insert into the car_photo table
INSERT INTO car_photos (plate_id, photo) VALUES('12345678','https://gearkhana.com/wp-content/uploads/2019/06/A157415_small.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('23456789','https://www.elbalad.news/Upload/libfiles/964/6/302.png');
INSERT INTO car_photos (plate_id, photo) VALUES('34567890','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdhsugUJ8iDiY9QKoIBTecKVH9WlpMri-NbZOiLPhc&s');
INSERT INTO car_photos (plate_id, photo) VALUES('45678901','https://media.ed.edmunds-media.com/audi/a6/2016/fe/2016_audi_a6_f34_fe_208161_717.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('56789012','https://ymimg1.b8cdn.com/system/uploads/4104/original/2015-bmw-x6_100468788_h.jpg?1409246727');
INSERT INTO car_photos (plate_id, photo) VALUES('49716490','https://www.generatormix.com/images/car-model/audi-tt.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('34553551','https://www.generatormix.com/images/car-model/jaguar-xj.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('90212135','https://www.generatormix.com/images/car-model/honda-civic.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('66420197','https://www.generatormix.com/images/car-model/infiniti-q50.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('16086698','https://www.generatormix.com/images/car-model/alfa-romeo-giulia.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('60818556','https://www.generatormix.com/images/car-model/mini-clubman.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('56357347','https://www.generatormix.com/images/car-model/nissan-gt-r.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('31742611','https://www.generatormix.com/images/car-model/tesla-model-s.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('97785008','https://www.generatormix.com/images/car-model/hyundai-tucson.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('88367004','https://www.generatormix.com/images/car-model/kia-picanto.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('93194878','https://www.generatormix.com/images/car-model/renault-kadjar.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('92374360','https://www.generatormix.com/images/car-model/chevrolet-malibu.jpg');
INSERT INTO car_photos (plate_id, photo) VALUES('74800293','https://www.generatormix.com/images/car-model/land-rover-range-evoque.jpg');

-- generate values to insert into the car_status table
INSERT INTO car_status (plate_id) VALUES('12345678');
INSERT INTO car_status (plate_id) VALUES('23456789');
INSERT INTO car_status (plate_id) VALUES('34567890');
INSERT INTO car_status (plate_id) VALUES('45678901');
INSERT INTO car_status (plate_id) VALUES('56789012');
INSERT INTO car_status (plate_id) VALUES('49716490');
INSERT INTO car_status (plate_id) VALUES('34553551');
INSERT INTO car_status (plate_id) VALUES('90212135');
INSERT INTO car_status (plate_id) VALUES('66420197');
INSERT INTO car_status (plate_id) VALUES('16086698');
INSERT INTO car_status (plate_id) VALUES('60818556');
INSERT INTO car_status (plate_id) VALUES('56357347');
INSERT INTO car_status (plate_id) VALUES('31742611');
INSERT INTO car_status (plate_id) VALUES('97785008');
INSERT INTO car_status (plate_id) VALUES('88367004');
INSERT INTO car_status (plate_id) VALUES('93194878');
INSERT INTO car_status (plate_id) VALUES('92374360');
INSERT INTO car_status (plate_id) VALUES('74800293');




-- generate values to insert into the reservation table
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('123456','12345678','2022-12-28','2022-12-30');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('234567','23456789','2022-12-28','2022-12-30');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('345678','34567890','2022-12-28','2022-12-30');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('456789','45678901','2022-12-28','2022-12-30');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('567890','56789012','2022-12-28','2022-12-30');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('190797','16086698','2022-1-21','2022-1-23');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('663117','60818556','2022-1-22','2022-1-23');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('621413','56357347','2022-1-23','2022-1-30');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('752665','31742611','2022-1-24','2022-1-27');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('149282','97785008','2022-1-25','2022-1-28');
INSERT INTO reservation (ssn, plate_id, pickup_date, return_date) VALUES('269282','88367004','2022-1-26','2022-1-29');

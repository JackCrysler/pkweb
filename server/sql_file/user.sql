-- table pkuser cols: id username password nickname power
CREATE TABLE IF NOT EXISTS `pkuser`(
   `uid` VARCHAR(100) NOT NULL,
   `username` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `nickname` VARCHAR(100),
   `create_date` DATETIME,
   `power` VARCHAR(100),
   PRIMARY KEY ( `uid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
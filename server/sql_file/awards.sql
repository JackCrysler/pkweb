-- table pkuser cols: id username password nickname power
CREATE TABLE IF NOT EXISTS `awards`(
   `aid` INT UNSIGNED AUTO_INCREMENT,
   `uid` VARCHAR(100) NOT NULL,
   `award` VARCHAR(100) NOT NULL,
   `code` VARCHAR(100) NOT NULL,
   `create_date` DATETIME,
   PRIMARY KEY ( `aid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
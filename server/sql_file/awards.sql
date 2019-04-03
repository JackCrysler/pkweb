-- table pkuser cols: id username password nickname power
-- all users award infomation
CREATE TABLE IF NOT EXISTS `awards`(
   `aid` INT UNSIGNED AUTO_INCREMENT,
   `uid` VARCHAR(100) NOT NULL,
   `award` VARCHAR(100) NOT NULL,
   `code` VARCHAR(100) NOT NULL,
   `create_date` DATETIME,
   PRIMARY KEY ( `aid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- table questions cols: id title options answer 
-- qtype: 1-选择题
CREATE TABLE IF NOT EXISTS `questions`(
   `qid` VARCHAR(100) NOT NULL,
   `title` VARCHAR(255) NOT NULL,
   `options` VARCHAR(255) NOT NULL,
   `answer` VARCHAR(100) NOT NULL,
   `qtype` VARCHAR(100) NOT NULL,
   `create_date` DATETIME,
   PRIMARY KEY ( `qid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
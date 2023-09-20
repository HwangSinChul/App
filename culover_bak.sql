-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.0.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- culover 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `culover` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `culover`;

-- 테이블 culover.branch 구조 내보내기
CREATE TABLE IF NOT EXISTS `branch` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `COMPANY_IDX` int(11) NOT NULL,
  `BRANCH_NAME` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `LATITUDE` float NOT NULL,
  `LONGITUDE` float NOT NULL,
  PRIMARY KEY (`IDX`),
  KEY `FK_COMPANY` (`COMPANY_IDX`),
  CONSTRAINT `FK_COMPANY` FOREIGN KEY (`COMPANY_IDX`) REFERENCES `company` (`IDX`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 테이블 데이터 culover.branch:~1 rows (대략적) 내보내기
INSERT INTO `branch` (`IDX`, `COMPANY_IDX`, `BRANCH_NAME`, `LATITUDE`, `LONGITUDE`) VALUES
	(1, 2, '구로싸이언점', 37.4843, 126.899);

-- 테이블 culover.branch_product 구조 내보내기
CREATE TABLE IF NOT EXISTS `branch_product` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `PRODUCT_IDX` int(11) NOT NULL,
  `BRANCH_IDX` int(11) NOT NULL,
  `PRICE` int(11) NOT NULL,
  `DISCOUNT_RATE` int(11) DEFAULT NULL,
  `DISCOUNT_PRICE` int(11) DEFAULT NULL,
  `START_DATE` datetime NOT NULL,
  `END_DATE` datetime NOT NULL,
  PRIMARY KEY (`IDX`),
  KEY `FK_BRANCH_IDX` (`BRANCH_IDX`) USING BTREE,
  KEY `FK_PRODUCT_IDX` (`PRODUCT_IDX`),
  CONSTRAINT `FK_BRANCH_IDX` FOREIGN KEY (`BRANCH_IDX`) REFERENCES `branch` (`IDX`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_PRODUCT_IDX` FOREIGN KEY (`PRODUCT_IDX`) REFERENCES `product` (`IDX`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 culover.branch_product:~1 rows (대략적) 내보내기
INSERT INTO `branch_product` (`IDX`, `PRODUCT_IDX`, `BRANCH_IDX`, `PRICE`, `DISCOUNT_RATE`, `DISCOUNT_PRICE`, `START_DATE`, `END_DATE`) VALUES
	(1, 2, 1, 1800, 0, 600, '2023-09-01 00:00:00', '2023-09-30 00:00:00');

-- 테이블 culover.company 구조 내보내기
CREATE TABLE IF NOT EXISTS `company` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(300) NOT NULL,
  PRIMARY KEY (`IDX`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='편의점 회사 정보';

-- 테이블 데이터 culover.company:~4 rows (대략적) 내보내기
INSERT INTO `company` (`IDX`, `NAME`) VALUES
	(1, 'CU'),
	(2, 'GS25'),
	(3, 'MiniStop'),
	(4, '세븐일레븐');

-- 프로시저 culover.INSERT_PRODUCT 구조 내보내기
DELIMITER //
CREATE PROCEDURE `INSERT_PRODUCT`(
	IN `P_PRODUCT_NAME` TEXT,
	IN `P_MANUFACTURER` VARCHAR(50),
	IN `P_ORIGINAL_NAME` VARCHAR(50),
	IN `P_MIME_TYPE` VARCHAR(50),
	IN `P_PATH` VARCHAR(50),
	IN `P_SIZE` INT,
	IN `P_BRANCH_IDX` INT,
	IN `P_PRICE` INT,
	IN `P_DISCOUNT_RATE` INT,
	IN `P_DISCOUNT_PRICE` INT,
	IN `P_START_DATE` DATETIME,
	IN `P_END_DATE` DATETIME
)
    COMMENT '상품추가 프로시저'
BEGIN

	DECLARE P_PRODUCT_IDX INT;

	START TRANSACTION;
		
	INSERT INTO `PRODUCT` (`NAME`, `MANUFACTURER`) VALUES (P_PRODUCT_NAME, P_MANUFACTURER);
	
	SET @P_PRODUCT_IDX = LAST_INSERT_ID();
	
	INSERT INTO `PRODUCT_IMAGE` (PRODUCT_IDX, ORIGINAL_NAME, MIME_TYPE, PATH, SIZE) 
	VALUES(@P_PRODUCT_IDX,P_ORIGINAL_NAME,P_MIME_TYPE,P_PATH,P_SIZE);
	
	INSERT INTO `BRANCH_PRODUCT` (PRODUCT_IDX, BRANCH_IDX, PRICE, DISCOUNT_RATE, DISCOUNT_PRICE, START_DATE, END_DATE)
	VALUES (@P_PRODUCT_IDX,P_BRANCH_IDX,P_PRICE,P_DISCOUNT_RATE,P_DISCOUNT_PRICE,P_START_DATE,DATE_ADD(P_END_DATE, INTERVAL 1 DAY));
	
	COMMIT;
END//
DELIMITER ;

-- 테이블 culover.myfavorite 구조 내보내기
CREATE TABLE IF NOT EXISTS `myfavorite` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `PRODUCT_IDX` int(11) NOT NULL DEFAULT 0,
  `BRANCH_IDX` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`IDX`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- 테이블 데이터 culover.myfavorite:~0 rows (대략적) 내보내기

-- 테이블 culover.product 구조 내보내기
CREATE TABLE IF NOT EXISTS `product` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(1000) NOT NULL,
  `MANUFACTURER` varchar(50) NOT NULL,
  PRIMARY KEY (`IDX`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci COMMENT='상품정보';

-- 테이블 데이터 culover.product:~1 rows (대략적) 내보내기
INSERT INTO `product` (`IDX`, `NAME`, `MANUFACTURER`) VALUES
	(2, '커피속에모카치오', '남양');

-- 테이블 culover.product_image 구조 내보내기
CREATE TABLE IF NOT EXISTS `product_image` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `PRODUCT_IDX` int(11) NOT NULL,
  `ORIGINAL_NAME` varchar(500) NOT NULL DEFAULT '',
  `MIME_TYPE` varchar(20) NOT NULL DEFAULT '',
  `PATH` varchar(500) NOT NULL DEFAULT '',
  `SIZE` int(11) NOT NULL,
  PRIMARY KEY (`IDX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 culover.product_image:~0 rows (대략적) 내보내기

-- 테이블 culover.product_like 구조 내보내기
CREATE TABLE IF NOT EXISTS `product_like` (
  `IDX` int(11) NOT NULL AUTO_INCREMENT,
  `PRODUCT_IDX` int(11) NOT NULL,
  `USER_IDX` int(11) NOT NULL,
  `REG_DATE` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`IDX`),
  KEY `USER_IDX` (`USER_IDX`),
  KEY `REG_DATE` (`REG_DATE`),
  KEY `PRODUCT_IDX` (`PRODUCT_IDX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 culover.product_like:~0 rows (대략적) 내보내기

-- 테이블 culover.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `IDX` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `PASSWORD` char(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`IDX`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 culover.user:~2 rows (대략적) 내보내기
INSERT INTO `user` (`IDX`, `EMAIL`, `PASSWORD`) VALUES
	(1, 'a', 'qwer1234'),
	(2, 'c', 'qwer1234');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

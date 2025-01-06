-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 24-12-19 22:01
-- 서버 버전: 10.3.32-MariaDB
-- PHP 버전: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `NEW_ERP`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `ACCOUNT`
--

CREATE TABLE `ACCOUNT` (
  `NO` int(10) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `PASSWORD` varchar(100) DEFAULT NULL,
  `ROLE` varchar(20) NOT NULL DEFAULT '사원',
  `POSITION` varchar(20) NOT NULL DEFAULT '사원',
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `ACCOUNT_STATE` int(11) NOT NULL DEFAULT 1 COMMENT '사용자 상태',
  `LEVEL` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ACCOUNT`
--

INSERT INTO `ACCOUNT` (`NO`, `EMAIL`, `NAME`, `PASSWORD`, `ROLE`, `POSITION`, `CREATE_DATE`, `ACCOUNT_STATE`, `LEVEL`) VALUES
(1, 'admin@email.com', '관리자', '$2b$10$dq2Zw4tQyX//P74Ce4yuBu1E0O6IBqdTInPapRLUVUtK9tN2HAmXi', 'admin', '관리자', '2024-11-24', 1, 10),
(2, 'tera@email.com', '어드민', '$2b$10$48ymZcgMVOuws3Z6KkWt1OAJNR4Go8qX4wWNGxwjVgm2RszSlck1.', '시스템관리', '관리자', '2024-11-24', 1, 10),
(3, 'terasys@naver.com.com', '박병주', '$2b$10$Amx9DT3JQYz39sVtcTSOa.yIxicKkr98qCzymQCm0Jvn5KopEjfyW', '관리자', '사원', '2024-11-24', 1, 10),
(4, 'management@email.com', '공정관리자', '$2b$10$PxSayDCVc8QTpGGHFczEmO/4tlKrADqFpsCyGFSHr4asSspIewhXe', '매니저', '사원', '2024-11-24', 1, 5),
(5, 'inventory@email.com', '자재관리자', '$2b$10$KS07.439ZgSvu1m.0WMEAuHJ15qwKWJCKe6f5e5ukDR4XG8O1pBBO', '사원', '사원', '2024-11-24', 1, 0),
(6, 'jadan@email.com', '재단관리자', '$2b$10$N/7sktVv6WMVCV5LQuAZK.zOblt1sKYQUAv9DmQT9/MwrQOBgdziq', '재단', '사원', '2024-11-24', 1, 0),
(7, 'wondan@email.com', '원단관리자', '$2b$10$TpX5oQTSteL/2CNiv1mbj.m3IOhyxJZy2kteyMX/Xx8qNbKO8R9zi', '사원', '사원', '2024-11-24', 1, 0),
(8, 'finder@email.com', '검사관리자', '$2b$10$xSF38uI68M8rN0s.FxLhde7UXG.u8hrHKGYmmUvE6YvG8BLEaex1W', '사원', '사원', '2024-11-24', 1, 0),
(9, 'temp1@email.com', '팀별관리자1', '$2b$10$jMi.ipRywKQE75L7ORG7eeyrQlW3j7BlGnCeZA2C969y3ESqrmd4q', '사원', '사원', '2024-11-24', 1, 0),
(10, 'temp2@email.com', '팀별관리자2', '$2b$10$e0UlU36MAKbgq5.E63yQluoTYztyyA6NDmWdDsf0OrV13KTUlwn82', '사원', '사원', '2024-11-24', 1, 0),
(11, 'temp3@email.com', '팀별관리자3', '$2b$10$uG7mNBGKc6ghr8DBDhVV0ehgY5RmnIVzMxUSz0w1cYzSRn6kunsaC', '사원', '사원', '2024-11-24', 1, 0),
(12, 'temp4@email.com', '팀별관리자4', '$2b$10$Cd7Iz5y8Au1phkPYdN08Z.DEenVVu8TDlNH/gmt9uf21jEm6.TrDC', '사원', '사원', '2024-11-24', 1, 0),
(13, 'temp5@email.com', '팀별관리자5', '$2b$10$AqQcY21DfClIejkt2bZCJ.P0MeNIMIwqyXfD76eNaWsmqNdxMgBVC', '사원', '사원', '2024-11-24', 1, 0),
(14, 'alko@daum.net', '김영일', '$2b$10$Iq/feePoAm7ZRH4GwRHr8eiXDewg9oh/c7n/GUYbz6WQRmFZZwSYK', '사원', '사원', '2024-11-24', 1, 0),
(15, 'nam93054321@daum.net', '남진규', '$2b$10$1S5fHnINz87XFEnBCXafgOAc7v2Q2mpkMunUl7VbQWl4aLUkZqCjG', '사원', '사원', '2024-11-24', 1, 0),
(16, '8391785@daum.net', '이종록', '$2b$10$UD/peHjG3NDMN4k6N7eUDO9ittP/QQymmUNmwLSnmwGyILj2kt5zm', '사원', '사원', '2024-11-24', 1, 0),
(19, 'qntksrudeh@naver.com', '김종렬', '$2b$10$zpGvVqGZQpx5A.yJoTOLuuuMLSlIL2fwkut5rBhJMjGfziRctz3.a', '재단', '사원', '2024-11-24', 1, 0),
(20, '1@email.com', '', '1', '사원', '사원', '2024-11-30', 1, 0),
(21, 'test2@email.com', 'test2', '$2b$10$wgYJhTV/o9cZSFyCF9Z85.2uepbuwfE.jX2CakmV6phV30CSjg4/a', '사원', '사원', '2024-12-08', 1, 0),
(22, 'terasys@naver.com', '박병주', '$2b$10$Pyomdpl1TuHlXB8.hEZM2ONYmZpDrkLodflpajUTPXO/n9fF3x0iK', '사원', '사원', '2024-12-08', 1, 0),
(23, 'kjr', '김종렬', '$2b$10$mEHDWMVyq8cWnNB9/E/Hi.ronWRuo6V1CELs0urtiF9uoKENTBDuO', '사원', '사원', '2024-12-09', 1, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `ACCOUNT_POSITION`
--

CREATE TABLE `ACCOUNT_POSITION` (
  `POSITION_CODE` int(2) NOT NULL,
  `POSITION_NAME` varchar(20) NOT NULL,
  `POSITION_SORT` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ACCOUNT_POSITION`
--

INSERT INTO `ACCOUNT_POSITION` (`POSITION_CODE`, `POSITION_NAME`, `POSITION_SORT`) VALUES
(1, '대표이사', '1'),
(2, '이사', '2'),
(5, '공장장', '5'),
(7, '품질관리', '7'),
(10, '사원', '10'),
(9, '재단', '9'),
(3, '관리자', '3');

-- --------------------------------------------------------

--
-- 테이블 구조 `ACCOUNT_ROLE`
--

CREATE TABLE `ACCOUNT_ROLE` (
  `ROLE_NO` int(1) NOT NULL,
  `ROLE_NAME` varchar(20) NOT NULL,
  `ROLE_LEVEL` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ACCOUNT_ROLE`
--

INSERT INTO `ACCOUNT_ROLE` (`ROLE_NO`, `ROLE_NAME`, `ROLE_LEVEL`) VALUES
(1, '사원', 1),
(2, '자재관리', 1),
(3, '공정관리', 5),
(4, '재단관리', 5),
(5, '시스템관리', 10);

-- --------------------------------------------------------

--
-- 테이블 구조 `BARCODE_COUNT`
--

CREATE TABLE `BARCODE_COUNT` (
  `NO` int(11) NOT NULL,
  `PROCESS_CODE` varchar(30) NOT NULL,
  `PRODUCT_CODE` varchar(30) DEFAULT NULL,
  `PRODUCT_CODE_REV` varchar(2) DEFAULT NULL,
  `LAST_SERIAL_NUMBER` int(10) DEFAULT NULL,
  `BARCODE_COUNT` varchar(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `BARCODE_COUNT`
--

INSERT INTO `BARCODE_COUNT` (`NO`, `PROCESS_CODE`, `PRODUCT_CODE`, `PRODUCT_CODE_REV`, `LAST_SERIAL_NUMBER`, `BARCODE_COUNT`) VALUES
(26, 'KABL230000K2024101370', 'KABL230050C%2000241013', NULL, 4, '0'),
(45, 'KABL230000K2024101370', 'KABL230050C%2000241014', NULL, 2, '0'),
(47, 'KABL230000K2024101370', 'KABL230050C%2000241017', NULL, 3, '0'),
(49, 'KACL230090K2024102514', 'KACL230090K%2000241029', NULL, 71, '0');

-- --------------------------------------------------------

--
-- 테이블 구조 `BOARD_ATTACHMENT`
--

CREATE TABLE `BOARD_ATTACHMENT` (
  `ATTACHMENT_ID` int(11) NOT NULL,
  `POST_ID` int(11) NOT NULL,
  `FILE_NAME` varchar(255) NOT NULL,
  `FILE_PATH` varchar(500) NOT NULL,
  `FILE_SIZE` bigint(20) NOT NULL,
  `CREATED_DATE` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `BOARD_CATEGORY`
--

CREATE TABLE `BOARD_CATEGORY` (
  `CATEGORY_ID` int(11) NOT NULL,
  `CATEGORY_NAME` varchar(50) NOT NULL,
  `CREATED_DATE` datetime DEFAULT current_timestamp(),
  `MODIFIED_DATE` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `BOARD_CATEGORY`
--

INSERT INTO `BOARD_CATEGORY` (`CATEGORY_ID`, `CATEGORY_NAME`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(1, '공지사항', '2024-12-18 20:48:23', '2024-12-18 20:48:23'),
(2, '자유게시판', '2024-12-18 20:48:23', '2024-12-18 20:48:23'),
(3, 'Q&A', '2024-12-18 20:48:23', '2024-12-18 20:48:23'),
(4, '자료실', '2024-12-18 20:48:23', '2024-12-18 20:48:23');

-- --------------------------------------------------------

--
-- 테이블 구조 `BOARD_COMMENT`
--

CREATE TABLE `BOARD_COMMENT` (
  `COMMENT_ID` int(11) NOT NULL,
  `POST_ID` int(11) NOT NULL,
  `PARENT_COMMENT_ID` int(11) DEFAULT NULL,
  `CONTENT` text NOT NULL,
  `AUTHOR_NO` int(11) NOT NULL,
  `IS_DELETE` tinyint(1) DEFAULT 0,
  `CREATED_DATE` datetime DEFAULT current_timestamp(),
  `MODIFIED_DATE` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `BOARD_POST`
--

CREATE TABLE `BOARD_POST` (
  `POST_ID` int(11) NOT NULL,
  `CATEGORY_ID` int(11) DEFAULT NULL,
  `TITLE` varchar(200) NOT NULL,
  `CONTENT` text NOT NULL,
  `AUTHOR_NO` int(11) NOT NULL,
  `VIEW_COUNT` int(11) DEFAULT 0,
  `IS_NOTICE` tinyint(1) DEFAULT 0,
  `IS_DELETE` tinyint(1) DEFAULT 0,
  `CREATED_DATE` datetime DEFAULT current_timestamp(),
  `MODIFIED_DATE` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `BOARD_POST`
--

INSERT INTO `BOARD_POST` (`POST_ID`, `CATEGORY_ID`, `TITLE`, `CONTENT`, `AUTHOR_NO`, `VIEW_COUNT`, `IS_NOTICE`, `IS_DELETE`, `CREATED_DATE`, `MODIFIED_DATE`) VALUES
(2, 1, '1', '1', 20, 0, 0, 0, '2024-12-19 11:56:35', '2024-12-19 11:56:35'),
(6, 2, 'test', '<p>test</p>', 2, 3, 0, 0, '2024-12-19 21:59:28', '2024-12-19 22:00:19');

-- --------------------------------------------------------

--
-- 테이블 구조 `BOX`
--

CREATE TABLE `BOX` (
  `NO` int(11) NOT NULL,
  `PROCESSCODE` varchar(50) DEFAULT NULL,
  `LOT` varchar(30) DEFAULT NULL,
  `BOX_NO` int(11) DEFAULT NULL,
  `BARCODE_COUNT` int(10) DEFAULT 0,
  `CREATE_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `OUT_DATE` date DEFAULT NULL,
  `STATE` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `CHAR_DIM`
--

CREATE TABLE `CHAR_DIM` (
  `NO` int(11) NOT NULL,
  `Venthole_size` varchar(50) DEFAULT NULL,
  `Venthole_sewing1` varchar(50) DEFAULT NULL,
  `Venthole_sewing2` varchar(50) DEFAULT NULL,
  `Assy_Size1` varchar(50) DEFAULT NULL,
  `Assy_Size2` varchar(50) DEFAULT NULL,
  `Assy_Size3` varchar(50) DEFAULT NULL,
  `Permete_Selvage` varchar(50) DEFAULT NULL,
  `Stitch_lock` varchar(50) DEFAULT NULL,
  `Stitch_Chain` varchar(50) DEFAULT NULL,
  `Tether_Reinforce` varchar(50) DEFAULT NULL,
  `Inflator_Hole01` varchar(50) DEFAULT NULL,
  `Inflator_Hole02` varchar(50) DEFAULT NULL,
  `ThemBent` varchar(50) DEFAULT NULL,
  `Attatch_sewing` varchar(50) DEFAULT NULL,
  `Characteristic_Dim` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `CHAR_DIM`
--

INSERT INTO `CHAR_DIM` (`NO`, `Venthole_size`, `Venthole_sewing1`, `Venthole_sewing2`, `Assy_Size1`, `Assy_Size2`, `Assy_Size3`, `Permete_Selvage`, `Stitch_lock`, `Stitch_Chain`, `Tether_Reinforce`, `Inflator_Hole01`, `Inflator_Hole02`, `ThemBent`, `Attatch_sewing`, `Characteristic_Dim`) VALUES
(1, NULL, NULL, NULL, '(110)mm', '(120)mm', '(55)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '20±1mm', '60±3mm', NULL, '(110)mm', '(120)mm', '(55)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, '30±1mm', '60±3mm', NULL, '(110)mm', '(120)mm', '(55)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, '20±1mm', '60±3mm', NULL, '(120)mm', '(120)mm', '(50)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, '55±1mm', '80±2mm', '100±2mm', 'MAX(105)mm', 'MAX(210)mm', 'MAX(90)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, NULL, 'Max 105mm', 'Max 210mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '45±1mm', '75±2mm', '95±2mm', 'Max 105mm', 'Max 210mm', 'Max 90mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL, NULL, '20±5mm', '10±1/25.4mm', '10-1+3/25.4mm', NULL, NULL, NULL, NULL, NULL, 'IP Reinforce Selvag 15±3mm ,Tether Sewing Min15mm, Mouth Sewing 70±3mm, Mouth Sewing 70±3mm'),
(11, NULL, NULL, NULL, NULL, NULL, NULL, '20±5mm', '9±1/25.4mm', '10+3-1/25.4mm', '10±3mm', 'Ø20±mm', 'Ø30±mm', '70±5mm', '10±3mm', NULL),
(12, NULL, NULL, NULL, NULL, NULL, NULL, '20±5mm', '9±1/25.4mm', '10+3-1/25.4mm', '10±3mm', 'Ø20±mm', 'Ø30±mm', '75±5mm', '10±3mm', NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL, '20±5mm', '9±1/25.4mm', '10+3-1/25.4mm', '10±3mm', 'Ø20±mm', 'Ø30±mm', '70±5mm', '10±3mm', NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL, '20±5mm', '9±1/25.4mm', '10+3-1/25.4mm', '10±3mm', 'Ø20±mm', 'Ø30±mm', '75±5mm', '10±3mm', NULL),
(15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10±1/25.4mm', NULL, NULL, NULL, NULL, NULL, NULL, 'Single Lock Min 12mm, Single Lock Min 12mm'),
(16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10±1/25.4mm', NULL, NULL, NULL, NULL, NULL, NULL, 'Tether Anchor 67.8+3/0mm, TAB 간 거리 202.8+3/0mm,258±10mm,225±10mm,175±10mm,240±10mm,722±10mm,235±10mm,225±10mm'),
(17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10±1/25.4mm', NULL, NULL, NULL, NULL, NULL, NULL, 'Tether Anchor 67.8+3/0mm, TAB 간 거리 202.8+3/0mm,258±10mm,225±10mm,175±10mm,240±10mm,722±10mm,235±10mm,225±10mm'),
(18, '20±1mm', NULL, NULL, NULL, NULL, NULL, NULL, '10±1/25.4mm', '10+3-1/25.4mm', NULL, NULL, NULL, NULL, NULL, 'Tether overlap,15±5mm,Stap,44±4mm,Folding,280+10-5mm,Chain Sewing(외주)20±3mm,Chain Sewing 직선,30±3mm'),
(19, '20±1mm', NULL, NULL, NULL, NULL, NULL, NULL, '10±1/25.4mm', '10+3-1/25.4mm', NULL, NULL, NULL, NULL, NULL, 'Tether overlap,15±5mm,Stap,44±4mm,Folding,280+10-5mm,Chain Sewing(외주)20±3mm,Chain Sewing 직선,30±3mm'),
(20, '55±1mm', '80±2mm', '100±2mm', 'MAX(105)mm', 'MAX(210)mm', 'MAX(90)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, '45±1mm', '70±2mm', '90±2mm', 'MAX(105)mm', 'MAX(210)mm\n', 'MAX(90)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9+3-1/25mm', NULL, NULL, NULL, NULL, NULL, NULL, 'Tether Anchor 67.8+3/0mm, TAB 간 거리 202.8+3/0mm,258±10mm,225±10mm,175±10mm,240±10mm,722±10mm,235±10mm,225±10mm'),
(23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9+3-1/25mm', NULL, NULL, NULL, NULL, NULL, NULL, 'Tether Anchor 67.8+3/0mm, TAB 간 거리 202.8+3/0mm,258±10mm,225±10mm,175±10mm,240±10mm,722±10mm,235±10mm,225±10mm'),
(24, '45±1mm', '80±2mm', '100±2mm', 'MAX(110)mm', 'MAX(200)mm', 'MAX(90)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, '25±1mm', '60±3mm', NULL, '(120 +5 -10)mm', '(120 +5 -10)mm', '(55 +10 -5)mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `DAYS_PRODUCTION`
--

CREATE TABLE `DAYS_PRODUCTION` (
  `NO` int(11) NOT NULL,
  `PRODUCTION_PART` int(11) NOT NULL,
  `COUNT` int(11) NOT NULL,
  `WORKERS_COUNT` int(10) NOT NULL,
  `REG_DATE` date DEFAULT NULL,
  `REG_ACCOUNT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `DAYS_PRODUCTION`
--

INSERT INTO `DAYS_PRODUCTION` (`NO`, `PRODUCTION_PART`, `COUNT`, `WORKERS_COUNT`, `REG_DATE`, `REG_ACCOUNT`) VALUES
(18, 3, 1, 1, '2024-12-01', 2),
(19, 2, 1, 1, '2024-12-01', 2),
(20, 2, 100, 2, '2024-12-08', 1),
(21, 3, 100, 2, '2024-12-07', 1),
(22, 2, 100, 2, '2024-12-10', 2),
(23, 4, 200, 2, '2024-12-10', 2);

-- --------------------------------------------------------

--
-- 테이블 구조 `DELIVERY`
--

CREATE TABLE `DELIVERY` (
  `NO` int(11) NOT NULL,
  `PRODUCT_NO` int(10) NOT NULL,
  `PRODUCT_CODE` varchar(30) DEFAULT NULL,
  `PRODUCT_FULLNAME` varchar(50) DEFAULT NULL,
  `COUNT` int(10) NOT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `DELIVERY`
--

INSERT INTO `DELIVERY` (`NO`, `PRODUCT_NO`, `PRODUCT_CODE`, `PRODUCT_FULLNAME`, `COUNT`, `DATE`) VALUES
(1, 10, NULL, 'PAB FOLDING [VF33/VN&EU]', 320, '2024-11-06'),
(2, 12, NULL, 'PAB FOLDING [VF33/VN&EU]', 120, '2024-11-07'),
(3, 8, NULL, 'PROTECTOR [VF33/CeAB]', 800, '2024-11-05'),
(4, 6, NULL, 'DAB FOLDING [LD]', 5, '2024-11-06'),
(5, 6, NULL, 'DAB FOLDING [LD]', 10, '2024-11-07'),
(6, 6, NULL, 'DAB FOLDING [LD]', 10, '2024-11-07'),
(7, 6, NULL, 'DAB FOLDING [LD]', 10, '2024-11-07'),
(8, 6, NULL, 'DAB FOLDING [LD]', 10, '2024-11-07');

--
-- 트리거 `DELIVERY`
--
DELIMITER $$
CREATE TRIGGER `after_delivery_delete` AFTER DELETE ON `DELIVERY` FOR EACH ROW BEGIN
  -- INVENTORY 테이블에 해당 PRODUCT_NO가 있는지 확인
  IF EXISTS (SELECT * FROM INVENTORY WHERE PRODUCT_NO = OLD.PRODUCT_NO) THEN
    -- SUM_COUNT 값을 증가시킴
    UPDATE INVENTORY
    SET SUM_COUNT = SUM_COUNT + OLD.COUNT, DATE = current_timestamp()
    WHERE PRODUCT_NO = OLD.PRODUCT_NO;
  ELSE
    -- INVENTORY 테이블에 해당 PRODUCT_NO가 없다면 새 항목을 추가
    INSERT INTO INVENTORY (PRODUCT_NO, SUM_COUNT, DATE)
    VALUES (OLD.PRODUCT_NO, OLD.COUNT, current_timestamp());
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_delivery_insert` AFTER INSERT ON `DELIVERY` FOR EACH ROW BEGIN
  -- INVENTORY 테이블에 해당 PRODUCT_NO가 있는지 확인
  IF EXISTS (SELECT * FROM INVENTORY WHERE PRODUCT_NO = NEW.PRODUCT_NO) THEN
    -- SUM_COUNT 값을 감소시킴
    UPDATE INVENTORY
    SET SUM_COUNT = SUM_COUNT - NEW.COUNT, DATE = current_timestamp()
    WHERE PRODUCT_NO = NEW.PRODUCT_NO;
    
    -- SUM_COUNT가 0보다 작아지면 해당 항목을 삭제
    DELETE FROM INVENTORY
    WHERE PRODUCT_NO = NEW.PRODUCT_NO AND SUM_COUNT <= 0;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 테이블 구조 `INVENTORY`
--

CREATE TABLE `INVENTORY` (
  `NO` int(11) NOT NULL,
  `PRODUCT_NO` int(11) NOT NULL,
  `SUM_COUNT` int(11) NOT NULL,
  `QUANTITY` int(10) DEFAULT 0,
  `DATE` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `INVENTORY`
--

INSERT INTO `INVENTORY` (`NO`, `PRODUCT_NO`, `SUM_COUNT`, `QUANTITY`, `DATE`) VALUES
(1, 12, 980, 0, '2024-11-09'),
(2, 14, 1100, 0, '2024-11-09'),
(3, 19, 480, 0, '2024-11-09'),
(4, 22, 226, 0, '2024-12-01'),
(5, 23, 125, 0, '2024-11-09'),
(6, 4, 296, 0, '2024-11-09'),
(7, 2, 48, 0, '2024-11-09'),
(8, 15, 0, 0, '2024-11-09'),
(9, 10, 200, 0, '2024-12-01'),
(10, 9, 80, 0, '2024-11-09'),
(11, 6, 55, 0, '2024-11-09');

-- --------------------------------------------------------

--
-- 테이블 구조 `JADAN_INVENTORY`
--

CREATE TABLE `JADAN_INVENTORY` (
  `NO` int(10) NOT NULL,
  `WORK_DAY` date NOT NULL DEFAULT current_timestamp(),
  `WORKING_ORDER_NO` int(11) NOT NULL,
  `COUNT` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JADAN_INVENTORY`
--

INSERT INTO `JADAN_INVENTORY` (`NO`, `WORK_DAY`, `WORKING_ORDER_NO`, `COUNT`) VALUES
(47, '2024-06-20', 0, 100),
(48, '2024-06-28', 0, 1),
(49, '2024-06-28', 0, 1),
(50, '2024-06-28', 0, 1),
(51, '2024-07-05', 0, 100),
(52, '2024-06-28', 0, 1),
(53, '2024-06-29', 0, 2),
(54, '2024-07-02', 0, 1),
(55, '2024-07-05', 0, 100),
(56, '2024-07-06', 0, 1),
(57, '2024-07-12', 0, 1),
(58, '2024-07-12', 0, 1),
(59, '2024-07-15', 0, 1),
(60, '2024-07-07', 0, 1),
(61, '2024-07-07', 0, 1),
(62, '2024-07-15', 0, 1),
(63, '2024-07-15', 0, 1),
(64, '2024-07-15', 0, 1),
(65, '2024-07-08', 0, 1),
(66, '2024-07-15', 0, 1),
(67, '2024-07-15', 0, 1),
(68, '2024-07-15', 0, 1),
(69, '2024-07-15', 0, 1),
(47, '2024-06-20', 0, 100),
(48, '2024-06-28', 0, 1),
(49, '2024-06-28', 0, 1),
(50, '2024-06-28', 0, 1),
(51, '2024-07-05', 0, 100),
(52, '2024-06-28', 0, 1),
(53, '2024-06-29', 0, 2),
(54, '2024-07-02', 0, 1),
(55, '2024-07-05', 0, 100),
(56, '2024-07-06', 0, 1),
(57, '2024-07-12', 0, 1),
(58, '2024-07-12', 0, 1),
(59, '2024-07-15', 0, 1),
(60, '2024-07-07', 0, 1),
(61, '2024-07-07', 0, 1),
(62, '2024-07-15', 0, 1),
(63, '2024-07-15', 0, 1),
(64, '2024-07-15', 0, 1),
(65, '2024-07-08', 0, 1),
(66, '2024-07-15', 0, 1),
(67, '2024-07-15', 0, 1),
(68, '2024-07-15', 0, 1),
(69, '2024-07-15', 0, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `JAEDAN`
--

CREATE TABLE `JAEDAN` (
  `NO` int(11) NOT NULL,
  `WORK_ORDER_NO` int(10) NOT NULL,
  `WONDAN_STORE` int(10) NOT NULL,
  `WONDAN_MANAGER_NO` varchar(10) NOT NULL,
  `LOT` varchar(30) NOT NULL,
  `Y_COUNT` int(10) NOT NULL,
  `MARKS` int(10) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `DEFECTIVE` int(10) DEFAULT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `WORK_DATE` date NOT NULL DEFAULT current_timestamp(),
  `REG_ACCOUNT` int(10) NOT NULL,
  `STATE` int(11) NOT NULL DEFAULT 0,
  `PROCESS_STATE` int(10) NOT NULL DEFAULT 0,
  `UPDATE_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESS_STATE_UP_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESS_START_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESSCODE` varchar(30) DEFAULT NULL,
  `PROCESS_END_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JAEDAN`
--

INSERT INTO `JAEDAN` (`NO`, `WORK_ORDER_NO`, `WONDAN_STORE`, `WONDAN_MANAGER_NO`, `LOT`, `Y_COUNT`, `MARKS`, `COUNT`, `DEFECTIVE`, `CREATE_DATE`, `WORK_DATE`, `REG_ACCOUNT`, `STATE`, `PROCESS_STATE`, `UPDATE_ACCOUNT`, `PROCESS_STATE_UP_ACCOUNT`, `PROCESS_START_ACCOUNT`, `PROCESSCODE`, `PROCESS_END_DATE`) VALUES
(14, 23, 20, '1025', 'H244j0108', 118, 4, 472, 5, '2024-10-25', '2024-10-25', 10, 2, 3, 10, 2, 10, 'KACL230090K2024102514', '2024-11-09'),
(15, 24, 19, '1025', 'H22970147', 122, 4, 488, 0, '2024-10-25', '2024-10-25', 10, 2, 3, 10, 2, 10, 'KACL230090K2024102515', '2024-11-09'),
(16, 26, 22, '1025', 'H244f1205', 92, 4, 368, 0, '2024-10-25', '2024-10-25', 10, 2, 3, 10, 2, 10, 'KACL230090K2024102516', '2024-11-09'),
(17, 25, 18, '1025', 'H244W0320', 122, 4, 488, 0, '2024-10-25', '2024-10-25', 10, 2, 3, 10, 2, 10, 'KACL230090K2024102517', '2024-11-09'),
(18, 27, 28, '1019', 'H22970122', 102, 8, 816, 0, '2024-10-19', '2024-10-19', 10, 2, 3, 10, 2, 10, 'KACL231050K-22024101918', '2024-11-09'),
(19, 28, 26, '1019', 'H22970139', 102, 8, 816, 0, '2024-10-21', '2024-10-21', 10, 2, 3, 10, 2, 10, 'KACL231040K-22024102119', '2024-11-09'),
(20, 29, 27, '1021', 'H23890511', 100, 8, 800, 0, '2024-10-21', '2024-10-21', 10, 2, 3, 10, 2, 10, 'KACL231040K-22024102120', '2024-11-09'),
(21, 30, 29, '1', 'KADL40101K', 1, 1, 875, 0, '2024-10-17', '2024-10-17', 10, 2, 3, 10, 2, 10, 'KADL230220K2024101721', '2024-11-09'),
(22, 31, 30, '1', 'KADL401021K-1', 1, 1, 875, 0, '2024-10-17', '2024-10-17', 10, 2, 3, 10, 2, 10, 'KADL230230K2024101722', '2024-11-09'),
(23, 32, 31, '1018', 'H248L2218', 105, 10, 1050, 0, '2024-10-18', '2024-10-18', 10, 2, 3, 10, 2, 10, 'KAAL230007K-12024101823', '2024-11-09'),
(25, 36, 23, '1029', 'H244w0309', 109, 6, 654, 0, '2024-10-29', '2024-10-29', 10, 2, 3, 10, 2, 10, 'KAEL230041K-12024102925', '2024-11-09'),
(26, 35, 44, '1105', 'H248L2217', 98, 10, 980, 0, '2024-11-05', '2024-11-05', 51, 2, 3, 51, 2, 51, 'KAAL230007K-12024110526', '2024-11-09'),
(27, 37, 52, '1104', 'KADL401021K', 1, 1, 450, 0, '2024-11-04', '2024-11-04', 10, 2, 3, 10, 2, 10, 'KADL230220K2024110427', '2024-11-09'),
(28, 38, 53, '1104', 'KADL401021K-01', 1, 1, 450, 0, '2024-11-04', '2024-11-04', 10, 2, 3, 10, 2, 10, 'KADL230230K2024110428', '2024-11-09'),
(29, 39, 25, '1030', 'H24280247', 110, 6, 660, 0, '2024-10-30', '2024-11-06', 10, 2, 3, 10, 2, 10, 'KAEL230041K-12024110629', '2024-11-09'),
(30, 42, 18, '1031', 'H244W0320', 99, 8, 782, 0, '2024-10-31', '2024-10-31', 10, 2, 3, 10, 2, 10, 'KACL231040K-22024103130', '2024-11-09'),
(31, 43, 34, '1031', 'H24X83301', 95, 8, 760, 0, '2024-10-31', '2024-10-31', 10, 2, 3, 10, 2, 10, 'KACL231040K-22024103131', '2024-11-09'),
(33, 45, 33, '1104', 'H24X83206', 119, 4, 476, 0, '2024-11-04', '2024-11-04', 10, 2, 3, 10, 2, 10, 'KACL230090K2024110433', '2024-12-07'),
(34, 44, 18, '1031', 'H244W0320', 122, 4, 488, 0, '2024-10-31', '2024-10-31', 10, 2, 3, 10, 2, 10, 'KACL230090K2024103134', '2024-11-09'),
(35, 47, 35, '1104', 'H24X83207', 119, 4, 476, 0, '2024-11-04', '2024-11-04', 10, 2, 3, 10, 2, 10, 'KACL230090K2024110435', '2024-11-09'),
(36, 48, 54, '1', 'jaego01', 1, 1, 296, 0, '2024-11-09', '2024-11-09', 2, 2, 3, 2, 2, 2, 'KAAL230020K2024110936', '2024-12-07'),
(37, 49, 55, '1', 'jaego02', 1, 1, 48, 0, '2024-11-09', '2024-11-09', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024110937', '2024-11-09'),
(38, 50, 56, '1', 'jaego03', 1, 1, 800, 0, '2024-11-09', '2024-11-09', 2, 2, 3, 2, 2, 2, 'KACL360010K2024110938', '2024-11-09'),
(39, 51, 57, '1', 'jaego04', 1, 1, 900, 0, '2024-11-09', '2024-11-09', 2, 2, 3, 2, 2, 2, 'KACL230090K2024110939', '2024-11-09'),
(40, 52, 58, '1', 'jaego05', 1, 1, 320, 0, '2024-11-09', '2024-11-09', 2, 2, 3, 2, 2, 2, 'KABL230080K-12024110940', '2024-11-09'),
(41, 53, 59, '1', 'jaego06', 1, 1, 95, 0, '2024-11-09', '2024-11-09', 2, 2, 3, 2, 2, 2, 'KAAL230080K2024110941', '2024-11-09'),
(42, 56, 61, '1112', 'KADL401021K-02', 700, 1, 700, 0, '2024-11-12', '2024-11-12', 10, 2, 3, 10, 2, 10, 'KADL230220K2024111242', '2024-12-07'),
(43, 57, 62, '1112', 'KADL401021K-03', 700, 1, 700, 0, '2024-11-12', '2024-11-12', 10, 2, 3, 10, 2, 10, 'KADL230230K2024111243', '2024-12-07'),
(44, 59, 63, '1114', 'KADL401021K-04', 350, 1, 350, 0, '2024-11-14', '2024-11-12', 10, 2, 3, 10, 2, 10, 'KADL230230K2024111244', '2024-12-07'),
(45, 58, 64, '1114', 'KADL401021K-05', 350, 1, 350, 0, '2024-11-14', '2024-11-12', 10, 2, 3, 10, 2, 10, 'KADL230220K2024111245', '2024-12-07'),
(46, 63, 46, '1105', 'H249K0617', 101, 8, 808, 0, '2024-11-05', '2024-11-05', 10, 2, 3, 10, 2, 10, 'KACL231050K-22024110546', '2024-12-07'),
(47, 61, 49, '1106', 'H249K0616', 107, 6, 642, 0, '2024-11-06', '2024-11-06', 10, 2, 3, 10, 2, 10, 'KAEL230041K-12024110647', '2024-12-07'),
(48, 62, 48, '1106', 'H24X83102', 112, 8, 896, 0, '2024-11-06', '2024-11-06', 10, 2, 3, 10, 2, 10, 'KACL231050K-22024110648', '2024-12-07'),
(49, 64, 47, '1107', 'H24X83212', 107, 6, 642, 0, '2024-11-07', '2024-11-07', 10, 2, 3, 10, 2, 10, 'KAEL230041K-12024110749', '2024-12-07'),
(50, 65, 65, '1111', 'BAH140323A', 84, 2, 168, 0, '2024-11-11', '2024-11-11', 10, 2, 3, 10, 2, 10, 'KABL230080K-12024111150', '2024-12-07'),
(51, 68, 66, '1118', 'H24X83108', 116, 4, 464, 0, '2024-11-18', '2024-11-18', 10, 2, 3, 10, 2, 10, 'KACL230090K2024111851', '2024-12-07'),
(52, 66, 69, '1118', 'H249K0620', 119, 4, 476, 0, '2024-11-18', '2024-11-18', 10, 2, 3, 10, 2, 10, 'KACL230090K2024111852', '2024-12-07'),
(53, 67, 67, '1119', 'H24X83110', 116, 4, 464, 2, '2024-11-19', '2024-11-19', 50, 2, 3, 50, 2, 50, 'KACL230090K2024111953', '2024-12-07'),
(54, 69, 90, '1120', 'BAH140273B', 220, 2, 440, 2, '2024-11-20', '2024-11-20', 10, 2, 3, 10, 2, 10, 'KABL230080K-12024112054', '2024-12-10'),
(55, 70, 88, '1119', 'H249D1115-1', 83, 9, 747, 0, '2024-11-19', '2024-11-19', 10, 2, 3, 10, 2, 10, 'KAAL230007K-12024111955', '2024-12-10'),
(56, 71, 91, '1119', 'H244R0605', 46, 9, 414, 0, '2024-11-19', '2024-11-19', 10, 2, 3, 10, 2, 10, 'KAAL230007K-12024111956', '2024-12-10'),
(57, 72, 99, '1121', 'BAH130673A', 200, 2, 400, 0, '2024-11-21', '2024-11-21', 10, 2, 3, 10, 2, 10, 'KABL230080K2024112157', '2024-12-10'),
(58, 73, 105, '1125', 'H242E0206', 110, 8, 880, 0, '2024-11-25', '2024-11-25', 10, 2, 3, 10, 2, 10, 'KACL231040K-22024112558', '2024-12-10'),
(59, 74, 106, '1121', 'BAH140362C', 186, 2, 372, 4, '2024-11-21', '2024-11-21', 10, 2, 3, 10, 2, 10, 'KABL230080K2024112159', '2024-12-10'),
(60, 75, 107, '1122', 'BAH140362B', 186, 2, 372, 0, '2024-11-22', '2024-11-22', 10, 2, 3, 10, 2, 10, 'KABL230080K2024112260', '2024-12-10'),
(61, 77, 87, '1125', 'H249D1209-1', 100, 9, 900, 0, '2024-11-25', '2024-11-25', 10, 2, 3, 10, 2, 10, 'KAAL230007K-12024112561', '2024-12-10'),
(62, 79, 103, '1128', 'H24XM1907', 99, 8, 792, 0, '2024-11-28', '2024-11-28', 10, 2, 3, 10, 2, 10, 'KACL231050K-22024112862', '2024-12-10'),
(63, 20, 8, '1', 'treetettrtetrert', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 1, 2, 20, NULL, 'KAEL230041K-12024113063', NULL),
(66, 19, 70, '1', 'KADL401021K-6', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 1, 2, 20, NULL, 'KABL230080K-12024113066', NULL),
(79, 78, 71, '1', 'KADL401021K-7', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024113079', '2024-12-10'),
(80, 76, 71, '1', 'KADL401021K-7', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 3, 2, 2, 2, 'KABL230080K2024113080', '2024-12-10'),
(81, 80, 71, '1', 'KADL401021K-7', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024113081', '2024-12-10'),
(82, 79, 71, '1', 'KADL401021K-7', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 3, 2, 2, 2, 'KACL231050K-22024113082', '2024-12-10'),
(83, 78, 71, '200', 'KADL401021K-7', 1, 1, 1, 0, '2024-11-30', '2024-11-30', 2, 2, 3, 2, 2, NULL, 'KAAL230007K-12024113083', '2024-12-10'),
(84, 85, 77, '11', 'BAAA40193A', 11, 1, 2, 0, '2024-12-02', '2024-12-02', 2, 2, 0, 2, NULL, NULL, 'KAAL230007K-12024120284', NULL),
(85, 76, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, NULL, 'KABL230080K2024120785', '2024-12-10'),
(86, 96, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024120786', '2024-12-10'),
(87, 96, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024120787', '2024-12-10'),
(88, 96, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024120788', '2024-12-10'),
(89, 96, 78, '1', 'BAAA40122B', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024120789', '2024-12-10'),
(90, 96, 73, '1', 'BAAA40291A', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024120790', '2024-12-10'),
(91, 96, 85, '1', 'H249C1310', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, NULL, 'KAAL230007K-12024120791', '2024-12-10'),
(92, 96, 73, '1', 'BAAA40291A', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 3, 2, 2, 2, 'KAAL230007K-12024120792', '2024-12-10'),
(93, 95, 85, '1', 'H249C1310', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 2, 2, 1, 2, 'KAAL230007K-12024120793', NULL),
(94, 94, 98, '1', '76515-3', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 1, 2, 1, NULL, 'KAAL230007K-12024120794', NULL),
(95, 94, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 1, 2, 1, NULL, 'KAAL230007K-12024120795', NULL),
(96, 97, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 1, 2, 1, NULL, 'KAAL230007K2024120796', NULL),
(97, 98, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 1, 2, 1, NULL, 'KAAL230007K2024120797', NULL),
(98, 98, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 0, 2, NULL, NULL, 'KAAL230007K2024120798', NULL),
(99, 99, 2, '1', 'BAH140272A0540', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 0, 2, NULL, NULL, 'KAAL230007K2024120799', NULL),
(104, 102, 83, '1', 'H238M0606', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 2, 2, 0, 2, NULL, NULL, 'KAAL230007K20241207104', NULL),
(105, 102, 85, '1', 'H249C1310', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 1, 2, 0, 1, NULL, NULL, 'KAAL230007K20241207105', NULL),
(106, 101, 84, '1', 'H249D1307-1', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 1, 0, 0, NULL, NULL, NULL, NULL, NULL),
(107, 104, 89, '1', 'BAAA40193B-1', 1, 1, 1, 0, '2024-12-07', '2024-12-07', 1, 0, 0, NULL, NULL, NULL, NULL, NULL),
(109, 113, 73, '1', 'BAAA40291A', 1, 1, 1, 0, '2024-12-10', '2024-12-10', 2, 2, 2, 2, 2, 2, 'KAAL230007K20241210109', NULL),
(110, 114, 75, '1', 'BAAA30921A', 1, 1, 1, 0, '2024-12-10', '2024-12-10', 2, 2, 0, 2, NULL, NULL, 'KADL230220K20241210110', NULL),
(111, 116, 74, '1', 'BAAA40063A', 1, 1, 1, 0, '2024-12-10', '2024-12-10', 2, 2, 2, 2, NULL, 2, 'KAAL230007K-120241210111', NULL),
(112, 117, 77, '1', 'BAAA40193A', 1, 1, 1, 0, '2024-12-10', '2024-12-10', 2, 2, 2, 2, 2, 2, 'KAAL230007K-120241210112', NULL),
(113, 110, 78, '1', 'BAAA40122B', 7, 8, 56, 0, '2024-12-10', '2024-12-10', 2, 2, 0, 2, NULL, NULL, 'KAAL230007K-120241210113', NULL),
(114, 118, 76, '1', 'BAAA40063B', 1, 1, 1, 0, '2024-12-10', '2024-12-10', 2, 2, 2, 2, 2, 2, 'KAAL230007K-120241210114', NULL),
(115, 115, 82, '1', 'H228N2015', 1, 1, 1, 0, '2024-12-10', '2024-12-10', 2, 0, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `JAEDAN_PRODUCTS`
--

CREATE TABLE `JAEDAN_PRODUCTS` (
  `NO` int(11) NOT NULL,
  `JAEDAN_NAME` varchar(30) NOT NULL,
  `ASSY_PART_NAME` varchar(30) NOT NULL,
  `WONDAN_CODE` int(10) NOT NULL DEFAULT 0,
  `WONDAN_NAME` varchar(10) NOT NULL DEFAULT '0',
  `SUB_WONDAN` varchar(10) NOT NULL DEFAULT '0',
  `STATE` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JAEDAN_PRODUCTS`
--

INSERT INTO `JAEDAN_PRODUCTS` (`NO`, `JAEDAN_NAME`, `ASSY_PART_NAME`, `WONDAN_CODE`, `WONDAN_NAME`, `SUB_WONDAN`, `STATE`) VALUES
(1, 'VF33 GLASS COVER', 'CAB', 0, '1', '0', 1),
(2, 'INNER BAG', 'CAB', 0, '2', '0', 1),
(3, 'TAP', 'CAB', 0, '3', '0', 1),
(4, 'VF34 FRONT', 'CAB', 0, '4', '0', 1),
(5, 'HEAT SHIELD', 'PAB', 0, '5', '0', 1),
(6, 'TETHER 53 X 53', 'CENTER', 0, '6', '0', 1),
(7, 'TETHER 49 X 49', 'KAB', 0, '7', '0', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `JAEDAN_PRODUCT_PART`
--

CREATE TABLE `JAEDAN_PRODUCT_PART` (
  `NO` int(11) NOT NULL,
  `JAEDAN_PRODUCT_PART` int(10) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `REG_ACCOUNT` int(10) NOT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `ORDER_STATE` int(1) DEFAULT 0,
  `STATE` int(11) DEFAULT 0 COMMENT '1은 재단진행 2는 재단완료',
  `PRODUCTION_STATE` int(1) DEFAULT 0,
  `UPDATE_ACCOUNT` int(1) DEFAULT NULL,
  `PROCESSCODE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JAEDAN_PRODUCT_PART`
--

INSERT INTO `JAEDAN_PRODUCT_PART` (`NO`, `JAEDAN_PRODUCT_PART`, `COUNT`, `REG_ACCOUNT`, `CREATE_DATE`, `ORDER_STATE`, `STATE`, `PRODUCTION_STATE`, `UPDATE_ACCOUNT`, `PROCESSCODE`) VALUES
(1, 1, 1, 2, '2024-12-09', 0, 1, 0, 2, NULL),
(2, 1, 1, 13, '2024-12-09', 0, 0, 0, NULL, NULL),
(3, 1, 1, 2, '2024-12-09', 0, 0, 0, NULL, NULL),
(4, 2, 1, 2, '2024-12-09', 0, 0, 0, NULL, NULL),
(5, 1, 1, 2, '2024-12-09', 0, 0, 0, NULL, NULL),
(6, 1, 1, 2, '2024-12-10', 0, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `JAEDAN_WONDAN_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `JAEDAN_WONDAN_VIEW` (
`JAEDAN_NO` int(11)
,`JAEDAN_NAME` varchar(30)
,`ASSY_PART_NAME` varchar(30)
,`WONDAN_CODE` int(10)
,`JAEDAN_WONDAN_NAME` varchar(10)
,`SUB_WONDAN` varchar(10)
,`JAEDAN_STATE` int(2)
,`WONDAN_NO` int(11)
,`WONDAN_NAME` varchar(50)
,`WONDAN_DETAIL_NAME` varchar(50)
,`BUPUM_NO` varchar(50)
,`SUPPLAY` varchar(50)
,`WONDAN_BARCODE` varchar(50)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `PART_JAEDAN`
--

CREATE TABLE `PART_JAEDAN` (
  `NO` int(11) NOT NULL,
  `WORK_ORDER_NO` int(10) NOT NULL,
  `WONDAN_STORE` int(10) NOT NULL,
  `WONDAN_MANAGER_NO` varchar(10) NOT NULL,
  `LOT` varchar(30) NOT NULL,
  `Y_COUNT` int(10) NOT NULL,
  `MARKS` int(10) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `DEFECTIVE` int(10) DEFAULT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `WORK_DATE` date NOT NULL DEFAULT current_timestamp(),
  `REG_ACCOUNT` int(10) NOT NULL,
  `JR_STATE` int(11) NOT NULL DEFAULT 0,
  `PROCESS_STATE` int(10) NOT NULL DEFAULT 0,
  `UPDATE_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESS_STATE_UP_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESS_START_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESSCODE` varchar(30) DEFAULT NULL,
  `PROCESS_END_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `PROCESS_CHART`
--

CREATE TABLE `PROCESS_CHART` (
  `NO` int(11) NOT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp(),
  `ORDER_NO` int(30) NOT NULL,
  `PROCESS_CHART_STATE` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PROCESS_CHART`
--

INSERT INTO `PROCESS_CHART` (`NO`, `DATE`, `ORDER_NO`, `PROCESS_CHART_STATE`) VALUES
(10, '2024-08-18', 1, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `PRODUCTION`
--

CREATE TABLE `PRODUCTION` (
  `NO` int(11) NOT NULL,
  `PROCESSCODE` varchar(50) DEFAULT NULL,
  `LOT` varchar(30) DEFAULT NULL,
  `BOX_NO` int(10) DEFAULT NULL,
  `QUANTITY` int(11) DEFAULT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `STATE` int(1) NOT NULL DEFAULT 0 COMMENT '0은 생산입고 1은 출고',
  `OUT_DATE` date DEFAULT current_timestamp(),
  `DESCRIPTION` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `PRODUCTION_PART`
--

CREATE TABLE `PRODUCTION_PART` (
  `NO` int(11) NOT NULL,
  `PART_NAME` varchar(30) NOT NULL,
  `SUB_PART_NAME` varchar(30) NOT NULL,
  `PROCESS_RATE` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PRODUCTION_PART`
--

INSERT INTO `PRODUCTION_PART` (`NO`, `PART_NAME`, `SUB_PART_NAME`, `PROCESS_RATE`) VALUES
(1, 'VF33 CAB LH', 'CAB LH', 884),
(2, 'VF33 CAB RH', 'CAB RH', 884),
(3, 'VF34 SAB LH', 'SAB LH', 395),
(4, 'VF34 SAB RH', 'SAB RH', 395),
(5, 'VF34 DAB ', 'DAB', 412),
(6, 'VF3 CENTER', 'CENTER', 646),
(7, 'VF33 PAB ', 'PAB', 1044),
(8, 'VF34 KAB', 'KAB', 919),
(9, 'VF7 PAB', 'PAB', 1044),
(10, 'VF6 PAB', 'PAB', 1044);

-- --------------------------------------------------------

--
-- 테이블 구조 `PRODUCTS`
--

CREATE TABLE `PRODUCTS` (
  `NO` int(11) NOT NULL,
  `PRODUCT_CODE` varchar(50) DEFAULT NULL,
  `CAR` varchar(30) DEFAULT NULL,
  `LOCATION` varchar(30) NOT NULL,
  `COMPANY` varchar(30) DEFAULT NULL,
  `PRODUCT_NAME` varchar(50) DEFAULT NULL,
  `PRODUCT_BARCODE` varchar(50) DEFAULT NULL,
  `BARCODE_NO` varchar(30) DEFAULT NULL,
  `BARCODE_REV` varchar(30) DEFAULT NULL,
  `PRODUCT_CODE_NAME` varchar(30) NOT NULL,
  `PRODUCT_PART01` varchar(30) NOT NULL,
  `PRODUCT_FULLNAME` varchar(50) NOT NULL,
  `PRODUCT_DESC01` varchar(30) NOT NULL,
  `PRODUCT_DESC02` varchar(30) NOT NULL,
  `PRODUCT_DESC03` varchar(30) NOT NULL,
  `PRODUCT_PART` varchar(30) DEFAULT NULL,
  `CERT_DATE` varchar(30) DEFAULT NULL,
  `CERTIFY` int(11) DEFAULT NULL,
  `STATE` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PRODUCTS`
--

INSERT INTO `PRODUCTS` (`NO`, `PRODUCT_CODE`, `CAR`, `LOCATION`, `COMPANY`, `PRODUCT_NAME`, `PRODUCT_BARCODE`, `BARCODE_NO`, `BARCODE_REV`, `PRODUCT_CODE_NAME`, `PRODUCT_PART01`, `PRODUCT_FULLNAME`, `PRODUCT_DESC01`, `PRODUCT_DESC02`, `PRODUCT_DESC03`, `PRODUCT_PART`, `CERT_DATE`, `CERTIFY`, `STATE`) VALUES
(1, 'KAAL230007K', 'VF33', 'VN', 'VINFAST', 'DAB', '0', '0', '0', 'DAB FOLDING [VF33/VN]', 'FOLDING', 'DAB FOLDING [VF33/VN]', 'VF33 VN', '[VF33/VN]', 'VF33 DAB VN', 'DAB', '2024-02-20 오전 12:00:00', 1, 0),
(2, 'KAAL230007K-1', 'VF34', 'VN', 'VINFAST', 'DAB', 'KAAL230090K01', 'KAAL230090K', '01', 'DAB FOLDING [VF34/VN]', 'FOLDING', 'DAB FOLDING [VF34/VN]', 'VF34 VN', '[VF34/VN]', 'VF34 DAB VN', 'DAB', NULL, 1, 1),
(3, 'KAAL230011K', 'VF33', 'EU', 'VINFAST', 'DAB', 'KAAL230110K 00', 'KAAL230110K', '00', 'DAB FOLDING [VF33/EU]', 'FOLDING', 'DAB FOLDING [VF33/EU]', 'VF33 EU', '[VF33/EU]', 'VF33 DAB EU', 'DAB', '2024-03-15 오전 12:00:00', 1, 1),
(4, 'KAAL230020K', 'VF35', 'VN&EU', 'VINFAST', 'DAB', 'KAAL230010K00', 'KAAL230010K', '00', 'DAB FOLDING [VF35/VN&EU]', 'FOLDING', 'DAB FOLDING [VF35/VN&EU]', 'VF35 VN&EU', '[VF35/VN&EU]', 'VF35 DAB VN&EU', 'DAB', '2024-07-05 오전 12:00:00', 1, 1),
(5, 'KAAL230060K', 'VF35', 'US', 'VINFAST', 'DAB', 'KAAR230000K 00', 'KAAR230000K', '00', 'DAB FOLDING [VF35/US]', 'FOLDING', 'DAB FOLDING [VF35/US]', 'VF35 US', '[VF35/US]', 'VF35 DAB US', 'DAB', '2024-07-06 오전 12:00:00', 1, 1),
(6, 'KAAL230080K', 'LD DAB', 'DAB', 'VINFAST', 'DAB', 'KAAL230080K 01', 'KAAL230080K', '01', 'DAB FOLDING [LD]', 'FOLDING', 'DAB FOLDING [LD]', 'LD DAB', '[LD]', 'LD DAB', 'DAB', '2024-03-15 오전 12:00:00', 1, 0),
(7, 'KABL230000K', 'VF35', 'US', 'VINFAST', 'PAB', 'KABL230050C 00', 'KABL230050C', '00', 'PAB FOLDING [VF35/US]', 'FOLDING', 'PAB FOLDING [VF35/US]', 'VF35 US', '[VF35/US]', 'VF35 PAB US', 'PAB', '2024-07-11 오전 12:00:00', 1, 1),
(8, 'KABL230080K', 'VF33', 'VN&EU', 'VINFAST', 'PAB', '0', '0', '0', 'PAB FOLDING [VF33/VN&EU]', 'FOLDING', 'PAB FOLDING [VF33/VN&EU]', 'VF33 VN&EU', '[VF33/VN&EU]', 'VF33 PAB VN&EU', 'PAB', '2024-02-16 오전 12:00:00', 1, 1),
(9, 'KABL230080K-1', 'VF33', 'VN&EU', 'VINFAST', 'PAB', 'KABL230011K 01', 'KABL230011K', '01', 'PAB FOLDING [VF33/VN&EU]', 'FOLDING', 'PAB FOLDING [VF33/VN&EU]', 'VF33 VN&EU', '[VF33/VN&EU]', 'VF33 PAB VN&EU', 'PAB', '2024-07-09 오전 12:00:00', 1, 1),
(10, 'KACL230090K', 'VF33', 'FRT-CTR', 'VINFAST', 'SAB', 'KACL230090K 00', 'KACL230090K', '00', 'SAB CUSHION [VF33/FRT/CTR]', 'CUSHION', 'SAB CUSHION [VF33/FRT/CTR]', 'VF33 FRT-CTR', '[VF33/FRT/CTR]', 'VF33 FRT-CTR', 'SAB', '2024-03-13 오전 12:00:00', 1, 1),
(11, 'KACL231040K', 'VF33', 'FRT-LH', 'VINFAST', 'SAB', 'KACL231040K 01', 'KACL231040K', '01', 'SAB CUSHION [VF33/FRT/LH/70]', 'CUSHION', 'SAB CUSHION [VF33/FRT/LH/70]', 'VF33 FRT-LH', '[VF33/FRT/LH/70]', 'VF33 FRT-LH', 'SAB', '2024-03-07 오전 12:00:00', 1, 0),
(12, 'KACL231040K-2', 'VF34', 'FR-LH 75mm', 'VINFAST', 'SAB', 'KACL231040K 02', 'KACL231040K', '02', 'SAB CUSHION [VF34/FRT/LH/75]', 'CUSHION', 'SAB CUSHION [VF34/FRT/LH/75]', 'VF34 FR-LH 75mm', '[VF34/FRT/LH/75]', 'VF34 FR-LH 75mm', 'SAB', '2024-03-12 오전 12:00:00', 1, 1),
(13, 'KACL231050K', 'VF33', 'FRT-RH', 'VINFAST', 'SAB', 'KACL231050K 01', 'KACL231050K', '01', 'SAB CUSHION [VF33/FRT/RH/70]', 'CUSHION', 'SAB CUSHION [VF33/FRT/RH/70]', 'VF33 FRT-RH', '[VF33/FRT/RH/70]', 'VF33 FRT-RH', 'SAB', '2024-02-26 오전 12:00:00', 1, 0),
(14, 'KACL231050K-2', 'VF34', 'FR-RH 75mm', 'VINFAST', 'SAB', 'KACL231050K 02', 'KACL231050K', '02', 'SAB CUSHION [VF34/FRT/RH/75]', 'CUSHION', 'SAB CUSHION [VF34/FRT/RH/75]', 'VF34 FR-RH 75mm', '[VF34/FRT/RH/75]', 'VF34 FR-RH 75mm', 'SAB', '2024-03-14 오전 12:00:00', 1, 1),
(15, 'KACL360010K', 'VF33', 'CeAB', 'VINFAST', 'PROTECTOR', '0', '0', '0', 'PROTECTOR [VF33/CeAB]', 'PROTECTOR', 'PROTECTOR [VF33/CeAB]', 'VF33 CeAB', '[VF33/CeAB]', 'VF33 CeAB', 'PROTECTOR', '2024-03-13 오전 12:00:00', 1, 0),
(16, 'KADL230060K', 'VF33', 'CAB-LH', 'VINFAST', 'CAB', 'KADL230060K 00', 'KADL230060K', '00', 'CAB CUSHION [VF33/VN&EU/LH]', 'CUSHION', 'CAB CUSHION [VF33/VN&EU/LH]', 'VF33 CAB-LH', '[VF33/VN&EU/LH]', 'VF33 CAB-LH', 'CAB', '2024-02-15 오전 12:00:00', 1, 0),
(17, 'KADL230070K', 'VF33', 'CAB-RH', 'VINFAST', 'CAB', 'KADL230070K 00', 'KADL230070K', '00', 'CAB CUSHION [VF33/VN&EU/RH]', 'CUSHION', 'CAB CUSHION [VF33/VN&EU/RH]', 'VF33 CAB-RH', '[VF33/VN&EU/RH]', 'VF33 CAB-RH', 'CAB', '2024-02-15 오전 12:00:00', 1, 0),
(18, 'KAEL230041K', 'VF33', 'KAB', 'VINFAST', 'KAB', 'KAEL230041K 00', 'KAEL230041K', '00', 'KAB CUSHION [VF33]', 'CUSHION', 'KAB CUSHION [VF33]', 'VF33 KAB', '[VF33]', 'VF33 KAB', 'KAB', '2024-02-20 오전 12:00:00', 1, 0),
(19, 'KAEL230041K-1', 'VF34', 'KAB', 'VINFAST', 'KAB', 'KAEL230041K 01', 'KAEL230041K', '01', 'KAB CUSHION [VF34]', 'CUSHION', 'KAB CUSHION [VF34]', 'VF34 KAB', '[VF34]', 'VF34 KAB', 'KAB', '2024-03-15 오전 12:00:00', 1, 1),
(20, 'KABL230000K', 'VF35', 'US', 'VINFAST', 'PAB', 'KAAR230000K 00', 'KAAR230000K', '00', 'PAB FOLDING [VF35/US]', 'FOLDING', 'PAB FOLDING [VF35/US]', 'VF35/US PAB', '[VF35/US]', 'VF35/US PAB ', 'PAB', '2024-07-11 오전 12:00:00', 1, 1),
(21, 'KABL230010K', 'VF35', 'VN&EU', 'VINFAST', 'PAB', 'KABL230010K 02', 'KABL230010K', '02', 'PAB FOLDING [VF35/VN&EU]', 'FOLDING', 'PAB FOLDING [VF35/VN&EU]', 'VF35/VN&EU PAB', '[VF35/VN&EU]', 'VF35/VN&EU PAB ', 'PAB', '2024-07-25 오전 12:00:00', 1, 1),
(22, 'KADL230220K', 'VF33 ', 'CAB-LH', 'VINFAST', 'CAB', 'KADL230220K 00', 'KADL230220K', '00', 'CAB CUSHION [VF33/LH]신형', 'CUSHION', 'CAB CUSHION [VF33/LH]', 'VF33 CAB-LH', '[VF33 CAB-LH]', 'VF33 CAB-LH', 'CAB', '45504', 1, 1),
(23, 'KADL230230K', 'VF33 ', 'CAB-RH', 'VINFAST', 'CAB', 'KADL230230K 00', 'KADL230230K', '00', 'CAB CUSHION [VF33/RH]신형', 'CUSHION', 'CAB CUSHION [VF33/RH]', 'VF33 CAB-RH', '[VF33 CAB-RH]', 'VF33 CAB-RH', 'CAB', '45504', 1, 1),
(24, 'KABL230110K', 'VF34', 'PAB', 'VINFAST', 'PAB', 'KABL230110K 00', 'KABL230110K', '00', 'PAB_FOLDING_VF34_US', 'FOLDING', 'PAB_FOLDING_[VF34_US]', 'VF34 PAB_US', '[VF34 PAB_US]', 'VF34 PAB_US', 'PAB', NULL, 0, 1),
(25, 'KABL230090K', 'VF33', 'PAB', 'VINFAST', 'PAB', 'KABL230090K 00', 'KABL230090K', '00', 'PAB FOLDING VF33 US', 'FOLDING', 'PAB FOLDING [VF33 US]', 'VF33 PAB US', '[VF33 PAB US]', 'VF33 PAB US', 'PAB', NULL, 0, 1),
(31, '2', '1', '1', '1', '11', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '2024-12-04', 1, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `PRODUCTS_INVENTORY`
-- (See below for the actual view)
--
CREATE TABLE `PRODUCTS_INVENTORY` (
`NO` int(11)
,`PRODUCT_CODE` varchar(50)
,`CAR` varchar(30)
,`LOCATION` varchar(30)
,`PRODUCT_NAME` varchar(50)
,`PRODUCT_FULLNAME` varchar(50)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `SCANNED_BARCODE`
--

CREATE TABLE `SCANNED_BARCODE` (
  `NO` int(11) NOT NULL,
  `BARCODE` varchar(255) NOT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `PRODUCTION_ID` int(10) DEFAULT NULL,
  `PROCESS_CODE` varchar(30) DEFAULT NULL,
  `BOX_NO` varchar(30) DEFAULT NULL,
  `LOT` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `SCM_REGISTER`
--

CREATE TABLE `SCM_REGISTER` (
  `NO` int(11) NOT NULL,
  `BARCODE` varchar(50) NOT NULL,
  `REG_DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `SCM_REGISTER`
--

INSERT INTO `SCM_REGISTER` (`NO`, `BARCODE`, `REG_DATE`) VALUES
(1, 'KAEL230041K01QD1810115', '2024-09-06'),
(2, 'KAEL230041K01QD1810114', '2024-09-06'),
(3, 'KAEL230041K01QD1810113', '2024-09-06'),
(4, 'KAEL230041K01QD1810112', '2024-09-06'),
(5, 'KAEL230041K01QD1810111', '2024-09-06'),
(6, 'KACL231040K02QI0510037', '2024-09-06'),
(7, 'KACL231040K02QI0510023', '2024-09-06'),
(8, 'KACL231040K02QI0510024', '2024-09-06'),
(9, 'KACL231040K02QI0510025', '2024-09-06'),
(10, 'KACL231040K02QI0510008', '2024-09-06'),
(11, 'KACL231050K02QE2310300', '2024-09-06'),
(12, 'KACL231050K02QE2310299', '2024-09-06'),
(13, 'KACL231050K02QE2310298', '2024-09-06'),
(14, 'KACL231050K02QE2310297', '2024-09-06'),
(15, 'KACL231050K02QE2310296', '2024-09-06'),
(16, 'KACL230090K00QD2210583', '2024-09-06'),
(17, 'KACL230090K00QD2210582', '2024-09-06'),
(18, 'KACL230090K00QD2210581', '2024-09-06'),
(19, 'KACL230090K00QD2210580', '2024-09-06'),
(20, 'KACL230090K00QD2210579', '2024-09-06'),
(21, 'KACL230090K00QD3010350', '2024-09-07'),
(22, 'KACL230090K00QD3010349', '2024-09-07'),
(23, 'KACL230090K00QD3010348', '2024-09-07'),
(24, 'KACL230090K00QD3010347', '2024-09-07'),
(25, 'KACL230090K00QD3010346', '2024-09-07'),
(26, 'KAEL230041K01QD1710026', '2024-09-07'),
(27, 'KAEL230041K01QD1710027', '2024-09-07'),
(28, 'KAEL230041K01QD1710028', '2024-09-07'),
(29, 'KAEL230041K01QD1710029', '2024-09-07'),
(30, 'KAEL230041K01QD1710030', '2024-09-07'),
(31, 'KABL230080K01QH2710426', '2024-09-07'),
(32, 'KABL230080K01QH2710427', '2024-09-07'),
(33, 'KABL230080K01QH2710421', '2024-09-07'),
(34, 'KABL230080K01QH2710425', '2024-09-07'),
(35, 'KACL231050K02QI0911391', '2024-09-10'),
(36, 'KACL231050K02QI0911393', '2024-09-10'),
(37, 'KACL231050K02QI0911395', '2024-09-10'),
(38, 'KACL231050K02QI0911314', '2024-09-10'),
(39, 'KACL231050K02QI0911313', '2024-09-10'),
(40, 'KADL230220K00QI1011127', '2024-09-10'),
(41, 'KADL230220K00QI1011126', '2024-09-10'),
(42, 'KADL230220K00QI1011125', '2024-09-10'),
(43, 'KAEL230041K01QD2210080', '2024-09-11'),
(44, 'KAEL230041K01QD2210079', '2024-09-11'),
(45, 'KAEL230041K01QD2210078', '2024-09-11'),
(46, 'KAEL230041K01QD2210077', '2024-09-11'),
(47, 'KAEL230041K01QD2210076', '2024-09-11'),
(48, 'KADL230230K00QI1012247', '2024-09-11'),
(49, 'KADL230230K00QI1012248', '2024-09-11'),
(50, 'KADL230230K00QI1012250', '2024-09-11'),
(51, 'KADL230230K00QI1012246', '2024-09-11'),
(52, 'KADL230230K00QI1012249', '2024-09-11'),
(53, 'KACL231050K02QI1012482', '2024-09-11'),
(54, 'KACL231050K02QI1012483', '2024-09-11'),
(55, 'KACL231050K02QI1012561', '2024-09-11'),
(56, 'KACL231050K02QI1012559', '2024-09-11'),
(57, 'KACL231050K02QI1012560', '2024-09-11'),
(58, 'KABL230011K01QI1011691', '2024-09-11'),
(59, 'KABL230011K01QI1011691', '2024-09-11'),
(60, 'KABL230011K01QI1011685', '2024-09-11'),
(61, 'KABL230011K01QI1011693', '2024-09-11'),
(62, 'KACL231040K02QI1210394', '2024-09-12'),
(63, 'KACL231040K02QI1210395', '2024-09-12'),
(64, 'KACL231040K02QI1210396', '2024-09-12'),
(65, 'KADL230220K00QI1011986', '2024-09-12'),
(66, 'KADL230220K00QI1011984', '2024-09-12'),
(67, 'KADL230220K00QI1011985', '2024-09-12'),
(68, 'KABL230011K01QI1210514', '2024-09-12'),
(69, 'KABL230011K01QI1210513', '2024-09-12'),
(70, 'KABL230011K01QI1210503', '2024-09-12'),
(71, 'KACL230090K00QE3110689', '2024-09-23'),
(72, 'KACL230090K00QE3110690', '2024-09-23'),
(73, 'KACL230090K00QE3110691', '2024-09-23'),
(74, 'KABL230011K01QI2310004', '2024-09-23'),
(75, 'KABL230011K01QI2310003', '2024-09-23'),
(76, 'KABL230011K01QI2310002', '2024-09-23'),
(77, 'KADL230230K00QI2311041', '2024-09-23'),
(78, 'KADL230230K00QI2311042', '2024-09-23'),
(79, 'KADL230230K00QI2311043', '2024-09-23'),
(80, 'KADL230220K00QI2310323', '2024-09-23'),
(81, 'KADL230220K00QI230324', '2024-09-23'),
(82, 'KADL230220K00QI2310325', '2024-09-23'),
(83, 'KACL230090K00QI2010091', '2024-09-25'),
(84, 'KACL230090K00QI2010276', '2024-09-25'),
(85, 'KACL230090K00QI2010492', '2024-09-25'),
(86, 'KADL230220K00QI2310404', '2024-09-25'),
(87, 'KADL230220K00QI2310403', '2024-09-25'),
(88, 'KADL230220K00QI2310402', '2024-09-25'),
(89, 'KADL230230K00QI2310737', '2024-09-25'),
(90, 'KADL230230K00QI2310736', '2024-09-25'),
(91, 'KADL230230K00QI2310734', '2024-09-25'),
(92, 'KABL230011K01QI2311329', '2024-09-25'),
(93, 'KABL230011K01QI2311333', '2024-09-25'),
(94, 'KABL230011K01QI2311331', '2024-09-25'),
(95, 'KACL231040K02QI2510678', '2024-09-26'),
(96, 'KACL231040K02QI2510679', '2024-09-26'),
(97, 'KACL231040K02QI2510680', '2024-09-26'),
(98, 'KACL231040K02QI2510681', '2024-09-26'),
(99, 'KACL230090K00QI2010516', '2024-09-26'),
(100, 'KACL230090K00QI2010517', '2024-09-26'),
(101, 'KACL230090K00QI2010518', '2024-09-26'),
(102, 'KABL230011K01QI2510555', '2024-09-26'),
(103, 'KABL230011K01QI2510554', '2024-09-26'),
(104, 'KABL230011K01QI2510553', '2024-09-26'),
(105, 'KADL230220K00QI2310572', '2024-09-26'),
(106, 'KADL230220K00QI2310570', '2024-09-26'),
(107, 'KADL230220K00QI2310571', '2024-09-26'),
(108, 'KADL230230K00QI2311031', '2024-09-26'),
(109, 'KADL230230K00QI2311035', '2024-09-26'),
(110, 'KADL230230K00QI2311033', '2024-09-26'),
(111, 'KABL230010K02QI2610203', '2024-09-27'),
(112, 'KABL230010K02QI2610201', '2024-09-27'),
(113, 'KABL230010K02QI2610197', '2024-09-27'),
(114, 'KABL230010K02QI2610199', '2024-09-27'),
(115, 'KABL230010K02QI2610204', '2024-09-27'),
(116, 'KACL230090K00QI2010973', '2024-09-27'),
(117, 'KACL230090K00QI2010972', '2024-09-27'),
(118, 'KACL230090K00QI2010971', '2024-09-27'),
(119, 'KACL231050K02QI2510932', '2024-09-27'),
(120, 'KACL231050K02QI2510930', '2024-09-27'),
(121, 'KACL231050K02QI2510929', '2024-09-27'),
(122, 'kaKACL230090K00QI2010991치230090ㅏ00뺘2010991', '2024-10-01'),
(123, 'KACL230090K00QI2010992', '2024-10-01'),
(124, 'KACL230090K00QI2010993', '2024-10-01'),
(125, 'KAEL230041K01QD1910059', '2024-10-01'),
(126, 'KAEL230041K01QD1910058', '2024-10-01'),
(127, 'KACL230090K00QI2011161', '2024-10-02'),
(128, 'KACL230090K00QI2011162', '2024-10-02'),
(129, 'KACL230090K00QI2011163', '2024-10-02'),
(130, 'KAEL230041K01QE0310169', '2024-10-04'),
(131, 'KAEL230041K01QE0310168', '2024-10-04'),
(132, 'KAEL230041K01QE0310167', '2024-10-04'),
(133, 'KACL230090K00QJ0211398', '2024-10-07'),
(134, 'KACL230090K00QJ0211399', '2024-10-07'),
(135, 'KACL230090K00QJ0211400', '2024-10-07'),
(136, 'KACL230090K00QJ0211479', '2024-10-08'),
(137, 'KACL230090K00QJ0211479', '2024-10-08'),
(138, 'KACL230090K00QJ0211480', '2024-10-08'),
(139, 'KACL230090K00QJ0210991', '2024-10-10'),
(140, 'KACL230090K00QJ0210992', '2024-10-10'),
(141, 'KACL230090K00QJ0210993', '2024-10-10'),
(142, 'KADL230220K00QJ0910073', '2024-10-10'),
(143, 'KADL230220K00QJ0910074', '2024-10-10'),
(144, 'KADL230220K00QJ0910076', '2024-10-10'),
(145, 'KADL230230K00QJ0910081', '2024-10-10'),
(146, 'KADL230230K00QJ0910079', '2024-10-10'),
(147, 'KADL230230K00QJ0910080', '2024-10-10'),
(148, 'KACL231050K02QJ1010193', '2024-10-10'),
(149, 'KACL231050K02QJ1010192', '2024-10-10'),
(150, 'KACL231050K02QJ1010191', '2024-10-10'),
(151, 'KAAL230090K01QE3110043', '2024-10-11'),
(152, 'KAAL230090K01QE3110043', '2024-10-11'),
(153, 'KAAL230011K01QJ0710468', '2024-10-11'),
(154, 'KAAL230090K01QE3110015', '2024-10-11'),
(155, 'KAAL230011K01QJ0710469', '2024-10-11'),
(156, 'KAAL230011K01QJ0710460', '2024-10-11'),
(157, 'KABL230011K01QJ0710053', '2024-10-11'),
(158, 'KABL230011K01QJ0710058', '2024-10-11'),
(159, 'KABL230011K01QJ0710056', '2024-10-11'),
(160, 'KACL231050K02QJ1110637', '2024-10-11'),
(161, 'KACL231050K02QJ1110636', '2024-10-11'),
(162, 'KACL231050K02QJ1110635', '2024-10-11'),
(163, 'KACL230090K00QJ1110427', '2024-10-11'),
(164, 'KACL230090K00QJ1110246', '2024-10-11'),
(165, 'KACL230090K00QJ1110426', '2024-10-11'),
(166, 'KADL230220K00QJ1111285', '2024-10-14'),
(167, 'KADL230220K00QJ1111284', '2024-10-14'),
(168, 'KADL230220K00QJ1111283', '2024-10-14'),
(169, 'KADL230230K00QJ1111226', '2024-10-14'),
(170, 'KADL230230K00QJ1111225', '2024-10-14'),
(171, 'KADL230230K00QJ1111227', '2024-10-14'),
(172, 'KACL230090K00QJ1410162', '2024-10-14'),
(173, 'KACL230090K00QJ1410163', '2024-10-14'),
(174, 'KACL230090K00QJ1410004', '2024-10-14'),
(175, 'KACL231050K02QJ1410309', '2024-10-14'),
(176, 'KACL231050K02QJ1410310', '2024-10-14'),
(177, 'KACL231050K02QJ1410311', '2024-10-14'),
(178, 'kaal230090K01QE3010646', '2024-10-15'),
(179, 'KAAL230090K01QE3010647', '2024-10-15'),
(180, 'KAAL230090K01QE3010633', '2024-10-15'),
(181, 'KACL230090K00QJ1410975', '2024-10-15'),
(182, 'KACL230090K00QJ1410974', '2024-10-15'),
(183, 'KACL230090K00QJ1410973', '2024-10-15'),
(184, 'KACL231050K02QJ1411378', '2024-10-15'),
(185, 'KACL231050K02QJ1411369', '2024-10-15'),
(186, 'KACL231050K02QJ1411368', '2024-10-15'),
(187, 'KACL231050K02QJ1810874', '2024-10-17'),
(188, 'KACL231050K02QJ1810875', '2024-10-17'),
(189, 'KACL231050K02QJ1810876', '2024-10-17'),
(190, 'KACL231040K02QJ1710012', '2024-10-17'),
(191, 'KACL231040K02QJ1710031', '2024-10-17'),
(192, 'KACL231040K02QJ1710030', '2024-10-17'),
(193, 'KAEL230041K01QE1410490', '2024-10-17'),
(194, 'KAEL230041K01QE1410489', '2024-10-17'),
(195, 'KAEL230041K01QE1410488', '2024-10-17'),
(196, 'KACL230090K00QJ1710624', '2024-10-17'),
(197, 'KACL230090K00QJ1710623', '2024-10-17'),
(198, 'KACL230090K00QJ1710622', '2024-10-17'),
(199, ' KAAL230011K01QJ1710818', '2024-10-17'),
(200, 'KAAL230011K01QJ1710816', '2024-10-17'),
(201, 'KAAL230011K01QJ1710815', '2024-10-17'),
(202, 'KABL230011K01QJ1810385', '2024-10-17'),
(203, 'KABL230011K01QJ1810387', '2024-10-17'),
(204, 'KABL230011K01QJ1810382', '2024-10-17'),
(205, 'KAAL230090K01QH1910092', '2024-10-17'),
(206, 'KAAL230090K01QH1910134', '2024-10-17'),
(207, 'KAAL230090K01QH1910090', '2024-10-17'),
(208, 'KACL231040K02QJ1810793', '2024-10-22'),
(209, 'KACL231040K02QJ1810794', '2024-10-22'),
(210, 'KACL231040K02QJ1810795', '2024-10-22'),
(211, 'KAEL230041K01QE0210350', '2024-10-22'),
(212, 'KAEL230041K01QE0210349', '2024-10-22'),
(213, 'KAEL230041K01QE0210348', '2024-10-22'),
(214, 'KAAL230090K01QJ1811935', '2024-10-22'),
(215, 'KAAL230090K01QJ1811944', '2024-10-22'),
(216, 'KAAL230090K01QJ1811931', '2024-10-22'),
(217, 'KADL230230K00QJ2110277', '2024-10-22'),
(218, 'KADL230230K00QJ2110278', '2024-10-22'),
(219, 'KADL230230K00QJ2110279', '2024-10-22'),
(220, 'KACL230090K00QJ2211301', '2024-10-22'),
(221, 'KACL230090K00QJ2211302', '2024-10-22'),
(222, 'KACL230090K00QJ2211303', '2024-10-22'),
(223, 'KACL230090K00QJ2311110', '2024-10-24'),
(224, 'KACL230090K00QJ2311109', '2024-10-24'),
(225, 'KACL230090K00QJ2311108', '2024-10-24'),
(226, 'KAEL230041K01QD2610470', '2024-10-24'),
(227, 'KAEL230041K01QD2610469', '2024-10-24'),
(228, 'KAEL230041K01QD2610468', '2024-10-24'),
(229, 'KADL230230K00QJ2110194', '2024-10-24'),
(230, 'KADL230230K00QJ2110196', '2024-10-24'),
(231, 'KADL230230K00QJ2110195', '2024-10-24'),
(232, 'KAAL230090K01QJ1811294', '2024-10-25'),
(233, 'KAAL230090K01QJ1811298', '2024-10-25'),
(234, 'KAAL230090K01QJ1811287', '2024-10-25'),
(235, 'KACL231050K02QJ2310590', '2024-10-25'),
(236, 'KACL231050K02QJ2310589', '2024-10-25'),
(237, 'KACL231050K02QJ2310588', '2024-10-25'),
(238, 'KACL230090K00QJ2410604', '2024-10-25'),
(239, 'KACL230090K00QJ2410605', '2024-10-25'),
(240, 'KACL230090K00QJ2410603', '2024-10-25'),
(241, 'KABL230011K01QJ1810249', '2024-10-25'),
(242, 'KABL230011K01QJ1810245', '2024-10-25'),
(243, 'KABL230011K01QJ1810244', '2024-10-25'),
(244, 'KABL230010K02QJ2210412', '2024-10-25'),
(245, 'KABL230010K02QJ2210413', '2024-10-25'),
(246, 'KABL230010K02QJ2210415', '2024-10-25'),
(247, 'KADL230220K00QJ2110352', '2024-10-25'),
(248, 'KADL230220K00QJ2110351', '2024-10-25'),
(249, 'KADL230220K00QJ2110350', '2024-10-25'),
(250, 'KADL230230K00QJ2110074', '2024-10-25'),
(251, 'KADL230230K00QJ2110076', '2024-10-25'),
(252, 'KADL230230K00QJ2110075', '2024-10-25'),
(253, 'KACL230090K00QJ2410206', '2024-10-26'),
(254, 'KACL230090K00QJ2410207', '2024-10-26'),
(255, 'KACL230090K00QJ2410208', '2024-10-26'),
(256, 'KADL230230K00QJ2110026', '2024-10-26'),
(257, 'KADL230230K00QJ2110022', '2024-10-26'),
(258, 'KADL230230K00QJ2110024', '2024-10-26'),
(259, 'KADL230220K00QJ2110356', '2024-10-26'),
(260, 'KADL230220K00QJ2110354', '2024-10-26'),
(261, 'KADL230220K00QJ2110353', '2024-10-26'),
(262, 'KAEL230041K01QE0210060', '2024-10-26'),
(263, 'KAEL230041K01QE0210059', '2024-10-26'),
(264, 'KAEL230041K01QE0210058', '2024-10-26'),
(265, 'KABL230011K01QJ1810138', '2024-10-26'),
(266, 'KABL230011K01QJ1810134', '2024-10-26'),
(267, 'KABL230011K01QJ1810137', '2024-10-26'),
(268, 'KABL230010K02QJ2210374', '2024-10-26'),
(269, 'KABL230010K02QJ2210375', '2024-10-26'),
(270, 'KABL230010K02QJ2210372', '2024-10-26'),
(271, 'KACL230090K00QJ2810528', '2024-10-28'),
(272, 'KACL230090K00QJ2810529', '2024-10-28'),
(273, 'KACL230090K00QJ2810530', '2024-10-28'),
(274, 'KADL230230K00QJ2810270', '2024-10-28'),
(275, 'KADL230230K00QJ2810269', '2024-10-28'),
(276, 'KADL230230K00QJ2810268', '2024-10-28'),
(277, 'KADL230220K00QJ2510882', '2024-10-28'),
(278, 'KADL230220K00QJ2510880', '2024-10-28'),
(279, 'KADL230220K00QJ2510883', '2024-10-28'),
(280, 'KAEL230041K01QE2110280', '2024-10-28'),
(281, 'KAEL230041K01QE2110279', '2024-10-28'),
(282, 'KAEL230041K01QE2110272', '2024-10-28'),
(283, 'KAAL230090K01QJ1811319', '2024-10-28'),
(284, 'KAAL230090K01QJ1811316', '2024-10-28'),
(285, 'KAAL230090K01QJ1811317', '2024-10-28'),
(286, 'KABL230010K02QJ2210308', '2024-10-28'),
(287, 'KABL230010K02QJ2210310', '2024-10-28'),
(288, 'KABL230010K02QJ2210309', '2024-10-28'),
(289, 'KABL230011K01QJ2510220', '2024-10-28'),
(290, 'KABL230011K01QJ2510222', '2024-10-28'),
(291, 'KABL230011K01QJ2510221', '2024-10-28'),
(292, 'KADL230220K00QJ2811031', '2024-10-29'),
(293, 'KADL230220K00QJ2811030', '2024-10-29'),
(294, 'KADL230220K00QJ2811029', '2024-10-29'),
(295, 'KADL230230K00QJ2810071', '2024-10-29'),
(296, 'KADL230230K00QJ2810072', '2024-10-29'),
(297, 'KADL230230K00QJ2810073', '2024-10-29'),
(298, 'KAEL230041K01QE2810255', '2024-10-29'),
(299, 'KAEL230041K01QE2810256', '2024-10-29'),
(300, 'KAEL230041K01QE2810257', '2024-10-29'),
(301, 'KABL230011K01QJ2510144', '2024-10-29'),
(302, 'KABL230011K01QJ2510152', '2024-10-29'),
(303, 'KABL230011K01QJ2510150', '2024-10-29'),
(304, 'KAAL230090K01QJ1811592', '2024-10-29'),
(305, 'KAAL230090K01QJ1811586', '2024-10-29'),
(306, 'KAAL230090K01QJ1811585', '2024-10-29'),
(307, 'KABL230010K02QJ2210290', '2024-10-29'),
(308, 'KABL230010K02QJ2210289', '2024-10-29'),
(309, 'KABL230010K02QJ2210213', '2024-10-29'),
(310, 'KADL230220K00QJ2810955', '2024-10-30'),
(311, 'KADL230220K00QJ2810956', '2024-10-30'),
(312, 'KADL230220K00QJ2810954', '2024-10-30'),
(313, 'KADL230230K00QJ2810032', '2024-10-30'),
(314, 'KADL230230K00QJ2810033', '2024-10-30'),
(315, 'KADL230230K00QJ2810034', '2024-10-30'),
(316, 'KABL230011K01QJ2510676', '2024-10-30'),
(317, 'KABL230011K01QJ2510677', '2024-10-30'),
(318, 'KABL230011K01QJ2510678', '2024-10-30'),
(319, 'KAAL230090K01QJ1811678', '2024-10-30'),
(320, 'KAAL230090K01QJ1811677', '2024-10-30'),
(321, 'KAAL230090K01QJ1811676', '2024-10-30'),
(322, 'KADL230220K00QJ2910202', '2024-11-01'),
(323, 'KADL230220K00QJ2910203', '2024-11-01'),
(324, 'KADL230220K00QJ2910201', '2024-11-01'),
(325, 'KADL230230K00QJ3110050', '2024-11-01'),
(326, 'KADL230230K00QJ3110052', '2024-11-01'),
(327, 'KADL230230K00QJ3110051', '2024-11-01'),
(328, 'KACL230090K00QJ2810571', '2024-11-01'),
(329, 'KACL230090K00QJ2810572', '2024-11-01'),
(330, 'KACL230090K00QJ2810573', '2024-11-01'),
(331, 'KABL230011K01QJ2510380', '2024-11-01'),
(332, 'KABL230011K01QJ2510382', '2024-11-01'),
(333, 'KABL230011K01QJ2510386', '2024-11-01'),
(334, 'KADL230220K00QK0411402', '2024-11-04'),
(335, 'KADL230220K00QK0411403', '2024-11-04'),
(336, 'KADL230230K00QK0410490', '2024-11-04'),
(337, 'KADL230220K00QK0411404', '2024-11-04'),
(338, 'KADL230230K00QK0410491', '2024-11-04'),
(339, 'KADL230230K00QK0410492', '2024-11-04'),
(340, 'KABL230011K01QK0410728', '2024-11-04'),
(341, 'KABL230011K01QJ2510395', '2024-11-04'),
(342, 'KABL230011K01QK0410670', '2024-11-04'),
(343, 'KACL231040K02QJ2211704', '2024-11-07'),
(344, 'KACL231040K02QJ2211695', '2024-11-07'),
(345, 'KACL231040K02QJ2211696', '2024-11-07'),
(346, 'KADL230230K00QK0411884', '2024-11-07'),
(347, 'KADL230230K00QK0411882', '2024-11-07'),
(348, 'KADL230230K00QK0411883', '2024-11-07'),
(349, 'KADL230220K00QK0610450', '2024-11-07'),
(350, 'KADL230220K00QK0610449', '2024-11-07'),
(351, 'KADL230220K00QK0610448', '2024-11-07'),
(352, 'KAAL230090K01QJ1811632', '2024-11-07'),
(353, 'KAAL230090K01QJ1811633', '2024-11-07'),
(354, 'KAAL230090K01QJ1811627', '2024-11-07'),
(355, 'KABL230011K01QK0410639', '2024-11-07'),
(356, 'KABL230011K01QK0410635', '2024-11-07'),
(357, 'KABL230011K01QK0410633', '2024-11-07'),
(358, 'KACL231040K02QJ2211779', '2024-11-08'),
(359, 'KACL231040K02QJ2211780', '2024-11-08'),
(360, 'KACL231040K02QJ2211781', '2024-11-08'),
(361, 'KADL230230K00QK0710091', '2024-11-08'),
(362, 'KADL230230K00QK0710101', '2024-11-08'),
(363, 'KADL230220K00QK0110990', '2024-11-08'),
(364, 'KADL230220K00QK0110991', '2024-11-08'),
(365, 'KADL230220K00QK0110992', '2024-11-08'),
(366, 'KADL230230K00QK0710102', '2024-11-08'),
(367, 'KAAL230090K01QK0710279', '2024-11-08'),
(368, 'KAAL230090K01QK0710281', '2024-11-08'),
(369, 'KAAL230090K01QK0710278', '2024-11-08'),
(370, 'KABL230011K01QK0411927', '2024-11-08'),
(371, 'KABL230011K01QK0411922', '2024-11-08'),
(372, 'KABL230011K01QK0411923', '2024-11-08'),
(373, 'KACL230090K00QJ2810822', '2024-11-11'),
(374, 'KACL230090K00QJ2810823', '2024-11-11'),
(375, 'KACL230090K00QJ2810824', '2024-11-11'),
(376, 'KACL231040K02QK0110774', '2024-11-11'),
(377, 'KACL231040K02QK0110773', '2024-11-11'),
(378, 'KACL231040K02QK0110772', '2024-11-11'),
(379, 'KADL230220K00QK1110198', '2024-11-11'),
(380, 'KADL230220K00QK1110200', '2024-11-11'),
(381, 'KADL230220K00QK1110199', '2024-11-11'),
(382, 'KADL230230K00QK0810048', '2024-11-11'),
(383, 'KADL230230K00QK0810049', '2024-11-11'),
(384, 'KADL230230K00QK0810050', '2024-11-11'),
(385, 'KAAL230090K01QK0710164', '2024-11-11'),
(386, 'KAAL230090K01QK0710168', '2024-11-11'),
(387, 'KAAL230090K01QK0710158', '2024-11-11'),
(388, 'KABL230011K01QK0412050', '2024-11-11'),
(389, 'KABL230011K01QK0411912', '2024-11-11'),
(390, 'KABL230011K01QK0411913', '2024-11-11'),
(391, 'KACL230090K00QJ3010923', '2024-11-12'),
(392, 'KACL230090K00QJ3010920', '2024-11-12'),
(393, 'KACL230090K00QJ3010921', '2024-11-12'),
(394, 'KADL230230K00QK1110047', '2024-11-12'),
(395, 'KADL230220K00QK1110786', '2024-11-12'),
(396, 'KADL230220K00QK1110787', '2024-11-12'),
(397, 'KAAL230090K01QK1210355', '2024-11-13'),
(398, 'KAAL230090K01QK1210351', '2024-11-13'),
(399, 'KAAL230090K01QK1210363', '2024-11-13'),
(400, 'KACL230090K00QK0411515', '2024-11-18'),
(401, 'KACL230090K00QK0411514', '2024-11-18'),
(402, 'KACL230090K00QK0411513', '2024-11-18'),
(403, 'KADL230230K00QK1810313', '2024-11-18'),
(404, 'KADL230230K00QK1810314', '2024-11-18'),
(405, 'KADL230230K00QK1810315', '2024-11-18'),
(406, 'KAAL230090K01QK1810100', '2024-11-18'),
(407, 'KAAL230090K01QK1810099', '2024-11-18'),
(408, 'KAAL230090K01QK1810109', '2024-11-18'),
(409, 'KABL230010K02QK1810218', '2024-11-18'),
(410, 'KABL230011K01QK1410003', '2024-11-18'),
(411, 'KABL230011K01QK1410009', '2024-11-18'),
(412, 'KABL230010K02QK1810222', '2024-11-18'),
(413, 'KABL230010K02QK1810220', '2024-11-18'),
(414, 'KABL230011K01QK1410008', '2024-11-18'),
(415, 'KABL230011K01QK1410009', '2024-11-18'),
(416, 'KAAL230090K01QK1810004', '2024-11-19'),
(417, 'KAAL230090K01QK1810008', '2024-11-19'),
(418, 'KAAL230090K01QK1810011', '2024-11-19'),
(419, 'KABL230010K02QK1810284', '2024-11-19'),
(420, 'KABL230010K02QK1810286', '2024-11-19'),
(421, 'KABL230010K02QK1810283', '2024-11-19'),
(422, 'KABL230011K01QK0412048', '2024-11-19'),
(423, 'KABL230011K01QK0412034', '2024-11-19'),
(424, 'KABL230011K01QK0412036', '2024-11-19'),
(425, 'KADL230220K00QK1910500', '2024-11-20'),
(426, 'KADL230220K00QK1910498', '2024-11-20'),
(427, 'KADL230220K00QK1910499', '2024-11-20'),
(428, 'KABL230011K01QK1810572', '2024-11-20'),
(429, 'KABL230011K01QK1810571', '2024-11-20'),
(430, 'KABL230011K01QK1810568', '2024-11-20'),
(431, 'KAAL230090K01QK2010110', '2024-11-20'),
(432, 'KAAL230090K01QK2010109', '2024-11-20'),
(433, 'KAAL230090K01QK2010111', '2024-11-20'),
(434, 'KABL230010K02QK1810296', '2024-11-20'),
(435, 'KABL230010K02QK1810295', '2024-11-20'),
(436, 'KABL230010K02QK1810297', '2024-11-20'),
(437, 'KADL230230K00QK1910023', '2024-11-20'),
(438, 'KADL230230K00QK1910025', '2024-11-20'),
(439, 'KADL230230K00QK1910024', '2024-11-20'),
(440, 'KAAL230090K01QK2011469', '2024-11-21'),
(441, 'KAAL230090K01QK2011466', '2024-11-21'),
(442, 'KAAL230090K01QK2011467', '2024-11-21'),
(443, 'KABL230010K02QK2011319', '2024-11-21'),
(444, 'KABL230020C00OL1710310', '2024-11-21'),
(445, 'KABL230010K02QK2011318', '2024-11-21'),
(446, 'KABL230011K01QK2011197', '2024-11-21'),
(447, 'KABL230011K01QK2011189', '2024-11-21'),
(448, 'KABL230011K01QK2011195', '2024-11-21'),
(449, 'KACL231050K02QJ3110664', '2024-11-22'),
(450, 'KACL231050K02QJ3110663', '2024-11-22'),
(451, 'KACL231050K02QJ3110662', '2024-11-22'),
(452, 'KACL231040K02QK1910994', '2024-11-22'),
(453, 'KACL231040K02QK1910993', '2024-11-22'),
(454, 'KACL231040K02QK1910992', '2024-11-22'),
(455, 'KABL230011K01QK2111055', '2024-11-22'),
(456, 'KABL230011K01QK2111090', '2024-11-22'),
(457, 'KABL230011K01QK2111047', '2024-11-22'),
(458, 'KAAL230090K01QK2011369', '2024-11-22'),
(459, 'KAAL230090K01QK2011368', '2024-11-22'),
(460, 'KAAL230090K01QK2011367', '2024-11-02'),
(461, 'KABL230010K02QK2011201', '2024-11-22'),
(462, 'KABL230010K02QK2011200', '2024-11-22'),
(463, 'KABL230010K02QK2011202', '2024-11-22'),
(464, 'KADL230220K00QK1910697', '2024-11-26'),
(465, 'KADL230220K00QK1910700', '2024-11-26'),
(466, 'KADL230220K00QK1910698', '2024-11-26'),
(467, 'KADL230230K00QK1911305', '2024-11-26'),
(468, 'KADL230230K00QK1911303', '2024-11-26'),
(469, 'KADL230230K00QK1911304', '2024-11-26'),
(470, 'KAAL230090K01QK2510039', '2024-11-26'),
(471, 'KAAL230090K01QK2510042', '2024-11-26'),
(472, 'KAAL230090K01QK2510038', '2024-11-26'),
(473, 'KABL230011K01QK2210665', '2024-11-26'),
(474, 'KABL230011K01QK2210664', '2024-11-26'),
(475, 'KABL230011K01QK2210656', '2024-11-26'),
(476, 'KABL230010K02QK2210861', '2024-11-26'),
(477, 'KABL230010K02QK2210859', '2024-11-26'),
(478, 'KABL230010K02QK2210862', '2024-11-26'),
(479, 'KACL230090K00QK0610041', '2024-11-27'),
(480, 'KACL230090K00QK0610040', '2024-11-27'),
(481, 'KACL230090K00QK0610039', '2024-11-27'),
(482, 'KACL231040K02QK1910892', '2024-11-27'),
(483, 'KACL231040K02QK1910893', '2024-11-27'),
(484, 'KACL231040K02QK1910894', '2024-11-27'),
(485, 'KAAL230090K01QK2510088', '2024-11-27'),
(486, 'KAAL230090K01QK2510087', '2024-11-27'),
(487, 'KAAL230090K01QK2510084', '2024-11-27'),
(488, 'KABL230010K02QK2210929', '2024-11-27'),
(489, 'KABL230020C00OL0911085', '2024-11-27'),
(490, 'KABL230010K02QK2210930', '2024-11-27'),
(491, 'KABL230011K01QK2210783', '2024-11-27'),
(492, 'KABL230011K01QK2210785', '2024-11-27'),
(493, 'KABL230011K01QK2210782', '2024-11-27'),
(494, 'KADL230220K00QK2011660', '2024-11-28'),
(495, 'KADL230220K00QK2011662', '2024-11-28'),
(496, 'KADL230230K00QK2610050', '2024-11-28'),
(497, 'KADL230230K00QK2610050', '2024-11-28'),
(498, 'KADL230230K00QK2610048', '2024-11-28'),
(499, 'KADL230230K00QK2610049', '2024-11-28'),
(500, 'KABL230011K01QK2610625', '2024-11-28'),
(501, 'KABL230011K01QK2610624', '2024-11-28'),
(502, 'KABL230011K01QK2610626', '2024-11-28'),
(503, 'KABL230010K02QK2610429', '2024-11-28'),
(504, 'KABL230010K02QK2610428', '2024-11-28'),
(505, 'KABL230010K02QK2610430', '2024-11-28'),
(506, 'KAAL230090K01QK2610432', '2024-11-28'),
(507, 'KAAL230090K01QK2610433', '2024-11-28'),
(508, 'KAAL230090K01QK2610431', '2024-11-28'),
(509, 'KACL231050K02QJ3110160', '2024-11-29'),
(510, 'KACL231050K02QJ3110159', '2024-11-29'),
(511, 'KACL231050K02QJ3110158', '2024-11-29'),
(512, 'KAEL230041K01QE3010183', '2024-11-29'),
(513, 'KAEL230041K01QE3010182', '2024-11-29'),
(514, 'KAEL230041K01QE3010181', '2024-11-29'),
(515, 'KABL230010K02QK2610348', '2024-11-29'),
(516, 'KABL230010K02QK2610351', '2024-11-29'),
(517, 'KABL230020C00OL1710203', '2024-11-29'),
(518, 'KABL230010K02QK2610352', '2024-11-29'),
(519, 'KABL230011K01QK2610898', '2024-11-29'),
(520, 'KABL230011K01QK2610894', '2024-11-29'),
(521, 'KABL230011K01QK2610895', '2024-11-29'),
(522, 'KAAL230090K01QK2611506', '2024-11-29'),
(523, 'KAAL230090K01QK2611516', '2024-11-29'),
(524, 'KAAL230090K01QK2611505', '2024-11-29'),
(525, 'KAEL230041K01QK1110542', '2024-12-02'),
(526, 'KAEL230041K01QK1110543', '2024-12-02'),
(527, 'KAEL230041K01QK1110544', '2024-12-02'),
(528, 'KADL230230K00QK2610072', '2024-12-02'),
(529, 'KADL230230K00QK2610075', '2024-12-02'),
(530, 'KADL230230K00QK2610073', '2024-12-02'),
(531, 'KADL230220K00QK2012112', '2024-12-02'),
(532, 'KADL230220K00QK2012108', '2024-12-02'),
(533, 'KADL230220K00QK2012111', '2024-12-02'),
(534, 'KACL231050K02QK0411214', '2024-12-02'),
(535, 'KACL231050K02QK0411213', '2024-12-02'),
(536, 'KACL231050K02QK0411212', '2024-12-02'),
(537, 'KAAL230090K01QK2910111', '2024-12-02'),
(538, 'KAAL230090K01QK2910108', '2024-12-02'),
(539, 'KAAL230090K01QK2910107', '2024-12-02'),
(540, 'KABL230010K02QK2811227', '2024-12-02'),
(541, 'KABL230010K02QK2811229', '2024-12-02'),
(542, 'KABL230010K02QK2811231', '2024-12-02'),
(543, 'KABL230011K01QK2811093', '2024-12-02'),
(544, 'KABL230011K01QK2811091', '2024-12-02'),
(545, 'KABL230011K01QK2811098', '2024-12-02'),
(546, 'KADL230220K00QK2811391', '2024-12-05'),
(547, 'KADL230220K00QK2811392', '2024-12-05'),
(548, 'KADL230220K00QK2811367', '2024-12-05'),
(549, 'KADL230230K00QK2810179', '2024-12-05'),
(550, 'KADL230230K00QK2810014', '2024-12-05'),
(551, 'KADL230230K00QK2810023', '2024-12-05'),
(552, 'KAAL230090K01QL0410078', '2024-12-05'),
(553, 'KAAL230090K01QL0410077', '2024-12-05'),
(554, 'KAAL230090K01QL0410076', '2024-12-05'),
(555, 'KABL230010K02QL0410005', '2024-12-05'),
(556, 'KABL230010K02QL0410007', '2024-12-05'),
(557, 'KABL230010K02QL0410006', '2024-12-05'),
(558, 'KABL230011K01QL0311760', '2024-12-05'),
(559, 'KABL230011K01QL0311758', '2024-12-05'),
(560, 'KABL230011K01QL0311759', '2024-12-05'),
(561, 'KACL230090K00QK2110393', '2024-12-05'),
(562, 'KACL230090K00QK2110392', '2024-12-05'),
(563, 'KACL230090K00QK2110391', '2024-12-05'),
(564, 'KAEL230041K01QK1411036', '2024-12-10'),
(565, 'KAEL230041K01QK1411037', '2024-12-10'),
(566, 'KAEL230041K01QK1411038', '2024-12-10'),
(567, 'KACL231050K02QL0412259', '2024-12-10'),
(568, 'KACL231050K02QL0412258', '2024-12-10'),
(569, 'KACL231050K02QL0412257', '2024-12-10'),
(570, 'KADL230220K00QL0310496', '2024-12-10'),
(571, 'KADL230220K00QL0310493', '2024-12-10'),
(572, 'KADL230220K00QL0310494', '2024-12-10'),
(573, 'KADL230230K00QL0411137', '2024-12-10'),
(574, 'KADL230230K00QL0411138', '2024-12-10'),
(575, 'KADL230230K00QL0411139', '2024-12-10'),
(576, 'KABL230010K02QL0510799', '2024-12-10'),
(577, 'KABL230010K02QL0510798', '2024-12-10'),
(578, 'KABL230010K02QL0510797', '2024-12-10'),
(579, 'KABL230011K01QL0911323', '2024-12-10'),
(580, 'KABL230011K01QL0911325', '2024-12-10'),
(581, 'KABL230011K01QL0911326', '2024-12-10'),
(582, 'KAAL230090K01QL0610241', '2024-12-10'),
(583, 'KAAL230090K01QL0610242', '2024-12-10'),
(584, 'KAAL230090K01QL0610245', '2024-12-10'),
(585, 'KAEL230041K01QK1411036', '2024-12-10'),
(586, 'KAEL230041K01QK1411037', '2024-12-10'),
(587, 'KAEL230041K01QK1411038', '2024-12-10'),
(588, 'KACL231050K02QL0412259', '2024-12-10'),
(589, 'KACL231050K02QL0412258', '2024-12-10'),
(590, 'KACL231050K02QL0412257', '2024-12-10'),
(591, 'KADL230220K00QL0310496', '2024-12-10'),
(592, 'KADL230220K00QL0310493', '2024-12-10'),
(593, 'KADL230220K00QL0310494', '2024-12-10'),
(594, 'KADL230230K00QL0411137', '2024-12-10'),
(595, 'KADL230230K00QL0411138', '2024-12-10'),
(596, 'KADL230230K00QL0411139', '2024-12-10'),
(597, 'KABL230010K02QL0510799', '2024-12-10'),
(598, 'KABL230010K02QL0510798', '2024-12-10'),
(599, 'KABL230010K02QL0510797', '2024-12-10'),
(600, 'KABL230011K01QL0911323', '2024-12-10'),
(601, 'KABL230011K01QL0911325', '2024-12-10'),
(602, 'KABL230011K01QL0911326', '2024-12-10'),
(603, 'KAAL230090K01QL0610241', '2024-12-10'),
(604, 'KAAL230090K01QL0610242', '2024-12-10'),
(605, 'KAAL230090K01QL0610245', '2024-12-10');

-- --------------------------------------------------------

--
-- 테이블 구조 `STOCK`
--

CREATE TABLE `STOCK` (
  `NO` int(11) NOT NULL,
  `PRODUCT_NO` int(11) NOT NULL,
  `PRODUCT_CODE` varchar(30) DEFAULT NULL,
  `PRODUCT_FULLNAME` varchar(50) DEFAULT NULL,
  `PROCESSCODE` varchar(50) DEFAULT '0',
  `COUNT` int(11) DEFAULT NULL,
  `DATE` date DEFAULT current_timestamp(),
  `STOCK_INVENTORY` int(10) NOT NULL DEFAULT 0,
  `OUT_COUNT` int(10) NOT NULL DEFAULT 0,
  `STATE` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `STOCK`
--

INSERT INTO `STOCK` (`NO`, `PRODUCT_NO`, `PRODUCT_CODE`, `PRODUCT_FULLNAME`, `PROCESSCODE`, `COUNT`, `DATE`, `STOCK_INVENTORY`, `OUT_COUNT`, `STATE`) VALUES
(1, 6, '6', 'DAB FOLDING [LD]', 'KAAL230080K202411061', 95, '2024-10-27', 50, 0, 0),
(2, 9, '9', 'PAB FOLDING [VF33/VN&EU]', 'KABL230080K-1202411062', 120, '2024-10-28', 120, 0, 0),
(3, 15, '15', 'PROTECTOR [VF33/CeAB]', 'KACL360010K202411063', 800, '2024-10-29', 792, 0, 0),
(4, 22, '22', 'CAB CUSHION [VF33/LH]', 'KADL230220K202411064', 100, '2024-10-30', 0, 0, 0),
(5, 12, '12', 'SAB CUSHION [VF34/FRT/LH/75]', 'KACL231040K-2202411065', 1100, '2024-10-25', 1098, 0, 0),
(6, 14, '14', 'SAB CUSHION [VF34/FRT/RH/75]', 'KACL231050K-2202411066', 1100, '2024-10-24', 1100, 0, 0),
(7, 19, '19', 'KAB CUSHION [VF34]', 'KAEL230041K-1202411067', 480, '2024-10-23', 476, 0, 0),
(8, 19, '19', 'KAB CUSHION [VF34]', 'KAEL230041K-1202411067', 296, '2024-10-22', 296, 0, 0),
(10, 22, '22', 'CAB CUSHION [VF33/LH]', 'KADL230220K2024111242', 1, '2024-12-02', 1, 0, 0);

--
-- 트리거 `STOCK`
--
DELIMITER $$
CREATE TRIGGER `after_stock_delete` AFTER DELETE ON `STOCK` FOR EACH ROW BEGIN
  -- INVENTORY 테이블에 해당 PRODUCT_NO가 있는지 확인
  IF EXISTS (SELECT * FROM INVENTORY WHERE PRODUCT_NO = OLD.PRODUCT_NO) THEN
    -- SUM_COUNT 값을 감소시킴
    UPDATE INVENTORY
    SET SUM_COUNT = SUM_COUNT - OLD.COUNT, DATE = current_timestamp()
    WHERE PRODUCT_NO = OLD.PRODUCT_NO;
    
    -- SUM_COUNT가 0보다 작아지면 해당 항목을 삭제
    DELETE FROM INVENTORY
    WHERE PRODUCT_NO = OLD.PRODUCT_NO AND SUM_COUNT <= 0;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_stock_insert` AFTER INSERT ON `STOCK` FOR EACH ROW BEGIN
  -- INVENTORY 테이블에 해당 PRODUCT_NO가 있는지 확인
  IF EXISTS (SELECT * FROM INVENTORY WHERE PRODUCT_NO = NEW.PRODUCT_NO) THEN
    -- 존재하면 SUM_COUNT 값을 증가시킴
    UPDATE INVENTORY
    SET SUM_COUNT = SUM_COUNT + NEW.COUNT, DATE = current_timestamp()
    WHERE PRODUCT_NO = NEW.PRODUCT_NO;
  ELSE
    -- 존재하지 않으면 새로운 항목을 삽입
    INSERT INTO INVENTORY (PRODUCT_NO, SUM_COUNT, DATE)
    VALUES (NEW.PRODUCT_NO, NEW.COUNT, current_timestamp());
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`id`, `employee_id`, `password`) VALUES
(12, 'test1', '$2b$10$u/TfgN.BbwQBjo4ZvZidgeXn4OXOo/VHREQ2.ATJS/7rdLRUCDuZ.'),
(13, 'test2', '$2b$10$3S.Ms6UOkXls1JWKWiGVKOK.Hc01uVW0F7b1w.O1brvs8/UwovGVm'),
(14, 'test3', '$2b$10$e9PiRy3t8KTaf/p8D7p4reFAwmXv2AbDgDWrN6dW1RFt128HAJQTS'),
(15, 'tests', '$2b$10$3cfQ6RrvwZiofyQKEmgQ4O2nzW0RjwSJzuJ.AIEQyjTJ0NGOY1XvC'),
(19, 'testtest', '$2b$10$UUxToMv6lfW0Ll9HYE55aOLNzbMBI5Nf5HUjnxJc9FQYc1CV7tBC2');

-- --------------------------------------------------------

--
-- 테이블 구조 `WONDAN`
--

CREATE TABLE `WONDAN` (
  `NO` int(11) NOT NULL,
  `WONDAN_NAME` varchar(50) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `BUPUM_NO` varchar(50) NOT NULL,
  `SUPPLAY` varchar(50) DEFAULT NULL,
  `WONDAN_BARCODE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WONDAN`
--

INSERT INTO `WONDAN` (`NO`, `WONDAN_NAME`, `NAME`, `BUPUM_NO`, `SUPPLAY`, `WONDAN_BARCODE`) VALUES
(1, '49', '420D', '4949UC', NULL, NULL),
(2, '4K', '420D', 'H24000', NULL, NULL),
(3, '53', '420D', '5353UC', NULL, NULL),
(4, 'H2', '420D', 'H24000', NULL, NULL),
(5, 'NK', '420D', 'H24000', NULL, NULL),
(6, 'SR', '940D', '940D', '도요보', NULL),
(7, 'UC', '940D', '940D', '도요보', NULL),
(8, 'CA', '재단품', '재단품', '코오롱', NULL),
(10, 'LT', 'LT', 'LT', '도요보', NULL),
(11, 'TA', 'TA', 'TA', '도요보', NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `WONDAN_STORE`
--

CREATE TABLE `WONDAN_STORE` (
  `NO` int(11) NOT NULL,
  `REG_DATE` date NOT NULL DEFAULT current_timestamp(),
  `WONDAN_CODE` varchar(50) DEFAULT NULL,
  `WONDAN_NAME` varchar(20) NOT NULL,
  `LOT_NO` varchar(50) NOT NULL,
  `LENGTH` int(20) NOT NULL,
  `REAL_LENGTH` int(20) NOT NULL,
  `SUPPLIER` varchar(50) DEFAULT NULL,
  `REG_ACCOUNT` varchar(50) DEFAULT NULL,
  `UPDATE_ACCOUNT` varchar(30) DEFAULT NULL,
  `DEFECTIVE_LENGTH` int(20) DEFAULT NULL,
  `STATE` int(20) NOT NULL DEFAULT 0,
  `STATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `ETC` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WONDAN_STORE`
--

INSERT INTO `WONDAN_STORE` (`NO`, `REG_DATE`, `WONDAN_CODE`, `WONDAN_NAME`, `LOT_NO`, `LENGTH`, `REAL_LENGTH`, `SUPPLIER`, `REG_ACCOUNT`, `UPDATE_ACCOUNT`, `DEFECTIVE_LENGTH`, `STATE`, `STATE_DATE`, `ETC`) VALUES
(18, '2024-10-18', NULL, 'SR', 'H244W0320', 306, 306, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(19, '2024-10-18', NULL, 'SR', 'H22970147', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(20, '2024-10-18', NULL, 'SR', 'H244j0108', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(21, '2024-10-18', NULL, 'SR', 'H24410119', 300, 300, 'ihc', '10', '50', 0, 1, '2024-10-28', NULL),
(22, '2024-10-18', NULL, 'SR', 'H244f1205', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(23, '2024-10-18', NULL, 'SR', 'H244w0309', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(24, '2024-11-25', NULL, 'SR', 'H244j0115', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(25, '2024-11-06', NULL, 'SR', 'H24280247', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(26, '2024-10-28', NULL, 'SR', 'H22970139', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(27, '2024-10-18', NULL, 'SR', 'H23890511', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(28, '2024-10-18', NULL, 'SR', 'H22970122', 300, 300, 'ihc', '10', '10', 0, 1, '2024-10-28', NULL),
(29, '2024-10-28', NULL, 'UC', 'KADL40101K', 875, 875, '코오롱재단품', '10', '10', 0, 1, '2024-10-29', NULL),
(30, '2024-10-17', NULL, 'UC', 'KADL401021K-1', 875, 875, '코오롱 재단품', '10', '10', 0, 1, '2024-10-29', NULL),
(31, '2024-10-18', NULL, '49', 'H248L2218', 302, 302, 'ihc', '10', '10', 0, 1, '2024-10-29', NULL),
(32, '2024-11-27', NULL, '49', 'H24190515', 299, 299, 'ihc', '10', '10', 0, 1, '2024-10-29', NULL),
(33, '2024-11-27', NULL, 'SR', 'H24X83206', 304, 304, '두올', '50', '10', 0, 1, '2024-11-01', NULL),
(34, '2024-11-06', NULL, 'SR', 'H24X83301', 306, 303, '두올', '50', '10', 0, 1, '2024-11-01', NULL),
(35, '2024-11-06', NULL, 'SR', 'H24X83207', 302, 302, '두올', '50', '10', 0, 1, '2024-11-01', NULL),
(36, '2024-10-30', NULL, 'SR', 'H249K0609', 304, 301, '두올', '50', '50', 0, 1, '2024-11-01', NULL),
(37, '2024-10-30', NULL, 'SR', 'H24X83204', 305, 302, '두올', '50', '50', 0, 1, '2024-11-01', NULL),
(44, '2024-11-05', NULL, '49', 'H248L2217', 302, 302, 'ihc', '10', '51', 0, 1, '2024-11-05', NULL),
(45, '2024-11-27', NULL, 'SR', 'H24X83307', 308, 305, '두올', '50', '50', 0, 1, '2024-11-05', NULL),
(46, '2024-11-05', NULL, 'SR', 'H249K0617', 308, 305, '두올', '50', '10', 0, 1, '2024-11-05', NULL),
(47, '2024-11-05', NULL, 'SR', 'H24X83212', 303, 300, '두올', '50', '10', 0, 1, '2024-11-05', NULL),
(48, '2024-11-05', NULL, 'SR', 'H24X83102', 310, 307, '두올', '50', '10', 0, 1, '2024-11-05', NULL),
(49, '2024-11-05', NULL, 'SR', 'H249K0616', 300, 297, '두올', '50', '10', 0, 1, '2024-11-05', NULL),
(52, '2024-11-01', NULL, 'CA', 'KADL401021K', 450, 450, '코오롱', '10', '10', 0, 1, '2024-11-06', NULL),
(53, '2024-11-01', NULL, 'CA', 'KADL401021K-01', 450, 450, '코오롱', '10', '10', 0, 1, '2024-11-06', NULL),
(54, '2024-11-09', NULL, '53', 'jaego01', 1, 1, '1', '2', '2', 0, 1, '2024-11-09', NULL),
(55, '2024-11-09', NULL, '53', 'jaego02', 1, 1, '1', '2', '2', 0, 1, '2024-11-09', NULL),
(56, '2024-11-09', NULL, '53', 'jaego03', 1, 1, '1', '2', '2', 0, 1, '2024-11-09', NULL),
(57, '2024-11-09', NULL, '53', 'jaego04', 1, 1, '1', '2', '2', 0, 1, '2024-11-09', NULL),
(58, '2024-11-09', NULL, '53', 'jaego05', 1, 1, '1', '2', '2', 0, 1, '2024-11-09', NULL),
(59, '2024-11-09', NULL, '53', 'jaego06', 1, 1, '1', '2', '2', 0, 1, '2024-11-09', NULL),
(60, '2024-11-08', NULL, 'CA', 'KADL40102K-02', 700, 700, '코오롱', NULL, '2', 0, 1, '2024-11-12', NULL),
(61, '2024-11-08', NULL, 'CA', 'KADL401021K-02', 700, 700, '코오롱', '10', '10', 0, 1, '2024-11-12', NULL),
(62, '2024-11-08', NULL, 'CA', 'KADL401021K-03', 700, 700, '코오롱', '10', '10', 0, 1, '2024-11-12', NULL),
(63, '2024-11-11', NULL, 'CA', 'KADL401021K-04', 350, 350, '코오롱', '10', '10', 0, 1, '2024-11-12', NULL),
(64, '2024-11-11', NULL, 'CA', 'KADL401021K-05', 350, 350, '코오롱', '10', '10', 0, 1, '2024-11-12', NULL),
(65, '2024-11-08', NULL, 'NK', 'BAH140323A', 450, 450, '코오롱', '10', '10', 0, 1, '2024-11-12', NULL),
(66, '2024-11-14', NULL, 'SR', 'H24X83108', 296, 294, '두올', '50', '10', 0, 1, '2024-11-18', NULL),
(67, '2024-11-14', NULL, 'SR', 'H24X83110', 308, 305, '두올', '50', '50', 0, 1, '2024-11-18', NULL),
(68, '2024-11-27', NULL, 'SR', 'H24X83218', 298, 296, '두올', '50', '50', 0, 1, '2024-11-18', NULL),
(69, '2024-11-14', NULL, 'SR', 'H249K0620', 303, 300, '두올', '50', '10', 0, 1, '2024-11-18', NULL),
(70, '2024-11-15', NULL, 'CA', 'KADL401021K-6', 875, 875, '코오롱', '10', '10', 0, 1, '2024-11-18', NULL),
(71, '2024-11-15', NULL, 'CA', 'KADL401021K-7', 875, 875, '코오롱', '10', '10', 0, 1, '2024-11-18', NULL),
(72, '2024-11-27', NULL, '4K', 'BAAA40193B', 463, 463, '코오롱', '10', '10', 0, 1, '2024-11-18', NULL),
(73, '2024-11-01', NULL, '4K', 'BAAA40291A', 220, 220, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(74, '2024-11-01', NULL, '4K', 'BAAA40063A', 460, 460, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(75, '2024-11-01', NULL, '4K', 'BAAA30921A', 450, 450, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(76, '2024-11-01', NULL, '4K', 'BAAA40063B', 462, 462, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(77, '2024-11-01', NULL, '4K', 'BAAA40193A', 459, 459, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(78, '2024-11-01', NULL, '4K', 'BAAA40122B', 501, 501, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(79, '2024-11-01', NULL, '4K', 'BAAA40191B', 536, 536, '코오롱', '10', '10', 0, 0, '2024-11-18', NULL),
(80, '2024-11-28', NULL, 'LT', '52040', 181, 181, '코오롱', '10', '10', 0, 1, '2024-11-18', NULL),
(81, '2024-12-07', NULL, 'LT', '52040-1', 173, 173, '코오롱', '10', '10', 0, 1, '2024-11-18', NULL),
(82, '2024-11-01', NULL, '53', 'H228N2015', 301, 301, '코오롱', '10', '2', 0, 1, '2024-11-18', NULL),
(83, '2024-11-01', NULL, '53', 'H238M0606', 303, 303, '코오롱', '10', '10', 0, 0, '2024-11-18', NULL),
(84, '2024-11-01', NULL, '49', 'H249D1307-1', 307, 307, 'IHC', '10', '50', 0, 1, '2024-11-18', NULL),
(85, '2024-12-05', NULL, '49', 'H249D1310', 305, 305, 'IHC', '10', '50', 0, 1, '2024-11-18', NULL),
(86, '2024-12-02', NULL, '49', 'H224X80904', 299, 299, 'IHC', '10', '10', 0, 1, '2024-11-18', NULL),
(87, '2024-11-01', NULL, '49', 'H249D1209-1', 298, 298, 'IHC', '10', '10', 0, 1, '2024-11-18', NULL),
(88, '2024-11-01', NULL, '49', 'H249D1115-1', 311, 311, 'IHC', '10', '10', 0, 1, '2024-11-18', NULL),
(89, '2024-11-01', NULL, '4K', 'BAAA40193B-1', 463, 463, '코오롱', '10', '10', 0, 0, '2024-11-18', NULL),
(90, '2024-11-20', NULL, 'NK', 'BAH140273B', 555, 555, '코오롱', '10', '10', 0, 1, '2024-11-20', NULL),
(91, '2024-11-01', NULL, '49', 'H244R0605', 300, 300, 'IHC', '10', '10', 0, 1, '2024-11-20', NULL),
(92, '2024-11-21', NULL, 'LT', '240216', 250, 250, 'IHC', '10', '10', 0, 0, '2024-11-21', NULL),
(93, '2024-11-21', NULL, 'LT', '240216-1', 250, 250, 'IHC', '10', '10', 0, 0, '2024-11-21', NULL),
(94, '2024-11-21', NULL, 'LT', '240216-2', 250, 250, 'IHC', '10', '10', 0, 0, '2024-11-21', NULL),
(95, '2024-11-28', NULL, 'TA', '76515', 253, 253, 'IHC', '10', '10', 0, 1, '2024-11-21', NULL),
(96, '2024-11-21', NULL, 'TA', '76515-1', 298, 298, 'IHC', '10', '10', 0, 0, '2024-11-21', NULL),
(97, '2024-12-07', NULL, 'TA', '76515-2', 298, 298, 'IHC', '10', '10', 0, 1, '2024-11-21', NULL),
(98, '2024-12-07', NULL, 'TA', '76515-3', 307, 307, 'IHC', '10', '10', 0, 1, '2024-11-21', NULL),
(99, '2024-11-20', NULL, 'NK', 'BAH130673A', 500, 500, '코오롱', '10', '10', 0, 1, '2024-11-21', NULL),
(100, '2024-11-22', NULL, 'CA', 'KADl401021K-8', 425, 425, '코오롱', '10', '10', 0, 0, '2024-11-22', NULL),
(101, '2024-11-22', NULL, 'CA', 'KADl401021K-9', 425, 425, '코오롱', '10', '10', 0, 0, '2024-11-22', NULL),
(102, '2024-12-02', NULL, 'SR', 'H24X81711', 302, 299, 'IHC', '10', '50', 0, 1, '2024-11-22', NULL),
(103, '2024-11-21', NULL, 'SR', 'H24XM1907', 287, 285, 'IHC', '10', '10', 0, 1, '2024-11-22', NULL),
(104, '2024-11-21', NULL, 'SR', 'H24X83117', 305, 302, 'IHC', '10', '50', 0, 1, '2024-11-22', NULL),
(105, '2024-11-14', NULL, 'SR', 'H242E0206', 300, 300, 'IHC', '10', '10', 0, 1, '2024-11-25', NULL),
(106, '2024-11-22', NULL, 'NK', 'BAH140362C', 450, 450, '코오롱', '10', '10', 0, 1, '2024-11-25', NULL),
(107, '2024-11-22', NULL, 'NK', 'BAH140362B', 450, 450, '코오롱', '10', '10', 0, 1, '2024-11-25', NULL),
(108, '2024-11-22', NULL, 'NK', 'BAH140343A', 450, 450, '코오롱', '10', '10', 0, 1, '2024-11-25', NULL),
(109, '2024-11-26', NULL, 'SR', 'H24XM1920', 303, 300, 'IHC', '10', '50', 0, 1, '2024-11-27', NULL),
(110, '2024-11-28', NULL, 'SR', 'H24XM1809', 293, 291, 'IHC', '10', '10', 0, 1, '2024-11-27', NULL),
(111, '2024-11-28', NULL, 'SR', 'H24XM1809-1', 320, 317, 'IHC', '10', '10', 0, 1, '2024-11-27', NULL),
(112, '2024-11-26', NULL, 'SR', 'H24XM1809-2', 320, 317, 'IHC', '10', '50', 0, 1, '2024-11-27', NULL),
(113, '2024-12-05', NULL, 'SR', 'H24Y11102', 308, 305, 'IHC', '10', '10', 0, 1, '2024-11-27', NULL),
(114, '2024-11-30', NULL, 'NK', 'test', 1, 1, '1', NULL, '2', 0, 1, '2024-11-30', NULL),
(116, '2024-12-07', NULL, 'CA', '1206LH', 875, 875, '코오롱', '10', '10', 0, 0, '2024-12-07', NULL),
(117, '2024-12-07', NULL, 'CA', '1206RH', 875, 875, '코오롱', '10', '10', 0, 0, '2024-12-07', NULL),
(118, '2024-12-07', NULL, '49', 'H24XY1017', 297, 300, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(119, '2024-12-07', NULL, '49', 'H24YE2109', 296, 299, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(120, '2024-12-07', NULL, '49', 'H24YE2110', 290, 293, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(121, '2024-12-06', NULL, 'NK', 'BAH140394B', 410, 410, '코오롱', '10', '19', 0, 1, '2024-12-07', NULL),
(122, '2024-12-07', NULL, '49', 'H24XY0920', 335, 338, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(123, '2024-12-07', NULL, '49', 'H24YE2113', 307, 310, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(124, '2024-12-06', NULL, 'NK', 'BAH140421B', 582, 582, '코오롱', '10', '10', 0, 1, '2024-12-07', NULL),
(125, '2024-12-06', NULL, '4K', 'BAAA41773B', 448, 448, '코오롱', '10', '10', 0, 0, '2024-12-07', NULL),
(126, '2024-12-06', NULL, '4K', 'BAAA41773C', 443, 443, '코오롱', '10', '10', 0, 0, '2024-12-07', NULL),
(127, '2024-12-06', NULL, '4K', 'BAAA41773A', 499, 499, '코오롱', '10', '10', 0, 0, '2024-12-07', NULL),
(128, '2024-12-07', NULL, 'SR', 'H24Y11008', 292, 295, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(129, '2024-12-06', NULL, '4K', 'BAAA41721A', 590, 590, '코오롱', '10', '10', 0, 0, '2024-12-07', NULL),
(130, '2024-12-07', NULL, 'SR', 'H24Y10905', 327, 330, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL),
(131, '2024-12-07', NULL, 'SR', 'H24Y10903', 307, 310, 'IHC', '50', '50', 0, 0, '2024-12-07', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `WorkerByDateView`
-- (See below for the actual view)
--
CREATE TABLE `WorkerByDateView` (
`NO` int(11)
,`NAME` varchar(20)
,`DATE` date
);

-- --------------------------------------------------------

--
-- 테이블 구조 `WORKERS`
--

CREATE TABLE `WORKERS` (
  `NO` int(11) NOT NULL,
  `NAME` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORKERS`
--

INSERT INTO `WORKERS` (`NO`, `NAME`) VALUES
(1, '홍길동'),
(2, '김순희'),
(3, '홍길동'),
(4, '김순희'),
(5, '홍길동1'),
(6, '김순희1'),
(7, '홍길동2'),
(8, '김순희2'),
(9, '홍길동3'),
(10, '김순희3'),
(11, '홍길동4'),
(12, '김순희4'),
(13, '홍길동5'),
(14, '김순희5'),
(15, '홍길동6'),
(16, '김순희6');

-- --------------------------------------------------------

--
-- Stand-in structure for view `WORKERS_DATE_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `WORKERS_DATE_VIEW` (
`WorkerCountNo` int(11)
,`WorkerNames` mediumtext
,`WORKER_COUNT` int(10)
,`DATE` date
);

-- --------------------------------------------------------

--
-- 테이블 구조 `WORKER_COUNT`
--

CREATE TABLE `WORKER_COUNT` (
  `NO` int(11) NOT NULL,
  `WORKER_IDS` varchar(255) DEFAULT NULL,
  `WORKER_COUNT` int(10) NOT NULL,
  `DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORKER_COUNT`
--

INSERT INTO `WORKER_COUNT` (`NO`, `WORKER_IDS`, `WORKER_COUNT`, `DATE`) VALUES
(45, '1,2,3,4,5,6,7,8,9,10,11,12,13', 13, '2024-08-12'),
(46, '1,4,6,7', 4, '2024-08-13'),
(47, '1,3,5', 3, '2024-08-13'),
(48, '2,5,10,12', 4, '2024-08-13'),
(49, '1,2,3,4', 4, '2024-08-15'),
(50, '1,2', 2, '2024-09-21'),
(51, '3,4,5', 3, '2024-09-21'),
(52, '1,2', 2, '2024-09-21'),
(53, '1,2,3,4,5', 5, '2024-09-21'),
(54, '1,2,3,8', 4, '2024-09-21'),
(55, '8,9,10,11,13,14,15,16', 8, '2024-09-21'),
(56, '13,14,15,16,12,11,7,8,9,10', 10, '2024-09-21'),
(57, '1,2,3,4,5', 5, '2024-09-21');

-- --------------------------------------------------------

--
-- 테이블 구조 `WORKER_SCHEDULE`
--

CREATE TABLE `WORKER_SCHEDULE` (
  `ID` int(11) NOT NULL,
  `WORKER_NO` int(11) DEFAULT NULL,
  `DATE` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Stand-in structure for view `WorkingPartProductsWondanView`
-- (See below for the actual view)
--
CREATE TABLE `WorkingPartProductsWondanView` (
`WorkingPartNo` int(11)
,`ASSY_PART_NAME` varchar(30)
,`WONDAN_NAME` varchar(10)
,`PRODUCT_CODE` int(11)
,`ProductCode` varchar(50)
,`CAR` varchar(30)
,`LOCATION` varchar(30)
,`COMPANY` varchar(30)
,`PRODUCT_NAME` varchar(50)
,`PRODUCT_BARCODE` varchar(50)
,`BARCODE_NO` varchar(30)
,`BARCODE_REV` varchar(30)
,`PRODUCT_CODE_NAME` varchar(30)
,`PRODUCT_PART01` varchar(30)
,`PRODUCT_FULLNAME` varchar(50)
,`PRODUCT_DESC01` varchar(30)
,`PRODUCT_DESC02` varchar(30)
,`PRODUCT_DESC03` varchar(30)
,`PRODUCT_PART` varchar(30)
,`CERT_DATE` varchar(30)
,`CERTIFY` int(11)
,`STATE` int(2)
,`WondanName` varchar(50)
,`BUPUM_NO` varchar(50)
,`SUPPLAY` varchar(50)
,`WONDAN_BARCODE` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `WorkingPartProductsWondanViewTable`
-- (See below for the actual view)
--
CREATE TABLE `WorkingPartProductsWondanViewTable` (
`WorkingPartNo` int(11)
,`ASSY_PART_NAME` varchar(30)
,`WONDAN_NAME` varchar(10)
,`PRODUCT_CODE` int(11)
,`ProductCode` varchar(50)
,`CAR` varchar(30)
,`LOCATION` varchar(30)
,`COMPANY` varchar(30)
,`PRODUCT_NAME` varchar(50)
,`PRODUCT_BARCODE` varchar(50)
,`BARCODE_NO` varchar(30)
,`BARCODE_REV` varchar(30)
,`PRODUCT_CODE_NAME` varchar(30)
,`PRODUCT_PART01` varchar(30)
,`PRODUCT_FULLNAME` varchar(50)
,`PRODUCT_DESC01` varchar(30)
,`PRODUCT_DESC02` varchar(30)
,`PRODUCT_DESC03` varchar(30)
,`PRODUCT_PART` varchar(30)
,`CERT_DATE` varchar(30)
,`CERTIFY` int(11)
,`STATE` int(2)
,`WondanName` varchar(50)
,`BUPUM_NO` varchar(50)
,`SUPPLAY` varchar(50)
,`WONDAN_BARCODE` varchar(50)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `WORKING_ORDER`
--

CREATE TABLE `WORKING_ORDER` (
  `NO` int(10) NOT NULL,
  `WORKING_PART` int(10) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `CREATE_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `STATE` int(10) NOT NULL DEFAULT 0,
  `JAEDAN_STATE` int(10) NOT NULL DEFAULT 0,
  `REG_ACCOUNT` int(10) NOT NULL,
  `ORDER_ACCOUNT` varchar(30) DEFAULT NULL,
  `UPDATE_ACCOUNT` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORKING_ORDER`
--

INSERT INTO `WORKING_ORDER` (`NO`, `WORKING_PART`, `COUNT`, `CREATE_DATE`, `STATE`, `JAEDAN_STATE`, `REG_ACCOUNT`, `ORDER_ACCOUNT`, `UPDATE_ACCOUNT`) VALUES
(23, 10, 0, '2024-10-24 15:00:00', 1, 0, 10, NULL, 10),
(24, 10, 0, '2024-10-24 15:00:00', 1, 0, 10, NULL, 10),
(25, 10, 0, '2024-10-24 15:00:00', 1, 0, 10, NULL, 10),
(26, 10, 0, '2024-10-24 15:00:00', 1, 0, 10, NULL, 10),
(27, 14, 0, '2024-10-18 15:00:00', 1, 0, 10, NULL, 10),
(28, 12, 0, '2024-10-20 15:00:00', 1, 0, 10, NULL, 10),
(29, 12, 0, '2024-10-20 15:00:00', 1, 0, 10, NULL, 10),
(30, 22, 875, '2024-10-16 15:00:00', 1, 0, 10, NULL, 10),
(31, 23, 875, '2024-10-16 15:00:00', 1, 0, 10, NULL, 10),
(32, 2, 0, '2024-10-17 15:00:00', 1, 0, 10, NULL, 10),
(35, 2, 0, '2024-11-04 15:00:00', 1, 0, 10, NULL, 51),
(36, 19, 0, '2024-10-28 15:00:00', 1, 0, 10, NULL, 10),
(37, 22, 450, '2024-11-03 15:00:00', 1, 0, 10, NULL, 10),
(38, 23, 450, '2024-11-03 15:00:00', 1, 0, 10, NULL, 10),
(39, 19, 1030, '2024-10-29 15:00:00', 1, 0, 10, NULL, 10),
(42, 12, 1031, '2024-10-30 15:00:00', 1, 0, 10, NULL, 10),
(43, 12, 1031, '2024-10-30 15:00:00', 1, 0, 10, NULL, 10),
(44, 10, 1031, '2024-10-30 15:00:00', 1, 0, 10, NULL, 10),
(45, 10, 1104, '2024-11-03 15:00:00', 1, 0, 10, NULL, 10),
(47, 10, 1104, '2024-11-03 15:00:00', 1, 0, 10, NULL, 10),
(48, 4, 1, '2024-11-08 15:00:00', 1, 0, 2, NULL, 2),
(49, 2, 48, '2024-11-08 15:00:00', 1, 0, 2, NULL, 2),
(50, 15, 800, '2024-11-08 15:00:00', 1, 0, 2, NULL, 2),
(51, 10, 900, '2024-11-08 15:00:00', 1, 0, 2, NULL, 2),
(52, 9, 320, '2024-11-08 15:00:00', 1, 0, 2, NULL, 2),
(53, 6, 1, '2024-11-08 15:00:00', 1, 0, 2, NULL, 2),
(56, 22, 700, '2024-11-10 15:00:00', 1, 0, 10, NULL, 10),
(57, 23, 700, '2024-11-10 15:00:00', 1, 0, 10, NULL, 10),
(58, 22, 350, '2024-11-13 15:00:00', 1, 0, 10, NULL, 10),
(59, 23, 350, '2024-11-13 15:00:00', 1, 0, 10, NULL, 10),
(61, 19, 1106, '2024-11-05 15:00:00', 1, 0, 10, NULL, 10),
(62, 14, 1106, '2024-11-05 15:00:00', 1, 0, 10, NULL, 10),
(63, 14, 1105, '2024-11-04 15:00:00', 1, 0, 10, NULL, 10),
(64, 19, 1107, '2024-11-06 15:00:00', 1, 0, 10, NULL, 10),
(65, 9, 1111, '2024-11-10 15:00:00', 1, 0, 10, NULL, 10),
(66, 10, 1118, '2024-11-17 15:00:00', 1, 0, 10, NULL, 10),
(67, 10, 1118, '2024-11-17 15:00:00', 1, 0, 10, NULL, 50),
(68, 10, 1118, '2024-11-17 15:00:00', 1, 0, 10, NULL, 10),
(69, 9, 1120, '2024-11-19 15:00:00', 1, 0, 10, NULL, 10),
(70, 2, 1119, '2024-11-18 15:00:00', 1, 0, 10, NULL, 10),
(71, 2, 1120, '2024-11-19 15:00:00', 1, 0, 10, NULL, 10),
(72, 8, 1120, '2024-11-19 15:00:00', 1, 0, 10, NULL, 10),
(73, 12, 1125, '2024-11-24 15:00:00', 1, 0, 10, NULL, 10),
(74, 8, 1121, '2024-11-20 15:00:00', 1, 0, 10, NULL, 10),
(75, 8, 1122, '2024-11-21 15:00:00', 1, 0, 10, NULL, 10),
(76, 8, 1123, '2024-11-22 15:00:00', 1, 0, 10, NULL, 10),
(77, 2, 1125, '2024-11-24 15:00:00', 1, 0, 10, NULL, 10),
(78, 2, 1128, '2024-11-27 15:00:00', 1, 0, 10, NULL, 10),
(79, 14, 1128, '2024-11-27 15:00:00', 1, 0, 10, NULL, 10),
(80, 2, 1, '2024-11-29 15:00:00', 1, 0, 2, NULL, 2),
(82, 14, 1129, '2024-11-28 15:00:00', 1, 0, 50, NULL, 50),
(85, 14, 224, '2024-12-01 15:00:00', 1, 0, 50, NULL, 50),
(88, 14, 224, '2024-12-01 15:00:00', 1, 0, 50, NULL, 50),
(90, 14, 808, '2024-12-02 15:00:00', 1, 0, 50, NULL, 50),
(91, 22, 875, '2024-12-03 15:00:00', 1, 0, 10, NULL, 10),
(92, 23, 875, '2024-12-03 15:00:00', 1, 0, 10, NULL, 10),
(93, 2, 970, '2024-12-04 15:00:00', 1, 0, 50, NULL, 50),
(95, 13, 880, '2024-12-05 15:00:00', 1, 0, 2, NULL, 50),
(96, 2, 900, '2024-12-05 15:00:00', 1, 0, 2, NULL, 50),
(97, 9, 482, '2024-12-08 15:00:00', 1, 2, 50, NULL, 10),
(108, 1, 2, '2024-12-08 15:00:00', 0, 0, 50, NULL, NULL),
(110, 2, 1, '2024-12-08 15:00:00', 1, 2, 19, NULL, 2),
(111, 9, 336, '2024-12-08 15:00:00', 1, 2, 50, NULL, 19),
(113, 1, 1, '2024-12-09 15:00:00', 1, 2, 2, NULL, 2),
(114, 22, 1, '2024-12-09 15:00:00', 1, 2, 2, NULL, 2),
(115, 2, 50, '2024-12-09 15:00:00', 1, 2, 2, NULL, 2),
(116, 2, 1, '2024-12-09 15:00:00', 1, 2, 2, NULL, 2),
(117, 2, 1, '2024-12-09 15:00:00', 1, 2, 2, NULL, 2),
(118, 2, 1, '2024-12-09 15:00:00', 1, 2, 2, NULL, 2);

-- --------------------------------------------------------

--
-- 테이블 구조 `WORKING_PART`
--

CREATE TABLE `WORKING_PART` (
  `NO` int(11) NOT NULL,
  `ASSY_PART_NAME` varchar(30) DEFAULT NULL,
  `WONDAN_CODE` int(10) NOT NULL,
  `WONDAN_NAME` varchar(10) DEFAULT NULL,
  `SUB_WONDAN` varchar(10) DEFAULT NULL,
  `PRODUCT_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORKING_PART`
--

INSERT INTO `WORKING_PART` (`NO`, `ASSY_PART_NAME`, `WONDAN_CODE`, `WONDAN_NAME`, `SUB_WONDAN`, `PRODUCT_CODE`) VALUES
(1, 'DAB', 0, '1', '6', 1),
(2, 'DAB', 2, '1', '6', 2),
(3, 'DAB', 0, '1', '6', 3),
(4, 'DAB', 0, '1', '6', 4),
(5, 'DAB', 0, '1', '6', 5),
(6, 'DAB', 0, '1', '6', 6),
(7, 'PAB', 2, '3', '2', 7),
(8, 'PAB', 0, '3', '2', 8),
(9, 'PAB', 0, '3', '6', 9),
(10, 'SAB', 0, '6', '3', 10),
(11, 'SAB', 0, '6', '3', 11),
(12, 'SAB', 0, '6', '3', 12),
(13, 'SAB', 0, '6', '3', 13),
(14, 'SAB', 2, '6', '4', 14),
(15, 'PROTECTOR', 0, '6', NULL, 15),
(16, 'CAB', 0, '6', '7', 16),
(17, 'CAB', 0, '6', '7', 17),
(18, 'KAB', 0, '6', '1', 18),
(19, 'KAB', 0, '6', '1', 19),
(20, 'PAB', 0, '3', '2', 20),
(21, 'PAB', 0, '3', '2', 21),
(22, 'CAB', 1, '6', '7', 22),
(23, 'CAB', 1, '6', '7', 23),
(24, 'PAB', 2, '3', '2', 24),
(25, 'PAB', 2, '3', '2', 25);

-- --------------------------------------------------------

--
-- 뷰 구조 `JAEDAN_WONDAN_VIEW`
--
DROP TABLE IF EXISTS `JAEDAN_WONDAN_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `JAEDAN_WONDAN_VIEW`  AS SELECT `j`.`NO` AS `JAEDAN_NO`, `j`.`JAEDAN_NAME` AS `JAEDAN_NAME`, `j`.`ASSY_PART_NAME` AS `ASSY_PART_NAME`, `j`.`WONDAN_CODE` AS `WONDAN_CODE`, `j`.`WONDAN_NAME` AS `JAEDAN_WONDAN_NAME`, `j`.`SUB_WONDAN` AS `SUB_WONDAN`, `j`.`STATE` AS `JAEDAN_STATE`, `w`.`NO` AS `WONDAN_NO`, `w`.`WONDAN_NAME` AS `WONDAN_NAME`, `w`.`NAME` AS `WONDAN_DETAIL_NAME`, `w`.`BUPUM_NO` AS `BUPUM_NO`, `w`.`SUPPLAY` AS `SUPPLAY`, `w`.`WONDAN_BARCODE` AS `WONDAN_BARCODE` FROM (`JAEDAN_PRODUCTS` `j` left join `WONDAN` `w` on(`j`.`WONDAN_NAME` = `w`.`NO`)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `PRODUCTS_INVENTORY`
--
DROP TABLE IF EXISTS `PRODUCTS_INVENTORY`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `PRODUCTS_INVENTORY`  AS SELECT `PRODUCTS`.`NO` AS `NO`, `PRODUCTS`.`PRODUCT_CODE` AS `PRODUCT_CODE`, `PRODUCTS`.`CAR` AS `CAR`, `PRODUCTS`.`LOCATION` AS `LOCATION`, `PRODUCTS`.`PRODUCT_NAME` AS `PRODUCT_NAME`, `PRODUCTS`.`PRODUCT_FULLNAME` AS `PRODUCT_FULLNAME` FROM `PRODUCTS` ;

-- --------------------------------------------------------

--
-- 뷰 구조 `WorkerByDateView`
--
DROP TABLE IF EXISTS `WorkerByDateView`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `WorkerByDateView`  AS SELECT `w`.`NO` AS `NO`, `w`.`NAME` AS `NAME`, `wc`.`DATE` AS `DATE` FROM (`WORKERS` `w` join `WORKER_COUNT` `wc` on(find_in_set(`w`.`NO`,`wc`.`WORKER_IDS`) > 0)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `WORKERS_DATE_VIEW`
--
DROP TABLE IF EXISTS `WORKERS_DATE_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `WORKERS_DATE_VIEW`  AS SELECT `wc`.`NO` AS `WorkerCountNo`, group_concat(`w`.`NAME` order by field(`w`.`NO`,`wc`.`WORKER_IDS`) ASC separator ',') AS `WorkerNames`, `wc`.`WORKER_COUNT` AS `WORKER_COUNT`, `wc`.`DATE` AS `DATE` FROM (`WORKER_COUNT` `wc` join `WORKERS` `w` on(find_in_set(`w`.`NO`,`wc`.`WORKER_IDS`) > 0)) GROUP BY `wc`.`NO`, `wc`.`WORKER_COUNT`, `wc`.`DATE` ;

-- --------------------------------------------------------

--
-- 뷰 구조 `WorkingPartProductsWondanView`
--
DROP TABLE IF EXISTS `WorkingPartProductsWondanView`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `WorkingPartProductsWondanView`  AS SELECT `wp`.`NO` AS `WorkingPartNo`, `wp`.`ASSY_PART_NAME` AS `ASSY_PART_NAME`, `wp`.`WONDAN_NAME` AS `WONDAN_NAME`, `wp`.`PRODUCT_CODE` AS `PRODUCT_CODE`, `p`.`PRODUCT_CODE` AS `ProductCode`, `p`.`CAR` AS `CAR`, `p`.`LOCATION` AS `LOCATION`, `p`.`COMPANY` AS `COMPANY`, `p`.`PRODUCT_NAME` AS `PRODUCT_NAME`, `p`.`PRODUCT_BARCODE` AS `PRODUCT_BARCODE`, `p`.`BARCODE_NO` AS `BARCODE_NO`, `p`.`BARCODE_REV` AS `BARCODE_REV`, `p`.`PRODUCT_CODE_NAME` AS `PRODUCT_CODE_NAME`, `p`.`PRODUCT_PART01` AS `PRODUCT_PART01`, `p`.`PRODUCT_FULLNAME` AS `PRODUCT_FULLNAME`, `p`.`PRODUCT_DESC01` AS `PRODUCT_DESC01`, `p`.`PRODUCT_DESC02` AS `PRODUCT_DESC02`, `p`.`PRODUCT_DESC03` AS `PRODUCT_DESC03`, `p`.`PRODUCT_PART` AS `PRODUCT_PART`, `p`.`CERT_DATE` AS `CERT_DATE`, `p`.`CERTIFY` AS `CERTIFY`, `p`.`STATE` AS `STATE`, `w`.`NAME` AS `WondanName`, `w`.`BUPUM_NO` AS `BUPUM_NO`, `w`.`SUPPLAY` AS `SUPPLAY`, `w`.`WONDAN_BARCODE` AS `WONDAN_BARCODE` FROM ((`WORKING_PART` `wp` join `WONDAN` `w` on(`wp`.`WONDAN_NAME` = `w`.`NO`)) join `PRODUCTS` `p` on(`wp`.`PRODUCT_CODE` = `p`.`NO`)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `WorkingPartProductsWondanViewTable`
--
DROP TABLE IF EXISTS `WorkingPartProductsWondanViewTable`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `WorkingPartProductsWondanViewTable`  AS SELECT `wp`.`NO` AS `WorkingPartNo`, `wp`.`ASSY_PART_NAME` AS `ASSY_PART_NAME`, `wp`.`WONDAN_NAME` AS `WONDAN_NAME`, `wp`.`PRODUCT_CODE` AS `PRODUCT_CODE`, `p`.`PRODUCT_CODE` AS `ProductCode`, `p`.`CAR` AS `CAR`, `p`.`LOCATION` AS `LOCATION`, `p`.`COMPANY` AS `COMPANY`, `p`.`PRODUCT_NAME` AS `PRODUCT_NAME`, `p`.`PRODUCT_BARCODE` AS `PRODUCT_BARCODE`, `p`.`BARCODE_NO` AS `BARCODE_NO`, `p`.`BARCODE_REV` AS `BARCODE_REV`, `p`.`PRODUCT_CODE_NAME` AS `PRODUCT_CODE_NAME`, `p`.`PRODUCT_PART01` AS `PRODUCT_PART01`, `p`.`PRODUCT_FULLNAME` AS `PRODUCT_FULLNAME`, `p`.`PRODUCT_DESC01` AS `PRODUCT_DESC01`, `p`.`PRODUCT_DESC02` AS `PRODUCT_DESC02`, `p`.`PRODUCT_DESC03` AS `PRODUCT_DESC03`, `p`.`PRODUCT_PART` AS `PRODUCT_PART`, `p`.`CERT_DATE` AS `CERT_DATE`, `p`.`CERTIFY` AS `CERTIFY`, `p`.`STATE` AS `STATE`, `w`.`NAME` AS `WondanName`, `w`.`BUPUM_NO` AS `BUPUM_NO`, `w`.`SUPPLAY` AS `SUPPLAY`, `w`.`WONDAN_BARCODE` AS `WONDAN_BARCODE` FROM ((`WORKING_PART` `wp` join `WONDAN` `w` on(`wp`.`WONDAN_NAME` = `w`.`NO`)) join `PRODUCTS` `p` on(`wp`.`PRODUCT_CODE` = `p`.`NO`)) ;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- 테이블의 인덱스 `BARCODE_COUNT`
--
ALTER TABLE `BARCODE_COUNT`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `PRODUCT_BARCODE` (`PRODUCT_CODE`),
  ADD KEY `PRODUCT_CODE` (`PRODUCT_CODE`);

--
-- 테이블의 인덱스 `BOARD_ATTACHMENT`
--
ALTER TABLE `BOARD_ATTACHMENT`
  ADD PRIMARY KEY (`ATTACHMENT_ID`),
  ADD KEY `POST_ID` (`POST_ID`);

--
-- 테이블의 인덱스 `BOARD_CATEGORY`
--
ALTER TABLE `BOARD_CATEGORY`
  ADD PRIMARY KEY (`CATEGORY_ID`);

--
-- 테이블의 인덱스 `BOARD_COMMENT`
--
ALTER TABLE `BOARD_COMMENT`
  ADD PRIMARY KEY (`COMMENT_ID`),
  ADD KEY `POST_ID` (`POST_ID`),
  ADD KEY `PARENT_COMMENT_ID` (`PARENT_COMMENT_ID`),
  ADD KEY `AUTHOR_NO` (`AUTHOR_NO`);

--
-- 테이블의 인덱스 `BOARD_POST`
--
ALTER TABLE `BOARD_POST`
  ADD PRIMARY KEY (`POST_ID`),
  ADD KEY `CATEGORY_ID` (`CATEGORY_ID`),
  ADD KEY `AUTHOR_NO` (`AUTHOR_NO`);

--
-- 테이블의 인덱스 `BOX`
--
ALTER TABLE `BOX`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `CHAR_DIM`
--
ALTER TABLE `CHAR_DIM`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `DAYS_PRODUCTION`
--
ALTER TABLE `DAYS_PRODUCTION`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `DELIVERY`
--
ALTER TABLE `DELIVERY`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `INVENTORY`
--
ALTER TABLE `INVENTORY`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `PRODUCT_NO` (`PRODUCT_NO`);

--
-- 테이블의 인덱스 `JAEDAN`
--
ALTER TABLE `JAEDAN`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `JAEDAN_PRODUCTS`
--
ALTER TABLE `JAEDAN_PRODUCTS`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `JAEDAN_PRODUCT_PART`
--
ALTER TABLE `JAEDAN_PRODUCT_PART`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `PART_JAEDAN`
--
ALTER TABLE `PART_JAEDAN`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `PROCESS_CHART`
--
ALTER TABLE `PROCESS_CHART`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `PRODUCTION`
--
ALTER TABLE `PRODUCTION`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `PRODUCTION_PART`
--
ALTER TABLE `PRODUCTION_PART`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `PRODUCTS`
--
ALTER TABLE `PRODUCTS`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `SCANNED_BARCODE`
--
ALTER TABLE `SCANNED_BARCODE`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `BARCODE` (`BARCODE`);

--
-- 테이블의 인덱스 `SCM_REGISTER`
--
ALTER TABLE `SCM_REGISTER`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `STOCK`
--
ALTER TABLE `STOCK`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- 테이블의 인덱스 `WONDAN`
--
ALTER TABLE `WONDAN`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `WONDAN_CODE` (`WONDAN_NAME`);

--
-- 테이블의 인덱스 `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `LOT_NO` (`LOT_NO`),
  ADD KEY `fk_WONDAN_CODE` (`WONDAN_CODE`);

--
-- 테이블의 인덱스 `WORKERS`
--
ALTER TABLE `WORKERS`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `WORKER_COUNT`
--
ALTER TABLE `WORKER_COUNT`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `WORKER_SCHEDULE`
--
ALTER TABLE `WORKER_SCHEDULE`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `WORKER_NO` (`WORKER_NO`);

--
-- 테이블의 인덱스 `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `WORKING_PART`
--
ALTER TABLE `WORKING_PART`
  ADD PRIMARY KEY (`NO`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 테이블의 AUTO_INCREMENT `BARCODE_COUNT`
--
ALTER TABLE `BARCODE_COUNT`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- 테이블의 AUTO_INCREMENT `BOARD_ATTACHMENT`
--
ALTER TABLE `BOARD_ATTACHMENT`
  MODIFY `ATTACHMENT_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `BOARD_CATEGORY`
--
ALTER TABLE `BOARD_CATEGORY`
  MODIFY `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 테이블의 AUTO_INCREMENT `BOARD_COMMENT`
--
ALTER TABLE `BOARD_COMMENT`
  MODIFY `COMMENT_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `BOARD_POST`
--
ALTER TABLE `BOARD_POST`
  MODIFY `POST_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `BOX`
--
ALTER TABLE `BOX`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `DAYS_PRODUCTION`
--
ALTER TABLE `DAYS_PRODUCTION`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 테이블의 AUTO_INCREMENT `DELIVERY`
--
ALTER TABLE `DELIVERY`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 테이블의 AUTO_INCREMENT `INVENTORY`
--
ALTER TABLE `INVENTORY`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 테이블의 AUTO_INCREMENT `JAEDAN`
--
ALTER TABLE `JAEDAN`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- 테이블의 AUTO_INCREMENT `JAEDAN_PRODUCTS`
--
ALTER TABLE `JAEDAN_PRODUCTS`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 테이블의 AUTO_INCREMENT `JAEDAN_PRODUCT_PART`
--
ALTER TABLE `JAEDAN_PRODUCT_PART`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `PART_JAEDAN`
--
ALTER TABLE `PART_JAEDAN`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `PROCESS_CHART`
--
ALTER TABLE `PROCESS_CHART`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `PRODUCTION`
--
ALTER TABLE `PRODUCTION`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `PRODUCTION_PART`
--
ALTER TABLE `PRODUCTION_PART`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `PRODUCTS`
--
ALTER TABLE `PRODUCTS`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- 테이블의 AUTO_INCREMENT `SCANNED_BARCODE`
--
ALTER TABLE `SCANNED_BARCODE`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=325;

--
-- 테이블의 AUTO_INCREMENT `SCM_REGISTER`
--
ALTER TABLE `SCM_REGISTER`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=606;

--
-- 테이블의 AUTO_INCREMENT `STOCK`
--
ALTER TABLE `STOCK`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `WONDAN`
--
ALTER TABLE `WONDAN`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 테이블의 AUTO_INCREMENT `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- 테이블의 AUTO_INCREMENT `WORKERS`
--
ALTER TABLE `WORKERS`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 테이블의 AUTO_INCREMENT `WORKER_COUNT`
--
ALTER TABLE `WORKER_COUNT`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- 테이블의 AUTO_INCREMENT `WORKER_SCHEDULE`
--
ALTER TABLE `WORKER_SCHEDULE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 테이블의 AUTO_INCREMENT `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- 테이블의 AUTO_INCREMENT `WORKING_PART`
--
ALTER TABLE `WORKING_PART`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `BOARD_ATTACHMENT`
--
ALTER TABLE `BOARD_ATTACHMENT`
  ADD CONSTRAINT `BOARD_ATTACHMENT_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `BOARD_POST` (`POST_ID`);

--
-- 테이블의 제약사항 `BOARD_COMMENT`
--
ALTER TABLE `BOARD_COMMENT`
  ADD CONSTRAINT `BOARD_COMMENT_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `BOARD_POST` (`POST_ID`),
  ADD CONSTRAINT `BOARD_COMMENT_ibfk_2` FOREIGN KEY (`PARENT_COMMENT_ID`) REFERENCES `BOARD_COMMENT` (`COMMENT_ID`),
  ADD CONSTRAINT `BOARD_COMMENT_ibfk_3` FOREIGN KEY (`AUTHOR_NO`) REFERENCES `ACCOUNT` (`NO`);

--
-- 테이블의 제약사항 `BOARD_POST`
--
ALTER TABLE `BOARD_POST`
  ADD CONSTRAINT `BOARD_POST_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `BOARD_CATEGORY` (`CATEGORY_ID`),
  ADD CONSTRAINT `BOARD_POST_ibfk_2` FOREIGN KEY (`AUTHOR_NO`) REFERENCES `ACCOUNT` (`NO`);

--
-- 테이블의 제약사항 `WORKER_SCHEDULE`
--
ALTER TABLE `WORKER_SCHEDULE`
  ADD CONSTRAINT `WORKER_SCHEDULE_ibfk_1` FOREIGN KEY (`WORKER_NO`) REFERENCES `WORKERS` (`NO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

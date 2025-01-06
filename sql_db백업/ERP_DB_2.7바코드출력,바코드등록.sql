-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 24-06-17 23:43
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
-- 데이터베이스: `ERP_DB`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `ACCOUNT`
--

CREATE TABLE `ACCOUNT` (
  `NO` int(10) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `PASSWORD` varchar(30) DEFAULT NULL,
  `ROLE` varchar(20) NOT NULL DEFAULT '사원',
  `POSITION` varchar(20) NOT NULL DEFAULT '사원',
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `ACCOUNT_STATE` int(11) NOT NULL DEFAULT 1 COMMENT '사용자 상태',
  `LEVEL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ACCOUNT`
--

INSERT INTO `ACCOUNT` (`NO`, `EMAIL`, `NAME`, `PASSWORD`, `ROLE`, `POSITION`, `CREATE_DATE`, `ACCOUNT_STATE`, `LEVEL`) VALUES
(1, 'ADMIN', 'ADMIN', '1', '관리자', 'ADMIN', '2024-05-14', 1, 100),
(2, 'tera@email.com', 'tera', '1', '읽기', '사원', '2024-05-22', 1, 10),
(3, 'tera', 'TERA', '1', '읽기', '사원', '2024-05-28', 1, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `ASSY_PART`
--

CREATE TABLE `ASSY_PART` (
  `ID` int(11) NOT NULL,
  `ASSY_PART_NAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ASSY_PART`
--

INSERT INTO `ASSY_PART` (`ID`, `ASSY_PART_NAME`) VALUES
(2, 'CAB'),
(3, 'CENTER'),
(1, 'DAB'),
(4, 'KAB'),
(6, 'PAB'),
(5, 'SAB');

-- --------------------------------------------------------

--
-- 테이블 구조 `ASSY_SUB_PART`
--

CREATE TABLE `ASSY_SUB_PART` (
  `ID` int(11) NOT NULL,
  `ASSY_SUB_NAME` varchar(30) NOT NULL,
  `CUSIN_NO` varchar(30) NOT NULL,
  `FOLDING_NO` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `ASSY_SUB_PART`
--

INSERT INTO `ASSY_SUB_PART` (`ID`, `ASSY_SUB_NAME`, `CUSIN_NO`, `FOLDING_NO`) VALUES
(1, 'TDCV', 'AAA', NULL),
(2, 'EU', 'AAA', NULL),
(3, 'VN', 'BBB', NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `CAR`
--

CREATE TABLE `CAR` (
  `ID` int(10) NOT NULL,
  `CAR_NAME` varchar(30) NOT NULL,
  `CAR_DESCRIPTION` varchar(30) DEFAULT NULL,
  `CAR_CODE` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `CAR`
--

INSERT INTO `CAR` (`ID`, `CAR_NAME`, `CAR_DESCRIPTION`, `CAR_CODE`) VALUES
(1, 'TDCV', NULL, NULL),
(2, 'VF33', NULL, NULL),
(3, '34', NULL, NULL),
(4, 'VF35', NULL, NULL),
(5, 'VF36', NULL, NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `DEFECTIVE_CAT`
--

CREATE TABLE `DEFECTIVE_CAT` (
  `no` int(11) NOT NULL,
  `CATEGORY` varchar(30) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `etc` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `DEFECTIVE_CAT`
--

INSERT INTO `DEFECTIVE_CAT` (`no`, `CATEGORY`, `level`, `etc`) VALUES
(5, '검수', NULL, NULL),
(7, '기타', NULL, NULL),
(3, '봉재불량', NULL, NULL),
(6, '외주', NULL, NULL),
(1, '원단불량', NULL, NULL),
(4, '장비불량', NULL, NULL),
(2, '재단불량', NULL, NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `DEFECTIVE_DATA`
--

CREATE TABLE `DEFECTIVE_DATA` (
  `no` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `PART` varchar(20) NOT NULL,
  `CATEGORY` varchar(30) NOT NULL,
  `SUB_CATEGORY` varchar(30) NOT NULL,
  `COUNT` int(11) NOT NULL,
  `SUM` int(11) DEFAULT NULL,
  `ETC` varchar(30) DEFAULT NULL,
  `CREATED_DATE` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `DEFECTIVE_DATA`
--

INSERT INTO `DEFECTIVE_DATA` (`no`, `DATE`, `PART`, `CATEGORY`, `SUB_CATEGORY`, `COUNT`, `SUM`, `ETC`, `CREATED_DATE`) VALUES
(1, '2024-04-15', 'KAB', '장비불량', '체인불량', 4, NULL, NULL, '2024-04-29 08:08:38'),
(2, '2024-04-01', 'SAB', '재단불량', '탭커팅', 1, NULL, NULL, '2024-04-29 08:09:38'),
(3, '2024-04-01', 'KAB', '원단불량', '원단오염', 5, NULL, NULL, '2024-04-29 08:10:38'),
(4, '2024-04-01', 'KAB', '봉재불량', '밑실부족', 15, NULL, NULL, '2024-04-29 08:11:38'),
(5, '2024-04-01', 'DAB', '장비불량', '체인불량', 3, NULL, NULL, '2024-04-29 08:12:38'),
(6, '2024-04-01', 'DAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 08:13:38'),
(7, '2024-04-02', 'KAB', '봉재불량', '밑실부족', 26, NULL, NULL, '2024-04-29 08:14:38'),
(8, '2024-04-02', 'KAB', '원단불량', '원단오염', 8, NULL, NULL, '2024-04-29 08:15:38'),
(9, '2024-04-02', 'KAB', '재단불량', '벤트홀불량', 1, NULL, NULL, '2024-04-29 08:16:38'),
(10, '2024-04-02', 'KAB', '장비불량', '땀뜸', 1, NULL, NULL, '2024-04-29 08:17:38'),
(11, '2024-04-02', 'DAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 08:18:38'),
(12, '2024-04-02', 'DAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 08:19:38'),
(13, '2024-04-03', 'DAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 08:20:38'),
(14, '2024-04-03', 'KAB', '봉재불량', '밑실부족', 32, NULL, NULL, '2024-04-29 08:21:38'),
(15, '2024-04-03', 'KAB', '원단불량', '원단손상', 3, NULL, NULL, '2024-04-29 08:22:38'),
(16, '2024-04-03', 'KAB', '장비불량', '땀뜸', 5, NULL, NULL, '2024-04-29 08:23:38'),
(18, '2024-04-04', 'KAB', '장비불량', '땀뜸', 5, NULL, NULL, '2024-04-29 08:25:38'),
(19, '2024-04-04', 'KAB', '봉재불량', '밑실부족', 15, NULL, NULL, '2024-04-29 08:26:38'),
(20, '2024-04-04', 'KAB', '원단불량', '원단오염', 3, NULL, NULL, '2024-04-29 08:27:38'),
(21, '2024-04-04', 'KAB', '장비불량', '체인불량', 4, NULL, NULL, '2024-04-29 08:28:38'),
(22, '2024-04-04', 'KAB', '봉재불량', '부품추가', 1, NULL, NULL, '2024-04-29 08:29:38'),
(24, '2024-04-05', 'KAB', '원단불량', '원단오염', 4, NULL, NULL, '2024-04-29 08:31:38'),
(25, '2024-04-05', 'KAB', '봉재불량', '밑실부족', 5, NULL, NULL, '2024-04-29 08:32:38'),
(26, '2024-04-05', 'KAB', '봉재불량', '접힘', 1, NULL, NULL, '2024-04-29 08:33:38'),
(27, '2024-04-05', 'SAB', '장비불량', '체인불량', 4, NULL, NULL, '2024-04-29 08:34:38'),
(28, '2024-04-05', 'KAB', '장비불량', '원점이탈', 6, NULL, NULL, '2024-04-29 08:35:38'),
(29, '2024-04-05', 'SAB', '장비불량', '원점이탈', 6, NULL, NULL, '2024-04-29 08:36:38'),
(30, '2024-04-08', 'KAB', '원단불량', '원단손상', 9, NULL, NULL, '2024-04-29 08:37:38'),
(31, '2024-04-08', 'KAB', '원단불량', '원단오염', 2, NULL, NULL, '2024-04-29 08:38:38'),
(32, '2024-04-08', 'KAB', '봉재불량', '실끓어짐', 7, NULL, NULL, '2024-04-29 08:39:38'),
(33, '2024-04-08', 'KAB', '장비불량', '체인불량', 5, NULL, NULL, '2024-04-29 08:40:38'),
(34, '2024-04-08', 'KAB', '장비불량', '땀뜸', 13, NULL, NULL, '2024-04-29 08:41:38'),
(35, '2024-04-08', 'KAB', '장비불량', '실끓어짐', 4, NULL, NULL, '2024-04-29 08:42:38'),
(36, '2024-04-09', 'KAB', '원단불량', '원단손상', 4, NULL, NULL, '2024-04-29 08:43:38'),
(37, '2024-04-09', 'SAB', '원단불량', '원단오염', 3, NULL, NULL, '2024-04-29 08:44:38'),
(38, '2024-04-09', 'KAB', '재단불량', '벤트홀불량', 1, NULL, NULL, '2024-04-29 08:45:38'),
(39, '2024-04-09', 'KAB', '봉재불량', '밑실부족', 4, NULL, NULL, '2024-04-29 08:46:38'),
(40, '2024-04-09', 'KAB', '봉재불량', '접힘', 1, NULL, NULL, '2024-04-29 08:47:38'),
(41, '2024-04-09', 'KAB', '장비불량', '체인불량', 5, NULL, NULL, '2024-04-29 08:48:38'),
(42, '2024-04-09', 'KAB', '장비불량', '땀뜸', 1, NULL, NULL, '2024-04-29 08:49:38'),
(43, '2024-04-09', 'KAB', '장비불량', '원점이탈', 12, NULL, NULL, '2024-04-29 08:50:38'),
(44, '2024-04-09', 'KAB', '봉재불량', '실끓어짐', 7, NULL, NULL, '2024-04-29 08:51:38'),
(45, '2024-04-09', 'KAB', '장비불량', '땀뜸', 3, NULL, NULL, '2024-04-29 08:52:38'),
(46, '2024-04-09', 'KAB', '장비불량', '체인불량', 2, NULL, NULL, '2024-04-29 08:53:38'),
(48, '2024-04-09', 'SAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 08:55:38'),
(49, '2024-04-09', 'SAB', '봉재불량', '심벤트불량', 5, NULL, NULL, '2024-04-29 08:56:38'),
(50, '2024-04-11', 'SAB', '원단불량', '원단오염', 3, NULL, NULL, '2024-04-29 08:57:38'),
(51, '2024-04-11', 'DAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 08:58:38'),
(52, '2024-04-11', 'DAB', '재단불량', '탭커팅', 1, NULL, NULL, '2024-04-29 08:59:38'),
(53, '2024-04-11', 'SAB', '봉재불량', '밑실부족', 1, NULL, NULL, '2024-04-29 09:00:38'),
(54, '2024-04-11', 'SAB', '장비불량', '실끓어짐', 1, NULL, NULL, '2024-04-29 09:01:38'),
(55, '2024-04-11', 'DAB', '장비불량', '실끓어짐', 1, NULL, NULL, '2024-04-29 09:02:38'),
(56, '2024-04-11', 'SAB', '장비불량', '체인불량', 3, NULL, NULL, '2024-04-29 09:03:38'),
(57, '2024-04-11', 'DAB', '장비불량', '체인불량', 3, NULL, NULL, '2024-04-29 09:04:38'),
(58, '2024-04-11', 'SAB', '봉재불량', '밑실부족', 6, NULL, NULL, '2024-04-29 09:05:38'),
(59, '2024-04-11', 'SAB', '장비불량', '밑실끓어짐', 4, NULL, NULL, '2024-04-29 09:06:38'),
(60, '2024-04-11', 'DAB', '장비불량', '체인불량', 6, NULL, NULL, '2024-04-29 09:07:38'),
(61, '2024-04-12', 'SAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 09:08:38'),
(62, '2024-04-12', 'KAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 09:09:38'),
(63, '2024-04-12', 'DAB', '봉재불량', '마감봉재', 1, NULL, NULL, '2024-04-29 09:10:38'),
(64, '2024-04-12', 'KAB', '봉재불량', '접힘', 3, NULL, NULL, '2024-04-29 09:11:38'),
(65, '2024-04-12', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:12:38'),
(66, '2024-04-12', 'SAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:13:38'),
(67, '2024-04-12', 'SAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:14:38'),
(68, '2024-04-12', 'SAB', '장비불량', '밑실끓어짐', 10, NULL, NULL, '2024-04-29 09:15:38'),
(69, '2024-04-15', 'SAB', '원단불량', '원단손상', 2, NULL, NULL, '2024-04-29 09:16:38'),
(70, '2024-04-15', 'SAB', '장비불량', '접힘', 1, NULL, NULL, '2024-04-29 09:17:38'),
(71, '2024-04-15', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:18:38'),
(72, '2024-04-15', 'KAB', '장비불량', '밑실불량', 5, NULL, NULL, '2024-04-29 09:19:38'),
(73, '2024-04-15', 'SAB', '장비불량', '밑실끓어짐', 8, NULL, NULL, '2024-04-29 09:20:38'),
(74, '2024-04-15', 'SAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:21:38'),
(75, '2024-04-15', 'SAB', '봉재불량', '부품추가', 2, NULL, NULL, '2024-04-29 09:22:38'),
(76, '2024-04-16', 'SAB', '원단불량', '원단오염', 11, NULL, NULL, '2024-04-29 09:23:38'),
(77, '2024-04-16', 'SAB', '장비불량', '밑실불량', 7, NULL, NULL, '2024-04-29 09:24:38'),
(78, '2024-04-16', 'SAB', '장비불량', '밑실불량', 1, NULL, NULL, '2024-04-29 09:25:38'),
(79, '2024-04-16', 'SAB', '봉재불량', '밑실부족', 1, NULL, NULL, '2024-04-29 09:26:38'),
(80, '2024-04-16', 'SAB', '재단불량', '벤트홀불량', 10, NULL, NULL, '2024-04-29 09:27:38'),
(81, '2024-04-16', 'SAB', '장비불량', '밑실끓어짐', 3, NULL, NULL, '2024-04-29 09:28:38'),
(82, '2024-04-17', 'SAB', '원단불량', '원단손상', 4, NULL, NULL, '2024-04-29 09:29:38'),
(83, '2024-04-17', 'SAB', '원단불량', '원단손상', 4, NULL, NULL, '2024-04-29 09:30:38'),
(84, '2024-04-17', 'SAB', '봉재불량', '밑실부족', 3, NULL, NULL, '2024-04-29 09:31:38'),
(85, '2024-04-17', 'KAB', '봉재불량', '밑실부족', 3, NULL, NULL, '2024-04-29 09:32:38'),
(86, '2024-04-17', 'SAB', '봉재불량', '접힘', 1, NULL, NULL, '2024-04-29 09:33:38'),
(87, '2024-04-17', 'SAB', '장비불량', '밑실불량', 6, NULL, NULL, '2024-04-29 09:34:38'),
(88, '2024-04-17', 'KAB', '장비불량', '밑실불량', 7, NULL, NULL, '2024-04-29 09:35:38'),
(89, '2024-04-17', 'KAB', '장비불량', '체인불량', 4, NULL, NULL, '2024-04-29 09:36:38'),
(90, '2024-04-18', 'SAB', '장비불량', '체인불량', 6, NULL, NULL, '2024-04-29 09:37:38'),
(91, '2024-04-18', 'KAB', '장비불량', '밑실불량', 7, NULL, NULL, '2024-04-29 09:38:38'),
(92, '2024-04-18', 'KAB', '봉재불량', '이탈', 1, NULL, NULL, '2024-04-29 09:39:38'),
(93, '2024-04-18', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:40:38'),
(94, '2024-04-18', 'KAB', '장비불량', '원점이탈', 2, NULL, NULL, '2024-04-29 09:41:38'),
(95, '2024-04-18', 'CENTER', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 09:42:38'),
(96, '2024-04-18', 'SAB', '봉재불량', '접힘', 23, NULL, NULL, '2024-04-29 09:43:38'),
(97, '2024-04-19', 'KAB', '원단불량', '원단손상', 3, NULL, NULL, '2024-04-29 09:44:38'),
(98, '2024-04-19', 'CENTER', '원단불량', '원단손상', 1, NULL, NULL, '2024-04-29 09:45:38'),
(99, '2024-04-19', 'SAB', '재단불량', '탭커팅', 8, NULL, NULL, '2024-04-29 09:46:38'),
(100, '2024-04-19', 'KAB', '재단불량', '탭커팅', 1, NULL, NULL, '2024-04-29 09:47:38'),
(101, '2024-04-19', 'CENTER', '봉재불량', '마감봉재', 1, NULL, NULL, '2024-04-29 09:48:38'),
(102, '2024-04-19', 'KAB', '장비불량', '체인불량', 2, NULL, NULL, '2024-04-29 09:49:38'),
(103, '2024-04-19', 'CENTER', '장비불량', '체인불량', 2, NULL, NULL, '2024-04-29 09:50:38'),
(104, '2024-04-19', 'KAB', '봉재불량', '접힘', 1, NULL, NULL, '2024-04-29 09:51:38'),
(105, '2024-04-19', 'CENTER', '장비불량', '땀뜸', 4, NULL, NULL, '2024-04-29 09:52:38'),
(106, '2024-04-19', 'SAB', '장비불량', '체인불량', 2, NULL, NULL, '2024-04-29 09:53:38'),
(108, '2024-04-22', 'KAB', '원단불량', '원단손상', 1, NULL, NULL, '2024-04-29 09:55:38'),
(109, '2024-04-22', 'KAB', '원단불량', '원단오염', 5, NULL, NULL, '2024-04-29 09:56:38'),
(110, '2024-04-22', 'CENTER', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 09:57:38'),
(111, '2024-04-22', 'CENTER', '봉재불량', '밑실부족', 3, NULL, NULL, '2024-04-29 09:58:38'),
(112, '2024-04-22', 'CENTER', '장비불량', '밑실불량', 6, NULL, NULL, '2024-04-29 09:59:38'),
(113, '2024-04-22', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 10:00:38'),
(114, '2024-04-22', 'CENTER', '장비불량', '땀뜸', 1, NULL, NULL, '2024-04-29 10:01:38'),
(115, '2024-04-22', 'CENTER', '원단불량', '원단오염', 3, NULL, NULL, '2024-04-29 10:02:38'),
(116, '2024-04-22', 'KAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 10:03:38'),
(117, '2024-04-23', 'KAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 10:04:38'),
(118, '2024-04-23', 'KAB', '재단불량', '탭커팅', 4, NULL, NULL, '2024-04-29 10:05:38'),
(119, '2024-04-23', 'KAB', '봉재불량', '밑실부족', 3, NULL, NULL, '2024-04-29 10:06:38'),
(120, '2024-04-23', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 10:07:38'),
(121, '2024-04-23', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 10:08:38'),
(122, '2024-04-23', 'KAB', '장비불량', '밑실끓어짐', 1, NULL, NULL, '2024-04-29 10:09:38'),
(123, '2024-04-23', 'KAB', '원단불량', '원단손상', 3, NULL, NULL, '2024-04-29 10:10:38'),
(124, '2024-04-23', 'KAB', '장비불량', '밑실불량', 4, NULL, NULL, '2024-04-29 10:11:38'),
(126, '2024-04-24', 'DAB', '원단불량', '원단오염', 6, NULL, NULL, '2024-04-29 10:13:38'),
(127, '2024-04-24', 'CENTER', '원단불량', '원단오염', 2, NULL, NULL, '2024-04-29 10:14:38'),
(128, '2024-04-24', 'KAB', '원단불량', '원단오염', 2, NULL, NULL, '2024-04-29 10:15:38'),
(129, '2024-04-24', 'KAB', '장비불량', '땀뜸', 4, 0, NULL, '2024-04-29 10:16:38'),
(130, '2024-04-24', 'SAB', '장비불량', '땀뜸', 2, 0, NULL, '2024-04-29 10:17:38'),
(131, '2024-04-24', 'DAB', '장비불량', '원점이탈', 1, 0, NULL, '2024-04-29 10:18:38'),
(132, '2024-04-24', 'KAB', '장비불량', '체인불량', 1, 0, NULL, '2024-04-29 10:19:38'),
(133, '2024-04-25', 'DAB', '원단불량', '원단오염', 2, 0, NULL, '2024-04-29 10:20:38'),
(134, '2024-04-25', 'DAB', '봉재불량', '이탈', 2, 0, NULL, '2024-04-29 10:21:38'),
(135, '2024-04-25', 'DAB', '장비불량', '밑실불량', 2, 0, NULL, '2024-04-29 10:22:38'),
(136, '2024-04-25', 'DAB', '원단불량', '원단오염', 1, NULL, NULL, '2024-04-29 10:23:38'),
(137, '2024-04-25', 'KAB', '재단불량', '벤트홀불량', 1, NULL, NULL, '2024-04-29 10:24:38'),
(138, '2024-04-25', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 10:25:38'),
(139, '2024-04-26', 'KAB', '원단불량', '원단손상', 6, NULL, NULL, '2024-04-29 10:26:38'),
(140, '2024-04-26', 'KAB', '재단불량', '탭커팅', 4, NULL, NULL, '2024-04-29 10:27:38'),
(141, '2024-04-26', 'KAB', '장비불량', '땀뜸', 1, NULL, NULL, '2024-04-29 10:28:38'),
(142, '2024-04-26', 'KAB', '장비불량', '밑실불량', 6, NULL, NULL, '2024-04-29 10:29:38'),
(143, '2024-04-26', 'KAB', '장비불량', '밑실끓어짐', 2, NULL, NULL, '2024-04-29 10:30:38'),
(144, '2024-04-26', 'KAB', '봉재불량', '부품누락', 1, NULL, NULL, '2024-04-29 10:31:38'),
(145, '2024-04-29', 'SAB', '재단불량', '탭커팅', 7, NULL, NULL, '2024-04-29 10:32:38'),
(146, '2024-04-29', 'KAB', '봉재불량', '밑실부족', 1, NULL, NULL, '2024-04-29 10:33:38'),
(147, '2024-04-29', 'SAB', '봉재불량', '이탈', 1, NULL, NULL, '2024-04-29 10:34:38'),
(148, '2024-04-29', 'CENTER', '봉재불량', '이탈', 2, NULL, NULL, '2024-04-29 10:35:38'),
(149, '2024-04-29', 'SAB', '장비불량', '땀뜸', 1, NULL, NULL, '2024-04-29 10:36:38'),
(150, '2024-04-29', 'CENTER', '장비불량', '밑실불량', 4, NULL, NULL, '2024-04-29 10:37:38'),
(151, '2024-04-29', 'KAB', '장비불량', '체인불량', 1, NULL, NULL, '2024-04-29 10:38:38'),
(152, '2024-04-29', 'SAB', '장비불량', '밑실불량', 1, NULL, NULL, '2024-04-29 10:39:38'),
(153, '2024-04-30', 'KAB', '원단불량', '원단손상', 1, NULL, NULL, '2024-04-29 10:40:38'),
(154, '2024-04-30', 'CENTER', '봉재불량', '밑실부족', 2, NULL, NULL, '2024-04-29 10:41:38'),
(155, '2024-04-30', 'SAB', '원단불량', '원단오염', 3, NULL, NULL, '2024-04-29 10:42:38'),
(156, '2024-04-30', 'CENTER', '봉재불량', '접힘', 1, NULL, NULL, '2024-04-29 10:43:38'),
(157, '2024-04-30', 'KAB', '장비불량', '땀뜸', 1, NULL, NULL, '2024-04-29 10:44:38'),
(158, '2024-04-30', 'CENTER', '장비불량', '밑실끓어짐', 2, NULL, NULL, '2024-04-29 10:45:38'),
(159, '2024-04-03', 'KAB', '검수', '미분류', 7, NULL, NULL, '2024-04-29 21:49:57'),
(160, '2024-04-03', 'KAB', '검수', '체인불량', 2, NULL, NULL, '2024-04-29 21:50:52'),
(161, '2024-04-09', 'SAB', '외주', '기타', 2, NULL, NULL, '2024-04-29 21:53:01'),
(162, '2024-04-19', 'SAB', '외주', '외주불량', 1, NULL, NULL, '2024-04-29 21:53:01'),
(163, '2024-04-23', 'KAB', '기타', '기타', 1, NULL, NULL, '2024-04-29 21:53:16'),
(164, '2024-04-30', 'CENTER', '기타', '미분류', 14, NULL, NULL, '2024-04-29 21:53:16'),
(166, '2024-05-02', 'KAB', '원단불량', '원단오염', 4, 0, '', '2024-05-01 23:10:20'),
(167, '2024-05-02', 'SAB', '원단불량', '원단손상', 1, 0, '', '2024-05-01 23:10:42'),
(168, '2024-05-02', 'SAB', '봉재불량', '밑실부족', 1, 0, '', '2024-05-01 23:11:00'),
(169, '2024-05-02', 'SAB', '봉재불량', '부품누락', 1, 0, '', '2024-05-01 23:11:17'),
(170, '2024-05-02', 'SAB', '봉재불량', '부품변경', 14, 0, '부품구분 잘 안됨', '2024-05-01 23:19:39'),
(171, '2024-05-02', 'KAB', '장비불량', '체인불량', 1, 0, '', '2024-05-01 23:20:09'),
(172, '2024-05-02', 'KAB', '장비불량', '밑실끓어짐', 1, 0, '', '2024-05-01 23:20:40'),
(173, '2024-05-03', 'SAB', '원단불량', '원단오염', 2, 0, '', '2024-05-02 23:01:45'),
(174, '2024-05-03', 'SAB', '재단불량', '탭커팅', 2, 0, '', '2024-05-02 23:02:19'),
(175, '2024-05-03', 'CAB', '재단불량', '탭커팅', 1, 0, '', '2024-05-02 23:02:29'),
(176, '2024-05-03', 'KAB', '재단불량', '탭커팅', 1, 0, '', '2024-05-02 23:02:34'),
(177, '2024-05-03', 'SAB', '봉재불량', '밑실부족', 1, 0, '', '2024-05-02 23:02:59'),
(178, '2024-05-03', 'SAB', '장비불량', '밑실불량', 1, 0, '', '2024-05-02 23:03:43'),
(179, '2024-05-03', 'CENTER', '장비불량', '밑실불량', 1, 0, '', '2024-05-02 23:03:50'),
(180, '2024-05-03', 'CENTER', '장비불량', '원점이탈', 9, 0, '', '2024-05-02 23:04:43'),
(181, '2024-05-03', 'SAB', '장비불량', '원점이탈', 1, 0, '', '2024-05-02 23:04:51'),
(183, '2024-05-07', 'CAB', '기타', '기타', 1, 0, '', '2024-05-07 11:33:33'),
(184, '2024-05-07', '봉재불량', '밑실부족', '2', 2, NULL, NULL, '2024-05-08 07:25:34'),
(185, '2024-05-07', '봉재불량', '밑실부족', '1', 1, NULL, NULL, '2024-05-08 07:25:34'),
(186, '2024-05-07', '장비불량', '땀뜸', '1', 1, NULL, NULL, '2024-05-08 07:25:34'),
(187, '2024-05-07', '장비불량', '땀뜸', '5', 5, NULL, NULL, '2024-05-08 07:25:34'),
(188, '2024-05-07', '장비불량', '체인불량', '1', 1, NULL, NULL, '2024-05-08 07:25:34'),
(189, '2024-05-08', 'KAB', '봉재불량', '밑실부족', 2, 0, '', '2024-05-08 08:01:31'),
(190, '2024-05-08', 'KAB', '봉재불량', '접힘', 1, 0, '', '2024-05-08 08:01:46'),
(191, '2024-05-08', 'KAB', '장비불량', '밑실불량', 2, 0, '', '2024-05-08 08:02:20'),
(192, '2024-05-08', 'KAB', '장비불량', '원점이탈', 4, 0, '', '2024-05-08 08:02:44'),
(194, '2024-05-08', 'SAB', '장비불량', '원점이탈', 1, 0, '', '2024-05-08 08:03:53'),
(195, '2024-05-09', 'KAB', '원단불량', '원단오염', 4, 0, '', '2024-05-12 23:32:23'),
(196, '2024-05-09', 'KAB', '장비불량', '체인불량', 1, 0, '', '2024-05-12 23:32:46'),
(197, '2024-05-10', 'KAB', '장비불량', '밑실불량', 2, 0, '', '2024-05-12 23:33:13'),
(198, '2024-05-13', 'KAB', '봉재불량', '접힘', 2, 0, '', '2024-05-13 08:04:14'),
(199, '2024-05-13', 'KAB', '장비불량', '땀뜸', 1, 0, '', '2024-05-13 08:04:32'),
(200, '2024-05-13', 'KAB', '장비불량', '밑실불량', 1, 0, '', '2024-05-13 08:04:42'),
(201, '2024-05-14', 'SAB', '재단불량', '벤트홀불량', 1, 0, '', '2024-05-14 08:15:37'),
(202, '2024-05-14', 'KAB', '봉재불량', '마감봉재', 1, 0, '', '2024-05-14 08:16:01'),
(203, '2024-05-14', 'KAB', '장비불량', '원점이탈', 2, 0, '', '2024-05-14 08:16:31'),
(204, '2024-05-14', 'SAB', '장비불량', '원점이탈', 1, 0, '', '2024-05-14 08:16:39'),
(205, '2024-05-14', 'KAB', '장비불량', '체인불량', 2, 0, '', '2024-05-14 08:17:44'),
(206, '2024-05-14', 'KAB', '봉재불량', '접힘', 1, 0, '', '2024-05-14 08:17:59');

-- --------------------------------------------------------

--
-- 테이블 구조 `DEFECTIVE_SUB_CAT`
--

CREATE TABLE `DEFECTIVE_SUB_CAT` (
  `no` int(11) NOT NULL,
  `SUB_CATEGORY` varchar(30) NOT NULL,
  `PARENT_CAT` varchar(20) NOT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `DEFECTIVE_SUB_CAT`
--

INSERT INTO `DEFECTIVE_SUB_CAT` (`no`, `SUB_CATEGORY`, `PARENT_CAT`, `level`) VALUES
(24, '기타', '기타', NULL),
(18, '땀뜸', '장비불량', NULL),
(10, '땀수', '봉재불량', NULL),
(22, '라벨누락', '검수', NULL),
(13, '마감봉재', '봉재불량', NULL),
(25, '미분류', '검수', NULL),
(20, '밑실끓어짐', '장비불량', NULL),
(6, '밑실부족', '봉재불량', NULL),
(19, '밑실불량', '장비불량', NULL),
(3, '벤트홀불량', '재단불량', NULL),
(8, '부품누락', '봉재불량', NULL),
(26, '부품변경', '봉재불량', NULL),
(9, '부품추가', '봉재불량', NULL),
(14, '실끓어짐', '봉재불량', NULL),
(5, '심벤트불량', '봉재불량', NULL),
(23, '외주불량', '외주', NULL),
(1, '원단손상', '원단불량', NULL),
(2, '원단오염', '원단불량', NULL),
(21, '원점이탈', '장비불량', NULL),
(11, '이물질추가', '봉재불량', NULL),
(16, '이탈', '봉재불량', NULL),
(7, '접힘', '봉재불량', NULL),
(17, '체인불량', '장비불량', NULL),
(15, '탭부착불량', '봉재불량', NULL),
(4, '탭커팅', '재단불량', NULL),
(12, '테더봉재불량', '봉재불량', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `JADANFINISHED`
-- (See below for the actual view)
--
CREATE TABLE `JADANFINISHED` (
`NO` int(11)
,`WORK_ORDER_NO` int(10)
,`CREATE_DATE` varchar(10)
,`WORK_DATE` varchar(10)
,`COUNT` int(10)
,`WORKING_PART` int(10)
,`LOT` varchar(30)
,`regAccount` varchar(30)
,`updateAccount` varchar(30)
,`PUMBUN` varchar(30)
,`ASSY_PART_NAME` varchar(30)
,`ASSY_SUB_PART_NAME` varchar(30)
,`JAEDAN_PART_NAME` varchar(30)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `JADAN_INVENTORY`
--

CREATE TABLE `JADAN_INVENTORY` (
  `NO` int(10) NOT NULL,
  `WORK_DAY` date NOT NULL DEFAULT current_timestamp(),
  `JAEDAN_PART_NAME` varchar(30) NOT NULL,
  `COUNT` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JADAN_INVENTORY`
--

INSERT INTO `JADAN_INVENTORY` (`NO`, `WORK_DAY`, `JAEDAN_PART_NAME`, `COUNT`) VALUES
(1, '2024-05-27', '1', 1),
(2, '2024-06-03', '1', 1),
(3, '2024-06-03', '1', 1),
(4, '2024-06-10', '2', 1),
(5, '2024-06-10', '2', 1),
(6, '2024-06-10', '2', 1),
(7, '2024-06-10', '2', 1),
(8, '2024-06-10', '2', 1),
(9, '2024-06-10', '2', 1),
(10, '2024-06-10', '2', 1),
(11, '2024-06-10', '2', 1),
(12, '2024-06-10', '1', 100),
(13, '2024-06-14', '16', 1),
(14, '2024-06-14', '16', 1),
(15, '2024-06-14', '16', 1),
(16, '2024-06-14', '16', 1),
(17, '2024-06-14', '16', 1),
(18, '2024-06-14', '16', 1),
(19, '2024-06-10', '2', 1),
(20, '2024-06-14', '16', 1),
(21, '2024-06-10', '1', 100),
(22, '2024-06-10', '2', 1),
(23, '2024-06-14', '16', 1),
(24, '2024-06-10', '2', 1),
(25, '2024-06-10', '1', 100),
(26, '2024-06-10', '2', 1),
(27, '2024-06-10', '2', 1),
(28, '2024-06-10', '1', 100),
(29, '2024-06-14', '16', 1),
(30, '2024-06-10', '2', 1),
(31, '2024-06-10', '1', 100),
(32, '2024-06-10', '2', 1),
(33, '2024-06-10', '2', 1),
(34, '2024-06-10', '2', 1),
(35, '2024-06-10', '2', 1),
(36, '2024-06-14', '1', 1),
(37, '2024-06-14', '16', 100),
(38, '2024-06-14', '1', 1),
(39, '2024-06-15', '1', 100),
(40, '2024-06-15', '16', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `JAEDAN_PART`
--

CREATE TABLE `JAEDAN_PART` (
  `ID` int(10) NOT NULL,
  `JAEDAN_PART_NAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JAEDAN_PART`
--

INSERT INTO `JAEDAN_PART` (`ID`, `JAEDAN_PART_NAME`) VALUES
(5, 'CAB TAP'),
(4, 'CAB 인어백'),
(6, 'CENTER 메인'),
(7, 'CENTER 테더'),
(3, 'DAB FRONT'),
(2, 'DAB REAR'),
(8, 'KAB 메인'),
(9, 'KAB 테더'),
(1, 'LD LAB'),
(13, 'PAB SR'),
(14, 'PABAB 메인'),
(10, 'SAB LH 메인'),
(12, 'SAB LH 태더'),
(11, 'SAB RH 메인');

-- --------------------------------------------------------

--
-- 테이블 구조 `JAEDAN_REGIST`
--

CREATE TABLE `JAEDAN_REGIST` (
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
  `UPDATE_ACCOUNT` int(10) DEFAULT NULL,
  `PRODUCTION_ACCOUNT` int(10) DEFAULT NULL,
  `PROCESSCODE` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JAEDAN_REGIST`
--

INSERT INTO `JAEDAN_REGIST` (`NO`, `WORK_ORDER_NO`, `WONDAN_STORE`, `WONDAN_MANAGER_NO`, `LOT`, `Y_COUNT`, `MARKS`, `COUNT`, `DEFECTIVE`, `CREATE_DATE`, `WORK_DATE`, `REG_ACCOUNT`, `STATE`, `UPDATE_ACCOUNT`, `PRODUCTION_ACCOUNT`, `PROCESSCODE`) VALUES
(33, 25, 5, '1', '5', 1, 1, 1, 1, '2024-06-14', '2024-06-14', 2, 3, 2, 2, 'LDLAB2024061433'),
(35, 25, 6, '1', 'safdadfasfa', 1, 1, 100, 1, '2024-06-15', '2024-06-15', 2, 3, 2, 2, 'LDLAB2024061535'),
(36, 26, 1, '1', '1', 1, 1, 1, 1, '2024-06-15', '2024-06-15', 2, 3, 2, 2, 'PABSR2024061536');

--
-- 트리거 `JAEDAN_REGIST`
--
DELIMITER $$
CREATE TRIGGER `after_jaedan_regist_update` AFTER UPDATE ON `JAEDAN_REGIST` FOR EACH ROW BEGIN
    IF NEW.STATE = 1 THEN
        INSERT INTO `JADAN_INVENTORY` (`WORK_DAY`, `JAEDAN_PART_NAME`, `COUNT`)
        VALUES (NEW.WORK_DATE, (SELECT WORKING_PART FROM WORKING_ORDER WHERE NO = NEW.WORK_ORDER_NO), NEW.COUNT);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `JAEDAN_WORKING_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `JAEDAN_WORKING_VIEW` (
`JAEDAN_REGIST_NO` int(11)
,`NO` int(11)
,`WORK_ORDER_NO` int(10)
,`WONDAN_STORE` int(10)
,`WONDAN_MANAGER_NO` varchar(10)
,`Y_COUNT` int(10)
,`MARKS` int(10)
,`COUNT` int(10)
,`DEFECTIVE` int(10)
,`CREATE_DATE` date
,`WORK_DATE` date
,`REG_ACCOUNT` int(10)
,`STATE` int(11)
,`WORKING_ORDER_NO` int(10)
,`WONDAN_STORE_NO` int(11)
,`WORKING_PART` int(11)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `PD_DELIVERY`
--

CREATE TABLE `PD_DELIVERY` (
  `NO` int(11) NOT NULL,
  `ID` int(11) DEFAULT NULL,
  `PD_NAME` varchar(30) DEFAULT NULL,
  `COUNT` int(11) DEFAULT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PD_DELIVERY`
--

INSERT INTO `PD_DELIVERY` (`NO`, `ID`, `PD_NAME`, `COUNT`, `DATE`) VALUES
(18, NULL, 'CAB CUSHION [VF33/VN&EU/LH]', 1, '2024-05-21'),
(19, NULL, 'CAB CUSHION [VF33/VN&EU/LH]', 1, '2024-05-21');

--
-- 트리거 `PD_DELIVERY`
--
DELIMITER $$
CREATE TRIGGER `after_pd_delivery_insert` AFTER INSERT ON `PD_DELIVERY` FOR EACH ROW BEGIN
    DECLARE existing_count INT;

    SELECT COUNT(*) INTO existing_count
    FROM PD_INVENTORY
    WHERE PD_NAME = NEW.PD_NAME;

    IF existing_count > 0 THEN
        UPDATE PD_INVENTORY
        SET COUNT = COUNT - NEW.COUNT
        WHERE PD_NAME = NEW.PD_NAME;
    ELSE
        INSERT INTO PD_INVENTORY (PD_NAME, COUNT)
        VALUES (NEW.PD_NAME, -NEW.COUNT);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 테이블 구조 `PD_INVENTORY`
--

CREATE TABLE `PD_INVENTORY` (
  `NO` int(11) NOT NULL,
  `PD_NAME` varchar(30) DEFAULT NULL,
  `COUNT` int(11) DEFAULT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PD_INVENTORY`
--

INSERT INTO `PD_INVENTORY` (`NO`, `PD_NAME`, `COUNT`, `DATE`) VALUES
(4, 'DAB FOLDING [LD]', 104, '2024-05-20'),
(5, 'KAB CUSHION [VF33]', 14, '2024-05-20'),
(6, 'CAB CUSHION [VF33/VN&EU/RH]', 8, '2024-05-20'),
(7, 'DAB FOLDING [VF33/EU]', 10, '2024-05-21'),
(8, 'CAB CUSHION [VF33/VN&EU/LH]', 101, '2024-05-21'),
(9, 'KAB CUSHION [VF34]', 14, '2024-05-21'),
(10, 'PAB FOLDING [VF35/US]', 1700, '2024-05-21'),
(11, 'PAB FOLDING [VF35/VN&EU]', 100, '2024-05-21'),
(12, 'PAB FOLDING [VF36/US]', 200, '2024-05-21');

-- --------------------------------------------------------

--
-- 테이블 구조 `PD_NAME`
--

CREATE TABLE `PD_NAME` (
  `PART` varchar(50) NOT NULL,
  `DESCRIPTION` varchar(100) DEFAULT NULL,
  `PATERNER` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PD_NAME`
--

INSERT INTO `PD_NAME` (`PART`, `DESCRIPTION`, `PATERNER`) VALUES
('CAB', NULL, NULL),
('CENTER', NULL, NULL),
('DAB', 'DAB ', NULL),
('KAB', NULL, NULL),
('PAB', NULL, NULL),
('SAB', NULL, NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `PD_STOCK`
--

CREATE TABLE `PD_STOCK` (
  `NO` int(11) NOT NULL,
  `ID` int(11) DEFAULT NULL,
  `PD_NAME` varchar(30) DEFAULT NULL,
  `COUNT` int(11) DEFAULT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PD_STOCK`
--

INSERT INTO `PD_STOCK` (`NO`, `ID`, `PD_NAME`, `COUNT`, `DATE`) VALUES
(24, NULL, 'DAB FOLDING [LD]', 1, '2024-05-21'),
(25, NULL, 'PAB FOLDING [VF35/US]', 200, '2024-05-21'),
(26, NULL, 'PAB FOLDING [VF35/US]', 500, '2024-05-21'),
(27, NULL, 'PAB FOLDING [VF35/US]', 1000, '2024-05-21'),
(28, NULL, 'PAB FOLDING [VF35/VN&EU]', 100, '2024-05-21'),
(29, NULL, 'PAB FOLDING [VF36/US]', 200, '2024-05-21');

--
-- 트리거 `PD_STOCK`
--
DELIMITER $$
CREATE TRIGGER `after_pd_stock_insert` AFTER INSERT ON `PD_STOCK` FOR EACH ROW BEGIN
    DECLARE existing_count INT;

    SELECT COUNT(*) INTO existing_count
    FROM PD_INVENTORY
    WHERE PD_NAME = NEW.PD_NAME;

    IF existing_count > 0 THEN
        UPDATE PD_INVENTORY
        SET COUNT = COUNT + NEW.COUNT
        WHERE PD_NAME = NEW.PD_NAME;
    ELSE
        INSERT INTO PD_INVENTORY (PD_NAME, COUNT)
        VALUES (NEW.PD_NAME, NEW.COUNT);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 테이블 구조 `PRODUCTION`
--

CREATE TABLE `PRODUCTION` (
  `NO` int(10) NOT NULL,
  `JAEDAN_NO` int(10) DEFAULT NULL,
  `PROCESS_CODE` varchar(30) DEFAULT NULL,
  `LAST_SERIAL_NUMBER` int(10) DEFAULT 0,
  `STATE` int(10) DEFAULT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PRODUCTION`
--

INSERT INTO `PRODUCTION` (`NO`, `JAEDAN_NO`, `PROCESS_CODE`, `LAST_SERIAL_NUMBER`, `STATE`, `CREATE_DATE`) VALUES
(15, 33, 'LDLAB2024061433', 10, 0, '2024-06-17'),
(16, 35, 'LDLAB2024061535', 0, 0, '2024-06-17'),
(18, 36, 'PABSR2024061536', 0, 0, '2024-06-17');

-- --------------------------------------------------------

--
-- 테이블 구조 `SALE_PRODUCT`
--

CREATE TABLE `SALE_PRODUCT` (
  `NO` int(11) NOT NULL,
  `CAR_NAME` varchar(30) NOT NULL,
  `PD_NAME` varchar(30) NOT NULL,
  `PUMBUN` varchar(30) NOT NULL,
  `PUMMYUM` varchar(30) NOT NULL,
  `PRICE` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `SALE_PRODUCT`
--

INSERT INTO `SALE_PRODUCT` (`NO`, `CAR_NAME`, `PD_NAME`, `PUMBUN`, `PUMMYUM`, `PRICE`) VALUES
(1, 'LD', 'DAB', 'KAAL230080K', 'DAB FOLDING [LD]', 0),
(2, 'VF33', 'DAB', 'KAAL230007K', 'DAB FOLDING [VF33/VN&EU]', 0),
(3, 'VF34', 'DAB', 'KAAL230007K-1', 'DAB FOLDING [VF34/VN&EU]', 0),
(4, 'VF35', 'DAB', 'KAAL230020K', 'DAB FOLDING [VF35/VN&EU]', 0),
(5, 'VF35', 'DAB', 'KAAL230060K', 'DAB FOLDING [VF35/US]', 0),
(6, 'VF33', 'PAB', 'KABL230080K', 'PAB FOLDING [VF33/VN&EU]', 0),
(7, 'VF35', 'PAB', 'KABL230000K', 'PAB FOLDING [VF35/US]', 0),
(8, 'VF35', 'PAB', 'KABL230010K', 'PAB FOLDING [VF35/VN&EU]', 0),
(9, 'VF36', 'PAB', 'KABL230040K', 'PAB FOLDING [VF36/VN&EU]', 0),
(10, 'VF36', 'PAB', 'KABL230070K', 'PAB FOLDING [VF36/US]', 0),
(11, 'VF33', 'SAB', 'KACL360010K', 'PROTECTOR [VF33/CeAB]', 0),
(12, 'VF33', 'SAB', 'KACL230090K', 'SAB CUSHION [VF33/FRT/CTR]', 0),
(13, 'VF33', 'SAB', 'KACL231040K', 'SAB CUSHION [VF33/FRT/LH]', 0),
(14, 'VF34', 'SAB', 'KACL231040K-2', 'SAB CUSHION [VF33/FRT/LH]', 0),
(15, 'VF33', 'SAB', 'KACL231050K', 'SAB CUSHION [VF33/FRT/RH]', 0),
(16, 'VF34', 'SAB', 'KACL231050K-2', 'SAB CUSHION [VF33/FRT/RH]', 0),
(17, 'VF33', 'CAB', 'KADL230060K', 'CAB CUSHION [VF33/VN&EU/LH]', 0),
(18, 'VF33', 'CAB', 'KADL230070K', 'CAB CUSHION [VF33/VN&EU/RH]', 0),
(19, 'VF33', 'KAB', 'KAEL230041K', 'KAB CUSHION [VF33]', 0),
(20, 'VF34', 'KAB', 'KAEL230041K-1', 'KAB CUSHION [VF34]', 0),
(21, 'VF33', 'DAB', 'KAAL230011K', 'DAB FOLDING [VF33/EU]', 0),
(22, 'VF33', 'PAB', 'KABL230080K-1', 'PAB FOLDING [VF33/VN&EU]', 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `SCANNED_BARCODE`
--

CREATE TABLE `SCANNED_BARCODE` (
  `NO` int(11) NOT NULL,
  `BARCODE` varchar(255) NOT NULL,
  `CREATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `PRODUCTION_ID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `SCANNED_BARCODE`
--

INSERT INTO `SCANNED_BARCODE` (`NO`, `BARCODE`, `CREATE_DATE`, `PRODUCTION_ID`) VALUES
(73, 'e', '2024-06-17', NULL),
(74, 'g', '2024-06-17', NULL),
(75, 'f', '2024-06-17', NULL),
(76, '4', '2024-06-17', NULL),
(77, '3', '2024-06-17', NULL),
(78, '2', '2024-06-17', NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `WONDAN`
--

CREATE TABLE `WONDAN` (
  `ID` int(10) NOT NULL,
  `WONDAN_NAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WONDAN`
--

INSERT INTO `WONDAN` (`ID`, `WONDAN_NAME`) VALUES
(6, 'SR4K'),
(2, 'SRH2'),
(3, 'SRLT'),
(1, 'UC49'),
(5, 'UC53'),
(7, 'UCNK'),
(4, 'UCTA');

-- --------------------------------------------------------

--
-- 테이블 구조 `WONDAN_STORE`
--

CREATE TABLE `WONDAN_STORE` (
  `NO` int(11) NOT NULL,
  `REG_DATE` date NOT NULL DEFAULT current_timestamp(),
  `WONDAN_NAME` varchar(50) NOT NULL,
  `LOT_NO` varchar(50) NOT NULL,
  `LENGTH` int(11) NOT NULL,
  `REAL_LENGTH` int(11) NOT NULL,
  `SUPPLY` varchar(50) DEFAULT NULL,
  `REG_ACCOUNT` int(10) DEFAULT NULL,
  `DEFECTIVE_LENGTH` int(11) DEFAULT NULL,
  `STATE` int(11) NOT NULL DEFAULT 0,
  `STATE_DATE` date DEFAULT current_timestamp(),
  `ETC` varchar(50) DEFAULT NULL,
  `UPDATE_ACCOUNT` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WONDAN_STORE`
--

INSERT INTO `WONDAN_STORE` (`NO`, `REG_DATE`, `WONDAN_NAME`, `LOT_NO`, `LENGTH`, `REAL_LENGTH`, `SUPPLY`, `REG_ACCOUNT`, `DEFECTIVE_LENGTH`, `STATE`, `STATE_DATE`, `ETC`, `UPDATE_ACCOUNT`) VALUES
(1, '2024-06-10', 'SR4K', '1', 1, 1, '1', 2, 0, 1, '2024-06-09', NULL, 2),
(2, '2024-06-09', 'SRH2', '2', 1, 1, '1', 2, 0, 0, '2024-06-09', NULL, 2),
(3, '2024-06-09', 'SRH2', '3', 1, 1, '1', 2, 0, 1, '2024-06-09', NULL, 2),
(4, '2024-06-09', 'SRH2', '4', 1, 1, '1', 2, 0, 0, '2024-06-09', NULL, 2),
(5, '2024-06-10', 'UC49', '5', 1, 1, '1', 2, 0, 1, '2024-06-09', NULL, 2),
(6, '2024-06-10', 'UC49', 'safdadfasfa', 1, 1, '1', 2, 0, 1, '2024-06-09', NULL, 2);

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
  `REG_ACCOUNT` int(10) NOT NULL,
  `ORDER_ACCOUNT` varchar(30) DEFAULT NULL,
  `UPDATE_ACCOUNT` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORKING_ORDER`
--

INSERT INTO `WORKING_ORDER` (`NO`, `WORKING_PART`, `COUNT`, `CREATE_DATE`, `STATE`, `REG_ACCOUNT`, `ORDER_ACCOUNT`, `UPDATE_ACCOUNT`) VALUES
(25, 1, 100, '2024-06-13 15:00:00', 1, 2, NULL, 2),
(26, 16, 200, '2024-06-13 15:00:00', 1, 2, NULL, 2),
(27, 10, 1, '2024-06-14 15:00:00', 1, 2, NULL, 2),
(28, 3, 1, '2024-06-14 15:00:00', 0, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `WORKING_ORDER_PART_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `WORKING_ORDER_PART_VIEW` (
);

-- --------------------------------------------------------

--
-- 테이블 구조 `WORKING_PART`
--

CREATE TABLE `WORKING_PART` (
  `ID` int(10) NOT NULL,
  `ASSY_PART_NAME` varchar(30) NOT NULL,
  `ASSY_SUB_PART_NAME` varchar(30) NOT NULL,
  `C_PUMBUN` varchar(30) DEFAULT NULL,
  `F_PUMBUN` varchar(30) DEFAULT NULL,
  `JAEDAN_PART_NAME` varchar(30) NOT NULL,
  `WONDAN_NAME` varchar(30) NOT NULL,
  `PUMBUN` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORKING_PART`
--

INSERT INTO `WORKING_PART` (`ID`, `ASSY_PART_NAME`, `ASSY_SUB_PART_NAME`, `C_PUMBUN`, `F_PUMBUN`, `JAEDAN_PART_NAME`, `WONDAN_NAME`, `PUMBUN`) VALUES
(1, 'DAB', 'TDCV', 'BBB', NULL, 'LD LAB', 'UC49', 'KAAL230007K'),
(2, 'DAB', 'VN', NULL, NULL, 'DAB REAR', 'UC49', NULL),
(3, 'DAB', 'VN', NULL, NULL, 'DAB FRONT', 'UC49', NULL),
(4, 'DAB', 'EU', NULL, NULL, 'DAB FRONT', 'SRH2', NULL),
(5, 'DAB', 'EU', NULL, NULL, 'DAB REAR', 'UC49', NULL),
(6, 'CAB', 'EU', NULL, NULL, 'CAB 인어백', 'SRLT', NULL),
(7, 'CAB', 'EU', NULL, NULL, 'CAB TAP', 'UCTA', NULL),
(8, 'CENTER', 'EU', NULL, NULL, 'CENTER 메인', 'SRH2', NULL),
(9, 'CENTER', 'EU', NULL, NULL, 'CENTER 테더', 'UC53', NULL),
(10, 'KAB', 'EU', NULL, NULL, 'KAB 메인', 'SRH2', NULL),
(11, 'KAB', 'EU', NULL, NULL, 'KAB 테더', 'UC49', NULL),
(12, 'SAB', 'EU', NULL, NULL, 'SAB LH 메인', 'SRH2', NULL),
(13, 'SAB', 'EU', NULL, NULL, 'SAB RH 메인', 'UC53', NULL),
(14, 'SAB', 'EU', NULL, NULL, 'SAB LH 태더', 'UC53', NULL),
(15, 'PAB', 'EU', NULL, NULL, 'PABAB 메인', 'UCNK', NULL),
(16, 'PAB', 'EU', NULL, NULL, 'PAB SR', 'SR4K', NULL);

-- --------------------------------------------------------

--
-- 뷰 구조 `JADANFINISHED`
--
DROP TABLE IF EXISTS `JADANFINISHED`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `JADANFINISHED`  AS SELECT `jr`.`NO` AS `NO`, `jr`.`WORK_ORDER_NO` AS `WORK_ORDER_NO`, date_format(`jr`.`CREATE_DATE`,'%Y-%m-%d') AS `CREATE_DATE`, date_format(`jr`.`WORK_DATE`,'%Y-%m-%d') AS `WORK_DATE`, `jr`.`COUNT` AS `COUNT`, `wo`.`WORKING_PART` AS `WORKING_PART`, `jr`.`LOT` AS `LOT`, `ac`.`NAME` AS `regAccount`, `ac2`.`NAME` AS `updateAccount`, `wp`.`PUMBUN` AS `PUMBUN`, `wp`.`ASSY_PART_NAME` AS `ASSY_PART_NAME`, `wp`.`ASSY_SUB_PART_NAME` AS `ASSY_SUB_PART_NAME`, `wp`.`JAEDAN_PART_NAME` AS `JAEDAN_PART_NAME` FROM ((((`JAEDAN_REGIST` `jr` join `WORKING_ORDER` `wo` on(`jr`.`WORK_ORDER_NO` = `wo`.`NO`)) join `ACCOUNT` `ac` on(`jr`.`REG_ACCOUNT` = `ac`.`NO`)) join `ACCOUNT` `ac2` on(`jr`.`UPDATE_ACCOUNT` = `ac2`.`NO`)) join `WORKING_PART` `wp` on(`wo`.`WORKING_PART` = `wp`.`ID`)) WHERE `jr`.`NO` = 30 ;

-- --------------------------------------------------------

--
-- 뷰 구조 `JAEDAN_WORKING_VIEW`
--
DROP TABLE IF EXISTS `JAEDAN_WORKING_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `JAEDAN_WORKING_VIEW`  AS SELECT `JAEDAN_REGIST`.`NO` AS `JAEDAN_REGIST_NO`, `JAEDAN_REGIST`.`NO` AS `NO`, `JAEDAN_REGIST`.`WORK_ORDER_NO` AS `WORK_ORDER_NO`, `JAEDAN_REGIST`.`WONDAN_STORE` AS `WONDAN_STORE`, `JAEDAN_REGIST`.`WONDAN_MANAGER_NO` AS `WONDAN_MANAGER_NO`, `JAEDAN_REGIST`.`Y_COUNT` AS `Y_COUNT`, `JAEDAN_REGIST`.`MARKS` AS `MARKS`, `JAEDAN_REGIST`.`COUNT` AS `COUNT`, `JAEDAN_REGIST`.`DEFECTIVE` AS `DEFECTIVE`, `JAEDAN_REGIST`.`CREATE_DATE` AS `CREATE_DATE`, `JAEDAN_REGIST`.`WORK_DATE` AS `WORK_DATE`, `JAEDAN_REGIST`.`REG_ACCOUNT` AS `REG_ACCOUNT`, `JAEDAN_REGIST`.`STATE` AS `STATE`, `WORKING_ORDER`.`NO` AS `WORKING_ORDER_NO`, `WONDAN_STORE`.`NO` AS `WONDAN_STORE_NO`, (select `WORKING_ORDER`.`WORKING_PART` from `WORKING_ORDER` where `WORKING_ORDER`.`NO` = `JAEDAN_REGIST`.`WORK_ORDER_NO`) AS `WORKING_PART` FROM ((`JAEDAN_REGIST` join `WORKING_ORDER` on(`JAEDAN_REGIST`.`WORK_ORDER_NO` = `WORKING_ORDER`.`NO`)) join `WONDAN_STORE` on(`JAEDAN_REGIST`.`WONDAN_STORE` = `WONDAN_STORE`.`NO`)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `WORKING_ORDER_PART_VIEW`
--
DROP TABLE IF EXISTS `WORKING_ORDER_PART_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `WORKING_ORDER_PART_VIEW`  AS SELECT `WORKING_ORDER`.`NO` AS `NO`, `WORKING_ORDER`.`WORKING_PART` AS `WORKING_PART`, `WORKING_ORDER`.`COUNT` AS `COUNT`, `WORKING_ORDER`.`CREATE_DATA` AS `CREATE_DATA`, `WORKING_ORDER`.`STATE` AS `STATE`, `WORKING_ORDER`.`ORDER_ACCOUNT` AS `ORDER_ACCOUNT`, `WORKING_PART`.`ID` AS `ID`, `WORKING_PART`.`ASSY_PART_NAME` AS `ASSY_PART_NAME`, `WORKING_PART`.`ASSY_SUB_PART_NAME` AS `ASSY_SUB_PART_NAME`, `WORKING_PART`.`C_PUMBUN` AS `C_PUMBUN`, `WORKING_PART`.`F_PUMBUN` AS `F_PUMBUN`, `WORKING_PART`.`JAEDAN_PART_NAME` AS `JAEDAN_PART_NAME`, `WORKING_PART`.`WONDAN_NAME` AS `WONDAN_NAME` FROM (`WORKING_ORDER` join `WORKING_PART` on(`WORKING_ORDER`.`WORKING_PART` = `WORKING_PART`.`ID`)) ;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `ACCOUNT_ID` (`EMAIL`),
  ADD KEY `ACCOUNT_NO` (`NO`);

--
-- 테이블의 인덱스 `ASSY_PART`
--
ALTER TABLE `ASSY_PART`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ASSY_PART_NAME` (`ASSY_PART_NAME`);

--
-- 테이블의 인덱스 `ASSY_SUB_PART`
--
ALTER TABLE `ASSY_SUB_PART`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ASY_SUB_NAME` (`ASSY_SUB_NAME`),
  ADD KEY `FOLDING_NO` (`FOLDING_NO`) USING BTREE,
  ADD KEY `CUSIN_NO` (`CUSIN_NO`);

--
-- 테이블의 인덱스 `CAR`
--
ALTER TABLE `CAR`
  ADD PRIMARY KEY (`ID`);

--
-- 테이블의 인덱스 `DEFECTIVE_CAT`
--
ALTER TABLE `DEFECTIVE_CAT`
  ADD PRIMARY KEY (`CATEGORY`);

--
-- 테이블의 인덱스 `DEFECTIVE_DATA`
--
ALTER TABLE `DEFECTIVE_DATA`
  ADD PRIMARY KEY (`no`),
  ADD KEY `fk_CATEGORY` (`CATEGORY`),
  ADD KEY `fk_SUB_CATEGORY` (`SUB_CATEGORY`),
  ADD KEY `fk_PART` (`PART`) USING BTREE;

--
-- 테이블의 인덱스 `DEFECTIVE_SUB_CAT`
--
ALTER TABLE `DEFECTIVE_SUB_CAT`
  ADD PRIMARY KEY (`SUB_CATEGORY`),
  ADD KEY `fk_parent_cat_name` (`PARENT_CAT`);

--
-- 테이블의 인덱스 `JADAN_INVENTORY`
--
ALTER TABLE `JADAN_INVENTORY`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `JAEDAN_PART`
--
ALTER TABLE `JAEDAN_PART`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `JAEDAN` (`JAEDAN_PART_NAME`) USING BTREE;

--
-- 테이블의 인덱스 `JAEDAN_REGIST`
--
ALTER TABLE `JAEDAN_REGIST`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `WORK_ORDER_NO` (`WORK_ORDER_NO`),
  ADD KEY `REG_ACCOUNT` (`REG_ACCOUNT`),
  ADD KEY `WONDAN_STORE` (`WONDAN_STORE`);

--
-- 테이블의 인덱스 `PD_DELIVERY`
--
ALTER TABLE `PD_DELIVERY`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `PD_NAME` (`PD_NAME`);

--
-- 테이블의 인덱스 `PD_INVENTORY`
--
ALTER TABLE `PD_INVENTORY`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `PD_NAME` (`PD_NAME`);

--
-- 테이블의 인덱스 `PD_NAME`
--
ALTER TABLE `PD_NAME`
  ADD PRIMARY KEY (`PART`);

--
-- 테이블의 인덱스 `PD_STOCK`
--
ALTER TABLE `PD_STOCK`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `PD_NAME` (`PD_NAME`);

--
-- 테이블의 인덱스 `PRODUCTION`
--
ALTER TABLE `PRODUCTION`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `PROCESS_CODE` (`PROCESS_CODE`);

--
-- 테이블의 인덱스 `SALE_PRODUCT`
--
ALTER TABLE `SALE_PRODUCT`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `SALE_PUMBUN` (`PUMBUN`),
  ADD KEY `SALE_PUMMYUM` (`PUMMYUM`);

--
-- 테이블의 인덱스 `SCANNED_BARCODE`
--
ALTER TABLE `SCANNED_BARCODE`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `BARCODE` (`BARCODE`);

--
-- 테이블의 인덱스 `WONDAN`
--
ALTER TABLE `WONDAN`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `WONDAN_NAME` (`WONDAN_NAME`);

--
-- 테이블의 인덱스 `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `LOT_NO` (`LOT_NO`),
  ADD KEY `WONDAN_NAME` (`WONDAN_NAME`),
  ADD KEY `WONDAN_REGISTER` (`REG_ACCOUNT`);

--
-- 테이블의 인덱스 `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `WORKING_ORDER_ACCOUNT` (`ORDER_ACCOUNT`),
  ADD KEY `WORKING_PART` (`WORKING_PART`),
  ADD KEY `REG_ACCOUNT` (`REG_ACCOUNT`);

--
-- 테이블의 인덱스 `WORKING_PART`
--
ALTER TABLE `WORKING_PART`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ASSY_PART_NAME` (`ASSY_PART_NAME`),
  ADD KEY `FK_ASSY_SUB_PART_NAME` (`ASSY_SUB_PART_NAME`),
  ADD KEY `FK_ASSY_C_PUMBUN` (`C_PUMBUN`),
  ADD KEY `FK_ASSY_F_PUMBUN` (`F_PUMBUN`),
  ADD KEY `FK_JAEDAN_PART_NAME` (`JAEDAN_PART_NAME`),
  ADD KEY `FK_WONDAN_NAME` (`WONDAN_NAME`),
  ADD KEY `WORKING_PART` (`ID`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `ASSY_PART`
--
ALTER TABLE `ASSY_PART`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `ASSY_SUB_PART`
--
ALTER TABLE `ASSY_SUB_PART`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 테이블의 AUTO_INCREMENT `CAR`
--
ALTER TABLE `CAR`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `DEFECTIVE_DATA`
--
ALTER TABLE `DEFECTIVE_DATA`
  MODIFY `no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- 테이블의 AUTO_INCREMENT `JADAN_INVENTORY`
--
ALTER TABLE `JADAN_INVENTORY`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- 테이블의 AUTO_INCREMENT `JAEDAN_PART`
--
ALTER TABLE `JAEDAN_PART`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 테이블의 AUTO_INCREMENT `JAEDAN_REGIST`
--
ALTER TABLE `JAEDAN_REGIST`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- 테이블의 AUTO_INCREMENT `PD_DELIVERY`
--
ALTER TABLE `PD_DELIVERY`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `PD_INVENTORY`
--
ALTER TABLE `PD_INVENTORY`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 테이블의 AUTO_INCREMENT `PD_STOCK`
--
ALTER TABLE `PD_STOCK`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 테이블의 AUTO_INCREMENT `PRODUCTION`
--
ALTER TABLE `PRODUCTION`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `SALE_PRODUCT`
--
ALTER TABLE `SALE_PRODUCT`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 테이블의 AUTO_INCREMENT `SCANNED_BARCODE`
--
ALTER TABLE `SCANNED_BARCODE`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- 테이블의 AUTO_INCREMENT `WONDAN`
--
ALTER TABLE `WONDAN`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 테이블의 AUTO_INCREMENT `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 테이블의 AUTO_INCREMENT `WORKING_PART`
--
ALTER TABLE `WORKING_PART`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `JAEDAN_REGIST`
--
ALTER TABLE `JAEDAN_REGIST`
  ADD CONSTRAINT `REG_ACCOUNT` FOREIGN KEY (`REG_ACCOUNT`) REFERENCES `ACCOUNT` (`NO`),
  ADD CONSTRAINT `WONDAN_STORE` FOREIGN KEY (`WONDAN_STORE`) REFERENCES `WONDAN_STORE` (`NO`),
  ADD CONSTRAINT `WORK_ORDER_NO` FOREIGN KEY (`WORK_ORDER_NO`) REFERENCES `WORKING_ORDER` (`NO`);

--
-- 테이블의 제약사항 `PD_DELIVERY`
--
ALTER TABLE `PD_DELIVERY`
  ADD CONSTRAINT `PD_DELIVERY_ibfk_1` FOREIGN KEY (`PD_NAME`) REFERENCES `SALE_PRODUCT` (`PUMMYUM`);

--
-- 테이블의 제약사항 `PD_INVENTORY`
--
ALTER TABLE `PD_INVENTORY`
  ADD CONSTRAINT `PD_INVENTORY_ibfk_1` FOREIGN KEY (`PD_NAME`) REFERENCES `SALE_PRODUCT` (`PUMMYUM`);

--
-- 테이블의 제약사항 `PD_STOCK`
--
ALTER TABLE `PD_STOCK`
  ADD CONSTRAINT `PD_STOCK_ibfk_1` FOREIGN KEY (`PD_NAME`) REFERENCES `SALE_PRODUCT` (`PUMMYUM`);

--
-- 테이블의 제약사항 `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  ADD CONSTRAINT `WONDAN_NAME` FOREIGN KEY (`WONDAN_NAME`) REFERENCES `WONDAN` (`WONDAN_NAME`);

--
-- 테이블의 제약사항 `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  ADD CONSTRAINT `ACCOUNT` FOREIGN KEY (`REG_ACCOUNT`) REFERENCES `ACCOUNT` (`NO`),
  ADD CONSTRAINT `WORKING_PART` FOREIGN KEY (`WORKING_PART`) REFERENCES `WORKING_PART` (`ID`);

--
-- 테이블의 제약사항 `WORKING_PART`
--
ALTER TABLE `WORKING_PART`
  ADD CONSTRAINT `FK_ASSY_C_PUMBUN` FOREIGN KEY (`C_PUMBUN`) REFERENCES `ASSY_SUB_PART` (`CUSIN_NO`),
  ADD CONSTRAINT `FK_ASSY_F_PUMBUN` FOREIGN KEY (`F_PUMBUN`) REFERENCES `ASSY_SUB_PART` (`FOLDING_NO`),
  ADD CONSTRAINT `FK_ASSY_PART_NAME` FOREIGN KEY (`ASSY_PART_NAME`) REFERENCES `ASSY_PART` (`ASSY_PART_NAME`),
  ADD CONSTRAINT `FK_ASSY_SUB_PART_NAME` FOREIGN KEY (`ASSY_SUB_PART_NAME`) REFERENCES `ASSY_SUB_PART` (`ASSY_SUB_NAME`),
  ADD CONSTRAINT `FK_JAEDAN_PART_NAME` FOREIGN KEY (`JAEDAN_PART_NAME`) REFERENCES `JAEDAN_PART` (`JAEDAN_PART_NAME`),
  ADD CONSTRAINT `FK_WONDAN_NAME` FOREIGN KEY (`WONDAN_NAME`) REFERENCES `WONDAN` (`WONDAN_NAME`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

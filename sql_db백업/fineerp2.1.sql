-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 24-05-08 00:33
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
-- 데이터베이스: `fineerp`
--

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
(183, '2024-05-07', 'CAB', '기타', '기타', 1, 0, '', '2024-05-07 11:33:33');

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
-- 테이블 구조 `JADAN_WORK_HISTORY`
--

CREATE TABLE `JADAN_WORK_HISTORY` (
  `NO` int(11) NOT NULL,
  `PRODUCT` varchar(50) NOT NULL,
  `CREATE_DATE` date NOT NULL,
  `WONDAN_CODE` varchar(50) NOT NULL,
  `WONDAN_STORE_NO` varchar(30) NOT NULL COMMENT '원단관리번호',
  `LOT` varchar(50) NOT NULL,
  `LENGTH` int(10) NOT NULL,
  `Y_COUNT` int(10) NOT NULL COMMENT '연단매수',
  `MARKS` int(10) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `DEFECTIVE` int(11) DEFAULT NULL,
  `WORK_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `JEADAN`
--

CREATE TABLE `JEADAN` (
  `NO` int(11) NOT NULL,
  `WORK_ORDER_NO` int(10) NOT NULL,
  `LOT_NO` varchar(50) NOT NULL,
  `COUNT` int(10) DEFAULT NULL,
  `STATE` int(10) NOT NULL,
  `DEL` int(11) NOT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JEADAN`
--

INSERT INTO `JEADAN` (`NO`, `WORK_ORDER_NO`, `LOT_NO`, `COUNT`, `STATE`, `DEL`, `DATE`) VALUES
(1, 8, 'afdasfasf', 100, 0, 0, '2024-05-05');

-- --------------------------------------------------------

--
-- Stand-in structure for view `JEADAN_WORK_PRODUCT_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `JEADAN_WORK_PRODUCT_VIEW` (
`NO` int(11)
,`LOT_NO` varchar(50)
,`COUNT` int(10)
,`STATE` int(10)
,`WORK_ORDER_NO` int(20)
,`WORK_ORDER_PRODUCT` int(20)
,`PRODUCT_NO` varchar(50)
,`PRODUCT_PD_NAME` varchar(50)
,`PRODUCT_USE_WONDAN` varchar(50)
);

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
-- 테이블 구조 `PD_PART_NAME`
--

CREATE TABLE `PD_PART_NAME` (
  `PART_NAME` varchar(50) NOT NULL,
  `WONDAN_CODE` varchar(30) NOT NULL,
  `DESCRIPTION` varchar(100) DEFAULT NULL,
  `PATERNER` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PD_PART_NAME`
--

INSERT INTO `PD_PART_NAME` (`PART_NAME`, `WONDAN_CODE`, `DESCRIPTION`, `PATERNER`) VALUES
('CAB TAP', '', NULL, NULL),
('CAB 인어백', '', NULL, NULL),
('CENTER 메인', '', NULL, NULL),
('CENTER 테더', '', NULL, NULL),
('DAB Rear', '', NULL, NULL),
('DABFront', '', NULL, NULL),
('KAB 메인', '', NULL, NULL),
('KAB 테더', '', NULL, NULL),
('PAB TAP', '', NULL, NULL),
('SAB LH 메인', '', NULL, NULL),
('SAB RH 메인', '', NULL, NULL),
('SAB 테더', '', NULL, NULL),
('SR PARTS', '', NULL, NULL);

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
(6, '2024-05-05', 8, 1),
(7, '2024-05-05', 9, 1),
(8, '2024-05-05', 10, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `PROCESS_WORK_PRODUCT_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `PROCESS_WORK_PRODUCT_VIEW` (
`NO` int(11)
,`DATE` date
,`ORDER_NO` int(30)
,`PROCESS_CHART_STATE` int(11)
,`PRODUCT` int(20)
,`PD_NAME` varchar(50)
,`USE_WONDAN` varchar(50)
,`MANAGER_CODE` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `PROCESS_WORK_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `PROCESS_WORK_VIEW` (
`NO` int(11)
,`DATE` date
,`ORDER_NO` int(30)
,`PROCESS_CHART_STATE` int(11)
,`PRODUCT` int(20)
);

-- --------------------------------------------------------

--
-- 테이블 구조 `PRODUCT`
--

CREATE TABLE `PRODUCT` (
  `NO` int(20) NOT NULL,
  `PD_NAME` varchar(50) NOT NULL,
  `PRODUCT_NO` varchar(50) NOT NULL,
  `PARTNER` varchar(50) DEFAULT NULL,
  `DESCRIPTION` varchar(100) DEFAULT NULL,
  `MANAGER_CODE` int(11) NOT NULL DEFAULT 0 COMMENT '사용중아이템 0 미사용 1',
  `USE_WONDAN` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PRODUCT`
--

INSERT INTO `PRODUCT` (`NO`, `PD_NAME`, `PRODUCT_NO`, `PARTNER`, `DESCRIPTION`, `MANAGER_CODE`, `USE_WONDAN`) VALUES
(1, 'CAB TAP', '1', NULL, NULL, 1, 'UC'),
(2, 'SAB 테더', '2', NULL, NULL, 2, '53'),
(3, 'SAB RH 메인', '3', NULL, NULL, 3, 'H2'),
(4, 'SAB LH 메인', '4', NULL, NULL, 4, 'H2'),
(5, 'PAB UC', '5', NULL, NULL, 5, 'NK'),
(6, 'KAB 테더', '6', NULL, NULL, 6, '49'),
(7, 'KAB 메인', '7', NULL, NULL, 7, 'H2'),
(8, 'DABFront', '8', NULL, NULL, 8, 'H2'),
(9, 'DAB Rear', '9', NULL, NULL, 9, '49'),
(10, 'CENTER 메인', '10', NULL, NULL, 10, 'H2'),
(11, 'CAB 인어백', '11', NULL, NULL, 11, 'SR'),
(12, 'PAB', '12', NULL, NULL, 12, 'NK'),
(13, 'CAB 인어백', '13', NULL, NULL, 0, 'SR');

-- --------------------------------------------------------

--
-- 테이블 구조 `WONDAN`
--

CREATE TABLE `WONDAN` (
  `WONDAN_CODE` varchar(50) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `BUPUM_NO` varchar(50) NOT NULL,
  `SUPPLAY` varchar(50) DEFAULT NULL,
  `WONDAN_BARCODE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WONDAN`
--

INSERT INTO `WONDAN` (`WONDAN_CODE`, `NAME`, `BUPUM_NO`, `SUPPLAY`, `WONDAN_BARCODE`) VALUES
('49', '420D', '4949UC', NULL, NULL),
('4K', '420D', 'H24000', NULL, NULL),
('53', '420D', '5353UC', NULL, NULL),
('H2', '420D', 'H24000', NULL, NULL),
('NK', '420D', 'H24000', NULL, NULL),
('SR', '940D', '940D', '도요보', NULL),
('UC', '940D', '940D', '도요보', NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `WONDAN_STORE`
--

CREATE TABLE `WONDAN_STORE` (
  `NO` int(11) NOT NULL,
  `REG_DATE` date NOT NULL DEFAULT current_timestamp(),
  `CODE` varchar(50) NOT NULL,
  `LOT_NO` varchar(50) NOT NULL,
  `LENGTH` int(20) NOT NULL,
  `REAL_LENGTH` int(20) NOT NULL,
  `SUPPLAY` varchar(50) DEFAULT NULL,
  `REG_ACCOUNG` varchar(50) DEFAULT NULL,
  `DEFECTIVE_LENGTH` int(20) DEFAULT NULL,
  `STATE` int(20) NOT NULL DEFAULT 0,
  `STATE_DATE` date NOT NULL DEFAULT current_timestamp(),
  `ETC` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WONDAN_STORE`
--

INSERT INTO `WONDAN_STORE` (`NO`, `REG_DATE`, `CODE`, `LOT_NO`, `LENGTH`, `REAL_LENGTH`, `SUPPLAY`, `REG_ACCOUNG`, `DEFECTIVE_LENGTH`, `STATE`, `STATE_DATE`, `ETC`) VALUES
(1, '2024-05-04', '4K', 'afdasfasf', 200, 200, NULL, NULL, NULL, 0, '2024-05-04', NULL),
(2, '2024-05-04', '49', 'afdasfasf123', 200, 200, NULL, NULL, NULL, 0, '2024-05-04', NULL),
(5, '2024-05-04', 'H2', 'afdasfasf12345', 200, 200, NULL, NULL, NULL, 0, '2024-05-04', NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `WORK_ORDER`
--

CREATE TABLE `WORK_ORDER` (
  `NO` int(20) NOT NULL,
  `DATE` date NOT NULL DEFAULT current_timestamp(),
  `PRODUCT` int(20) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `ORDER_STATE` int(11) NOT NULL DEFAULT 0,
  `REG_ACCOUNT` varchar(50) DEFAULT NULL,
  `STATE` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `WORK_ORDER`
--

INSERT INTO `WORK_ORDER` (`NO`, `DATE`, `PRODUCT`, `COUNT`, `ORDER_STATE`, `REG_ACCOUNT`, `STATE`) VALUES
(8, '2024-05-05', 1, 100, 0, NULL, 0),
(9, '2024-05-05', 11, 14, 0, NULL, 0),
(10, '2024-05-05', 4, 100, 0, NULL, 0);

--
-- 트리거 `WORK_ORDER`
--
DELIMITER $$
CREATE TRIGGER `before_work_order_insert` AFTER INSERT ON `WORK_ORDER` FOR EACH ROW BEGIN
    INSERT INTO PROCESS_CHART (ORDER_NO, PROCESS_CHART_STATE)
    VALUES (NEW.NO, 1);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `WORK_ORDER_PRODUCT_VIEW`
-- (See below for the actual view)
--
CREATE TABLE `WORK_ORDER_PRODUCT_VIEW` (
`NO` int(20)
,`DATE` date
,`PRODUCT` int(20)
,`COUNT` int(10)
,`ORDER_STATE` int(11)
,`REG_ACCOUNT` varchar(50)
,`PD_NAME` varchar(50)
,`PRODUCT_NO` varchar(50)
,`USE_WONDAN` varchar(50)
);

-- --------------------------------------------------------

--
-- 뷰 구조 `JEADAN_WORK_PRODUCT_VIEW`
--
DROP TABLE IF EXISTS `JEADAN_WORK_PRODUCT_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `JEADAN_WORK_PRODUCT_VIEW`  AS SELECT `j`.`NO` AS `NO`, `j`.`LOT_NO` AS `LOT_NO`, `j`.`COUNT` AS `COUNT`, `j`.`STATE` AS `STATE`, `wo`.`NO` AS `WORK_ORDER_NO`, `wo`.`PRODUCT` AS `WORK_ORDER_PRODUCT`, `p`.`PRODUCT_NO` AS `PRODUCT_NO`, `p`.`PD_NAME` AS `PRODUCT_PD_NAME`, `p`.`USE_WONDAN` AS `PRODUCT_USE_WONDAN` FROM ((`JEADAN` `j` join `WORK_ORDER` `wo` on(`j`.`WORK_ORDER_NO` = `wo`.`NO`)) join `PRODUCT` `p` on(`wo`.`PRODUCT` = `p`.`PRODUCT_NO`)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `PROCESS_WORK_PRODUCT_VIEW`
--
DROP TABLE IF EXISTS `PROCESS_WORK_PRODUCT_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `PROCESS_WORK_PRODUCT_VIEW`  AS SELECT `pc`.`NO` AS `NO`, `pc`.`DATE` AS `DATE`, `pc`.`ORDER_NO` AS `ORDER_NO`, `pc`.`PROCESS_CHART_STATE` AS `PROCESS_CHART_STATE`, `wo`.`PRODUCT` AS `PRODUCT`, `p`.`PD_NAME` AS `PD_NAME`, `p`.`USE_WONDAN` AS `USE_WONDAN`, `p`.`MANAGER_CODE` AS `MANAGER_CODE` FROM ((`PROCESS_CHART` `pc` join `WORK_ORDER` `wo` on(`pc`.`ORDER_NO` = `wo`.`NO`)) join `PRODUCT` `p` on(`wo`.`PRODUCT` = `p`.`PRODUCT_NO`)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `PROCESS_WORK_VIEW`
--
DROP TABLE IF EXISTS `PROCESS_WORK_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `PROCESS_WORK_VIEW`  AS SELECT `pc`.`NO` AS `NO`, `pc`.`DATE` AS `DATE`, `pc`.`ORDER_NO` AS `ORDER_NO`, `pc`.`PROCESS_CHART_STATE` AS `PROCESS_CHART_STATE`, `wo`.`PRODUCT` AS `PRODUCT` FROM (`PROCESS_CHART` `pc` join `WORK_ORDER` `wo` on(`pc`.`ORDER_NO` = `wo`.`NO`)) ;

-- --------------------------------------------------------

--
-- 뷰 구조 `WORK_ORDER_PRODUCT_VIEW`
--
DROP TABLE IF EXISTS `WORK_ORDER_PRODUCT_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `WORK_ORDER_PRODUCT_VIEW`  AS SELECT `wo`.`NO` AS `NO`, `wo`.`DATE` AS `DATE`, `wo`.`PRODUCT` AS `PRODUCT`, `wo`.`COUNT` AS `COUNT`, `wo`.`ORDER_STATE` AS `ORDER_STATE`, `wo`.`REG_ACCOUNT` AS `REG_ACCOUNT`, `p`.`PD_NAME` AS `PD_NAME`, `p`.`PRODUCT_NO` AS `PRODUCT_NO`, `p`.`USE_WONDAN` AS `USE_WONDAN` FROM (`WORK_ORDER` `wo` join `PRODUCT` `p` on(`wo`.`PRODUCT` = `p`.`PRODUCT_NO`)) ;

--
-- 덤프된 테이블의 인덱스
--

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
  ADD KEY `fk_part` (`PART`);

--
-- 테이블의 인덱스 `DEFECTIVE_SUB_CAT`
--
ALTER TABLE `DEFECTIVE_SUB_CAT`
  ADD PRIMARY KEY (`SUB_CATEGORY`),
  ADD KEY `fk_parent_cat_name` (`PARENT_CAT`);

--
-- 테이블의 인덱스 `JADAN_WORK_HISTORY`
--
ALTER TABLE `JADAN_WORK_HISTORY`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `JEADAN`
--
ALTER TABLE `JEADAN`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `idx_WORK_ORDER_NO` (`WORK_ORDER_NO`),
  ADD KEY `LOT_NO` (`LOT_NO`);

--
-- 테이블의 인덱스 `PD_NAME`
--
ALTER TABLE `PD_NAME`
  ADD PRIMARY KEY (`PART`);

--
-- 테이블의 인덱스 `PD_PART_NAME`
--
ALTER TABLE `PD_PART_NAME`
  ADD PRIMARY KEY (`PART_NAME`),
  ADD KEY `idx_WONDAN_CODE` (`WONDAN_CODE`);

--
-- 테이블의 인덱스 `PROCESS_CHART`
--
ALTER TABLE `PROCESS_CHART`
  ADD PRIMARY KEY (`NO`);

--
-- 테이블의 인덱스 `PRODUCT`
--
ALTER TABLE `PRODUCT`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `idx_WONDAN` (`USE_WONDAN`);

--
-- 테이블의 인덱스 `WONDAN`
--
ALTER TABLE `WONDAN`
  ADD UNIQUE KEY `WONDAN_CODE` (`WONDAN_CODE`),
  ADD UNIQUE KEY `idx_WONDAN_CODE` (`WONDAN_CODE`),
  ADD KEY `idx_WONDAN_NAME` (`NAME`);

--
-- 테이블의 인덱스 `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  ADD PRIMARY KEY (`NO`),
  ADD UNIQUE KEY `LOT_NO` (`LOT_NO`),
  ADD KEY `fk_WONDAN_CODE` (`CODE`);

--
-- 테이블의 인덱스 `WORK_ORDER`
--
ALTER TABLE `WORK_ORDER`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `fk_PD_NAME` (`PRODUCT`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `DEFECTIVE_DATA`
--
ALTER TABLE `DEFECTIVE_DATA`
  MODIFY `no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- 테이블의 AUTO_INCREMENT `JADAN_WORK_HISTORY`
--
ALTER TABLE `JADAN_WORK_HISTORY`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- 테이블의 AUTO_INCREMENT `JEADAN`
--
ALTER TABLE `JEADAN`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `PROCESS_CHART`
--
ALTER TABLE `PROCESS_CHART`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 테이블의 AUTO_INCREMENT `PRODUCT`
--
ALTER TABLE `PRODUCT`
  MODIFY `NO` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 테이블의 AUTO_INCREMENT `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `WORK_ORDER`
--
ALTER TABLE `WORK_ORDER`
  MODIFY `NO` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `JEADAN`
--
ALTER TABLE `JEADAN`
  ADD CONSTRAINT `fk_WORK_ORDER` FOREIGN KEY (`WORK_ORDER_NO`) REFERENCES `WORK_ORDER` (`NO`);

--
-- 테이블의 제약사항 `PRODUCT`
--
ALTER TABLE `PRODUCT`
  ADD CONSTRAINT `fk_WONDAN` FOREIGN KEY (`USE_WONDAN`) REFERENCES `WONDAN` (`WONDAN_CODE`);

--
-- 테이블의 제약사항 `WONDAN_STORE`
--
ALTER TABLE `WONDAN_STORE`
  ADD CONSTRAINT `fk_WONDAN_CODE` FOREIGN KEY (`CODE`) REFERENCES `WONDAN` (`WONDAN_CODE`);

--
-- 테이블의 제약사항 `WORK_ORDER`
--
ALTER TABLE `WORK_ORDER`
  ADD CONSTRAINT `fk_PD_NAME` FOREIGN KEY (`PRODUCT`) REFERENCES `PRODUCT` (`NO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

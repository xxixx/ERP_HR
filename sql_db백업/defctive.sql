CREATE TABLE `PD_NAME` (
  `PART` varchar(50) NOT NULL,
  `DESCRIOTION` varchar(100) DEFAULT NULL,
  `PATERNER` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `PD_NAME`
--

INSERT INTO `PD_NAME` (`PART`, `DESCRIOTION`, `PATERNER`) VALUES
('CAB', NULL, NULL),
('CENTER', NULL, NULL),
('DAB', 'DAB ', NULL),
('KAB', NULL, NULL),
('PAB', NULL, NULL),
('SAB', NULL, NULL);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `PD_NAME`
--
ALTER TABLE `PD_NAME`
  ADD PRIMARY KEY (`PART`);

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

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `DEFECTIVE_CAT`
--
ALTER TABLE `DEFECTIVE_CAT`
  ADD PRIMARY KEY (`CATEGORY`);

-- 
CREATE TABLE `DEFECTIVE_SUB_CAT` (
  `no` int(11) NOT NULL,
  `SUB_CATEGORY` varchar(30) NOT NULL,
  `parent_cat_name` varchar(20) NOT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `DEFECTIVE_SUB_CAT`
--

INSERT INTO `DEFECTIVE_SUB_CAT` (`no`, `SUB_CATEGORY`, `parent_cat_name`, `level`) VALUES
(24, '기타', '기타', NULL),
(18, '땀뜸', '장비불량', NULL),
(10, '땀수', '봉재불량', NULL),
(22, '라벨누락', '검수', NULL),
(13, '마감봉재', '봉재불량', NULL),
(20, '밑실끓어짐', '장비불량', NULL),
(6, '밑실부족', '봉재불량', NULL),
(19, '밑실불량', '장비불량', NULL),
(3, '벤트홀불량', '재단불량', NULL),
(8, '부품누락', '봉재불량', NULL),
(9, '부품추가', '봉재불량', NULL),
(14, '실끓어짐', '봉재불량', NULL),
(5, '심벤트불량', '봉재불량', NULL),
(23, '외주불량', '검수', NULL),
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

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `DEFECTIVE_SUB_CAT`
--
ALTER TABLE `DEFECTIVE_SUB_CAT`
  ADD PRIMARY KEY (`SUB_CATEGORY`),
  ADD KEY `fk_parent_cat_name` (`parent_cat_name`);

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `DEFECTIVE_SUB_CAT`
--
ALTER TABLE `DEFECTIVE_SUB_CAT`
  ADD CONSTRAINT `fk_parent_cat_name` FOREIGN KEY (`parent_cat_name`) REFERENCES `DEFECTIVE_CAT` (`CATEGORY`);
COMMIT;

-- 
CREATE TABLE `DEFECTIVE_DATA` (
  `no` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `PART` varchar(20) NOT NULL,
  `CATEGORY` varchar(30) NOT NULL,
  `SUB_CATEGORY` varchar(30) NOT NULL,
  `COUNT` int(11) NOT NULL,
  `SUM` int(11) NOT NULL,
  `ETC` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `DEFECTIVE_DATA`
--
ALTER TABLE `DEFECTIVE_DATA`
  ADD KEY `fk_CATEGORY` (`CATEGORY`),
  ADD KEY `fk_SUB_CATEGORY` (`SUB_CATEGORY`),
  ADD KEY `fk_part` (`PART`);

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `DEFECTIVE_DATA`
--
ALTER TABLE `DEFECTIVE_DATA`
  ADD CONSTRAINT `fk_CATEGORY` FOREIGN KEY (`CATEGORY`) REFERENCES `DEFECTIVE_CAT` (`CATEGORY`),
  ADD CONSTRAINT `fk_SUB_CATEGORY` FOREIGN KEY (`SUB_CATEGORY`) REFERENCES `DEFECTIVE_SUB_CAT` (`SUB_CATEGORY`),
  ADD CONSTRAINT `fk_part` FOREIGN KEY (`PART`) REFERENCES `PD_NAME` (`PART`);
COMMIT;
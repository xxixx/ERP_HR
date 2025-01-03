
--
-- 테이블 구조 `JADAN_WORK_HISTORY`
--

CREATE TABLE `JADAN_WORK_HISTORY` (
  `NO` int(11) NOT NULL,
  `PRODUCT` varchar(50) NOT NULL,
  `CREATE_DATE` date NOT NULL,
  `WONDAN_NAME` varchar(50) NOT NULL,
  `WONDAN_STORE_NO` varchar(30) NOT NULL COMMENT '원단관리번호',
  `LOT` varchar(50) NOT NULL,
  `LENGTH` int(10) NOT NULL,
  `Y_COUNT` int(10) NOT NULL COMMENT '연단매수',
  `MARKS` int(10) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `DEFECTIVE` int(11) DEFAULT NULL,
  `WORK_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `JADAN_WORK_HISTORY`
--

INSERT INTO `JADAN_WORK_HISTORY` (`NO`, `PRODUCT`, `CREATE_DATE`, `WONDAN_NAME`, `WONDAN_STORE_NO`, `LOT`, `LENGTH`, `Y_COUNT`, `MARKS`, `COUNT`, `DEFECTIVE`, `WORK_DATE`) VALUES
(1, 'af', '2024-05-02', '420D', 'asfa', 'dafaf', 200, 10, 10, 100, NULL, NULL),
(2, 'CAB TAP', '2024-05-07', '420D', '1', '1', 1, 1, 1, 1, 0, '2024-05-07'),
(9, 'CAB TAP', '2024-05-07', '420D', '1', '1', 1, 1, 1, 1, 0, '2024-05-07'),
(10, 'CAB TAP', '2024-05-07', '420D', '1', '1', 1, 1, 1, 1, 0, '2024-05-07');

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
-- 테이블의 인덱스 `JADAN_WORK_HISTORY`
--
ALTER TABLE `JADAN_WORK_HISTORY`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `idx_WONDAN_NAME` (`NO`),
  ADD KEY `fk_WONDAN_NAME` (`WONDAN_NAME`);

--
-- 테이블의 인덱스 `JEADAN`
--
ALTER TABLE `JEADAN`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `idx_WORK_ORDER_NO` (`WORK_ORDER_NO`),
  ADD KEY `LOT_NO` (`LOT_NO`);

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
-- 테이블의 AUTO_INCREMENT `JADAN_WORK_HISTORY`
--
ALTER TABLE `JADAN_WORK_HISTORY`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `JEADAN`
--
ALTER TABLE `JEADAN`
  MODIFY `NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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

-- 테이블의 제약사항 `JADAN_WORK_HISTORY`
--
ALTER TABLE `JADAN_WORK_HISTORY`
  ADD CONSTRAINT `fk_WONDAN_NAME` FOREIGN KEY (`WONDAN_NAME`) REFERENCES `WONDAN` (`NAME`);

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

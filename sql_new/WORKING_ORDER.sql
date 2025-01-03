
--
-- 테이블 구조 `WORKING_ORDER`
--

CREATE TABLE `WORKING_ORDER` (
  `NO` int(10) NOT NULL,
  `ORDER_NO` int(10) NOT NULL,
  `WORKING_PART` int(10) NOT NULL,
  `WORKING_ID` int(11) NOT NULL,
  `COUNT` int(10) NOT NULL,
  `CREATE_DATA` date NOT NULL DEFAULT current_timestamp(),
  `STATE` int(10) NOT NULL DEFAULT 1,
  `ORDER_ACCOUNT` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  ADD PRIMARY KEY (`NO`),
  ADD KEY `WORKING_ORDER_ACCOUNT` (`ORDER_ACCOUNT`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  MODIFY `NO` int(10) NOT NULL AUTO_INCREMENT;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `WORKING_ORDER`
--
ALTER TABLE `WORKING_ORDER`
  ADD CONSTRAINT `ACCOUNT` FOREIGN KEY (`ORDER_ACCOUNT`) REFERENCES `ACCOUNT` (`ID`),
  ADD CONSTRAINT `WORKING_PART` FOREIGN KEY (`WORKING_PART`) REFERENCES `WORKING_PART` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

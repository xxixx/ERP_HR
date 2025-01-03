BEGIN
    DECLARE product_no INT;
    DECLARE working_part_no INT;

    -- PRODUCTION에 새로 추가된 row와 관련된 wp.ProductCode 찾기
    SELECT wp.ProductCode, wp.WorkingPartNo 
    INTO product_no, working_part_no
    FROM JAEDAN jr
    JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
    JOIN WorkingPartProductsWondanView wp ON wo.WORKING_PART = wp.WorkingPartNo
    WHERE jr.PROCESSCODE = NEW.PROCESSCODE;

    -- INVENTORY 테이블에서 해당 PRODUCT_NO가 있는지 확인
    IF EXISTS (SELECT 1 FROM INVENTORY WHERE PRODUCT_NO = product_no) THEN
        -- 존재하면 SUM_COUNT 업데이트
        UPDATE INVENTORY
        SET SUM_COUNT = SUM_COUNT + NEW.QUANTITY
        WHERE PRODUCT_NO = product_no;
    ELSE
        -- 존재하지 않으면 새로운 항목 삽입
        INSERT INTO INVENTORY (PRODUCT_NO, SUM_COUNT, DATE)
        VALUES (working_part_no, NEW.QUANTITY, NEW.CREATE_DATE);
    END IF;
END


DELIMITER //

CREATE TRIGGER update_inventory_after_insert
AFTER INSERT ON PRODUCTION
FOR EACH ROW
BEGIN
    DECLARE product_no INT;

    -- PRODUCTION에 새로 추가된 row와 관련된 wp.ProductCode 찾기
    SELECT wp.ProductCode 
    INTO product_no
    FROM JAEDAN jr
    JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
    JOIN WorkingPartProductsWondanView wp ON wo.WORKING_PART = wp.WorkingPartNo
    WHERE jr.PROCESSCODE = NEW.PROCESSCODE
    LIMIT 1;

    -- INVENTORY 테이블에서 해당 PRODUCT_NO가 있는지 확인하고 업데이트 또는 삽입
    IF product_no IS NOT NULL THEN
        IF EXISTS (SELECT 1 FROM INVENTORY WHERE PRODUCT_NO = product_no) THEN
            UPDATE INVENTORY
            SET SUM_COUNT = SUM_COUNT + NEW.QUANTITY
            WHERE PRODUCT_NO = product_no;
        ELSE
            INSERT INTO INVENTORY (PRODUCT_NO, SUM_COUNT, DATE)
            VALUES (product_no, NEW.QUANTITY, NEW.CREATE_DATE);
        END IF;
    END IF;
END//

DELIMITER ;


BEGIN
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

PRODUCTION 테이블에 데이터가 저장되면
INVENTORY 테이블에 업데이트 하는 트리거를 작성하는데

PRODUCTION 테이블의 PROCESSCODE 는 JAEDAN 테이블의 PROCESSCODE 과 같은 것에서 WORK_ORDER_NO 를 참조하여

WORKING_ORDER 테이블에서 NO 값이 가지는 WORKING_PART 값을 가지고
WorkingPartProductsWondanView 테이블 에 WorkingPartNo 와 같은 것에서 PRODUCT_CODE 가 
INVENTORY  테이블의 PRODUCT_NO 와 같은 것에 
PRODUCTION QUANTITY 값을 
INVENTORY 테이블  SUM_COUNT 값을  업데이트 하는 트리거를 만들어라

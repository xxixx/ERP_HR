SELECT wp.PUMBUN
FROM JAEDAN_REGIST jr
JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
WHERE jr.WORK_ORDER_NO = 23;
또는 WHERE jr.NO = 23;

JAEDAN_REGIST 테이블에서 WORK_ORDER_NO가 23인 행을 찾습니다.
WORKING_ORDER 테이블과 JAEDAN_REGIST 테이블을 WORK_ORDER_NO와 NO 열을 기준으로 조인합니다.
WORKING_PART 테이블과 WORKING_ORDER 테이블을 WORKING_PART와 ID 열을 기준으로 조인합니다.
최종적으로 WORKING_PART 테이블의 PUMBUN 열 값을 선택합니다.

따라서 이 쿼리는 JAEDAN_REGIST 테이블의 WORK_ORDER_NO가 23인 행에 대해, WORKING_ORDER 테이블의 WORKING_PART 값을 통해 WORKING_PART 테이블의 PUMBUN 값을 가져옵니다.



Try again with different context
Add context...
Avatar for terasys-hecac
const onFinish = async (item) => {

const JaedanNo = item.NO

console.log("JaedanNo", JaedanNo);

await $fetch(`/api/jaedan/updateState/${JaedanNo}`, {

method: 'POST',

body: {

NO: JaedanNo,

STATE: 2, // 상태를 1로 설정

UPDATE_ACCOUNT: regUserNO.value,

}

});

fetchData();

}; 을 실행하면 
SELECT jr.NO, jr.CREATE_DATE,jr.WORK_ORDER_NO,jr.COUNT,

wp.ASSY_PART_NAME,wp.ASSY_SUB_PART_NAME,wp.JAEDAN_PART_NAME, wp.WONDAN_NAME,jr.LOT,wp.PUMBUN

FROM JAEDAN_REGIST jr

JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO

JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID

WHERE jr.WORK_ORDER_NO = selectOrder.NO; 가 실행되게 하려면?

onFinish 함수에서 $fetch 요청을 보내기 전에 필요한 데이터를 가져오는 쿼리를 실행하려면 서버 측 API 엔드포인트에서 해당 작업을 수행해야 합니다.

예를 들어, server/api/jaedan/updateState/[id].post.ts 파일에 다음과 같이 코드를 작성할 수 있습니다.

import { sql } from '~/server/db';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const body = await readBody(event);

  try {
    // 상태 업데이트 쿼리
    await sql({
      query: `
        UPDATE JAEDAN_REGIST
        SET STATE = ?, UPDATE_ACCOUNT = ?
        WHERE NO = ?
      `,
      values: [body.STATE, body.UPDATE_ACCOUNT, id]
    });

    // 필요한 데이터 가져오기 쿼리
    const [rows] = await sql({
      query: `
        SELECT jr.NO, jr.CREATE_DATE, jr.WORK_ORDER_NO, jr.COUNT,
          wp.ASSY_PART_NAME, wp.ASSY_SUB_PART_NAME, wp.JAEDAN_PART_NAME, wp.WONDAN_NAME, jr.LOT, wp.PUMBUN
        FROM JAEDAN_REGIST jr
        JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
        JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
        WHERE jr.WORK_ORDER_NO = (
          SELECT wo.NO
          FROM WORKING_ORDER wo
          JOIN JAEDAN_REGIST jr ON wo.NO = jr.WORK_ORDER_NO
          WHERE jr.NO = ?
        )
      `,
      values: [id]
    });

    return rows;
  } catch (error) {
    console.error('Error updating state:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to update state' });
  }
});



이 코드에서는 다음과 같은 작업을 수행합니다.

JAEDAN_REGIST 테이블에서 해당 NO에 대한 STATE와 UPDATE_ACCOUNT 값을 업데이트합니다.
JAEDAN_REGIST 테이블의 WORK_ORDER_NO를 기반으로 WORKING_ORDER 테이블의 NO를 찾습니다.
찾은 WORKING_ORDER 테이블의 NO를 사용하여 JAEDAN_REGIST, WORKING_ORDER, WORKING_PART 테이블을 조인하고, 필요한 열들을 선택합니다.
선택한 데이터를 반환합니다.
이렇게 하면 클라이언트 측에서 onFinish 함수를 실행할 때, 서버 측에서 필요한 데이터를 가져와 반환할 수 있습니다.



Try again with different context
Add context...
Avatar for terasys-hecac
const onFinish = async (item) => {

const JaedanNo = item.NO

console.log("JaedanNo", JaedanNo);

await $fetch(`/api/jaedan/updateState/${JaedanNo}`, {

method: 'POST',

body: {

NO: JaedanNo,

STATE: 2, 

UPDATE_ACCOUNT: regUserNO.value,

}

});

fetchData();

}; 을 실행하면  JAEDAN_REGIST 테이블의 STATE 가 2로 update  된다. 이때 트리거로 위의 쿼리를 샐행되게 할수 있는가?

네, MySQL에서 트리거를 사용하면 JAEDAN_REGIST 테이블의 STATE 값이 업데이트될 때마다 원하는 쿼리를 실행할 수 있습니다.

먼저, 다음과 같이 트리거를 생성해야 합니다.

DELIMITER $$
CREATE TRIGGER after_jaedan_regist_update
AFTER UPDATE ON JAEDAN_REGIST
FOR EACH ROW
BEGIN
    IF NEW.STATE = 2 THEN
        SELECT jr.NO, jr.CREATE_DATE, jr.WORK_ORDER_NO, jr.COUNT,
               wp.ASSY_PART_NAME, wp.ASSY_SUB_PART_NAME, wp.JAEDAN_PART_NAME, wp.WONDAN_NAME, jr.LOT, wp.PUMBUN
        INTO @result
        FROM JAEDAN_REGIST jr
        JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
        JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
        WHERE jr.WORK_ORDER_NO = (
            SELECT wo.NO
            FROM WORKING_ORDER wo
            JOIN JAEDAN_REGIST jr ON wo.NO = jr.WORK_ORDER_NO
            WHERE jr.NO = NEW.NO
        );
    END IF;
END$$
DELIMITER ;



이 트리거는 JAEDAN_REGIST 테이블에서 UPDATE 작업이 발생한 후에 실행됩니다. 트리거 내부에서는 NEW.STATE 값이 2인 경우에만 원하는 쿼리를 실행합니다. 쿼리 결과는 @result 변수에 저장됩니다.

트리거를 생성한 후에는 JAEDAN_REGIST 테이블의 STATE 값이 2로 업데이트될 때마다 해당 쿼리가 자동으로 실행됩니다.

그러나 트리거에서 실행된 쿼리 결과를 클라이언트 측에서 직접 사용하기는 어렵습니다. 대신, 서버 측 API 엔드포인트에서 해당 쿼리를 실행하고 결과를 반환하는 것이 더 적절할 것 같습니다.



Try again with different context
Add context...
Avatar for terasys-hecac
위의 트리거로 뷰테이블을 만들어라

네, 위의 트리거를 사용하여 뷰 테이블을 만들 수 있습니다. 다음과 같이 진행하면 됩니다.

먼저 트리거에서 사용한 @result 변수를 제거합니다. 대신 결과를 임시 테이블에 저장하도록 수정하겠습니다.
DELIMITER $$
CREATE TRIGGER after_jaedan_regist_update
AFTER UPDATE ON JAEDAN_REGIST
FOR EACH ROW
BEGIN
    IF NEW.STATE = 2 THEN
        CREATE TEMPORARY TABLE temp_result (
            NO INT,
            CREATE_DATE DATETIME,
            WORK_ORDER_NO INT,
            COUNT INT,
            ASSY_PART_NAME VARCHAR(255),
            ASSY_SUB_PART_NAME VARCHAR(255),
            JAEDAN_PART_NAME VARCHAR(255),
            WONDAN_NAME VARCHAR(255),
            LOT VARCHAR(255),
            PUMBUN VARCHAR(255)
        );

        INSERT INTO temp_result
        SELECT jr.NO, jr.CREATE_DATE, jr.WORK_ORDER_NO, jr.COUNT,
               wp.ASSY_PART_NAME, wp.ASSY_SUB_PART_NAME, wp.JAEDAN_PART_NAME, wp.WONDAN_NAME, jr.LOT, wp.PUMBUN
        FROM JAEDAN_REGIST jr
        JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
        JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
        WHERE jr.WORK_ORDER_NO = (
            SELECT wo.NO
            FROM WORKING_ORDER wo
            JOIN JAEDAN_REGIST jr ON wo.NO = jr.WORK_ORDER_NO
            WHERE jr.NO = NEW.NO
        );
    END IF;
END$$
DELIMITER ;



이제 임시 테이블을 기반으로 뷰 테이블을 생성할 수 있습니다.
CREATE VIEW jaedan_regist_view AS
SELECT *
FROM temp_result;



뷰 테이블을 생성한 후에는 다음과 같이 조회할 수 있습니다.
SELECT * FROM jaedan_regist_view;



이렇게 하면 JAEDAN_REGIST 테이블의 STATE 값이 2로 업데이트될 때마다 트리거가 실행되고, 해당 데이터를 임시 테이블에 저장합니다. 그리고 이 임시 테이블을 기반으로 jaedan_regist_view 뷰 테이블이 생성되어 필요한 데이터를 조회할 수 있습니다.

뷰 테이블은 실제 데이터를 저장하지 않고 가상의 테이블처럼 동작하므로, 데이터 변경 시 자동으로 반영됩니다. 따라서 JAEDAN_REGIST 테이블의 데이터가 변경되면 뷰 테이블에도 자동으로 반영됩니다.


SELECT jr.*, ac.NAME as regAccount, ac2.NAME as updateAccount, wp.PUMBUN
FROM JAEDAN_REGIST jr
JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO
JOIN ACCOUNT ac ON jr.REG_ACCOUNT = ac.NO
JOIN ACCOUNT ac2 ON jr.UPDATE_ACCOUNT = ac2.NO
JOIN WORKING_PART wp ON wo.WORKING_PART = wp.ID
WHERE jr.NO = 31;
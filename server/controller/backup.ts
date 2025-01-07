import { H3Event, createError } from 'h3';
import * as fs from 'fs';
import * as path from 'path';
import { sql } from '~/server/db';

const backupDir = path.join(process.cwd(), 'backups');
console.log('백업 디렉토리 경로:', backupDir);

// 백업 디렉토리가 없으면 생성
if (!fs.existsSync(backupDir)) {
  console.log('백업 디렉토리 생성');
  fs.mkdirSync(backupDir, { recursive: true });
}
console.log('백업 디렉토리 준비 완료');

export const createBackup = async (event: H3Event) => {
  try {
    console.log('백업 생성 시작');
    const now = new Date();
    const timestamp = now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/[/\s:\.]/g, '-').replace(/--/g, '-');
    const backupFileName = `backup-${timestamp}.sql`;
    console.log('생성될 백업 파일명:', backupFileName);
    const backupPath = path.join(backupDir, backupFileName);

    // 테이블 목록 조회
    const tablesQuery = "SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'";
    const tables = await sql({ query: tablesQuery });
    
    // 뷰 목록 조회
    const viewsQuery = "SHOW FULL TABLES WHERE Table_type = 'VIEW'";
    const views = await sql({ query: viewsQuery });
    
    // 트리거 목록 조회
    const triggersQuery = "SHOW TRIGGERS";
    const triggers = await sql({ query: triggersQuery });
    
    let backupContent = '';
    
    // 테이블 의존성 순서 정의
    const tableOrder = [
      // 1. 독립 테이블 (다른 테이블을 참조하지 않는 테이블)
      'BOARD_CATEGORY',
      'ACCOUNT',
      'ACCOUNT_POSITION',
      'ACCOUNT_ROLE',
      'BACKUP_HISTORY',
      'CHAR_DIM',
      'DEFECTIVE_CAT',
      'BARCODE_COUNT',
      'BOX',
      'DAYS_PRODUCTION',
      'DEPARTMENTS',
      'JOBS',
      
      // 2. 1차 의존 테이블 (독립 테이블만 참조하는 테이블)
      'BOARD_POST',     // BOARD_CATEGORY, ACCOUNT 참조
      'DEFECTIVE_DATA', // DEFECTIVE_CAT 참조
      'EMPLOYEES',      // DEPARTMENTS, JOBS 참조
      
      // 3. 2차 의존 테이블 (1차 의존 테이블을 참조하는 테이블)
      'BOARD_ATTACHMENT', // BOARD_POST 참조
      'BOARD_COMMENT'    // BOARD_POST, ACCOUNT 참조
    ];
    
    // 정의된 순서의 테이블 먼저 처리
    for (const orderedTable of tableOrder) {
      const table = tables.find(t => Object.values(t)[0] === orderedTable);
      if (table) {
        const tableName = Object.values(table)[0];
        console.log('테이블 백업 중 (우선순위):', tableName);

        // 테이블 생성 구문 가져오기
        const createTableQuery = `SHOW CREATE TABLE ${tableName}`;
        const createTableResult = await sql({ query: createTableQuery });
        const createTableSql = createTableResult[0]['Create Table'];
        
        backupContent += `DROP TABLE IF EXISTS ${tableName};\n`;
        backupContent += createTableSql + ';\n\n';

        // 테이블 데이터 백업
        const selectQuery = `SELECT * FROM ${tableName}`;
        const rows = await sql({ query: selectQuery });
        
        if (rows.length > 0) {
          const columns = Object.keys(rows[0]);
          backupContent += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES\n`;
          
          const values = rows.map(row => {
            const rowValues = columns.map(column => {
              const value = row[column];
              if (value === null) return 'NULL';
              if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
              return value;
            });
            return `(${rowValues.join(', ')})`;
          }).join(',\n');
          
          backupContent += values + ';\n\n';
        }
        
        // 처리된 테이블 제거
        tables.splice(tables.indexOf(table), 1);
      }
    }
    
    // 나머지 테이블 처리
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      console.log('테이블 백업 중:', tableName);

      // 테이블 생성 구문 가져오기
      const createTableQuery = `SHOW CREATE TABLE ${tableName}`;
      const createTableResult = await sql({ query: createTableQuery });
      const createTableSql = createTableResult[0]['Create Table'];
      
      backupContent += `DROP TABLE IF EXISTS ${tableName};\n`;
      backupContent += createTableSql + ';\n\n';

      // 테이블의 컬럼 정보 조회
      const columnsQuery = `SHOW COLUMNS FROM ${tableName}`;
      const columns = await sql({ query: columnsQuery });
      
      // 날짜 타입 컬럼 찾기 및 타입 저장
      const dateColumns = columns
        .filter(col => col.Type.toLowerCase().includes('date') || col.Type.toLowerCase().includes('timestamp'))
        .map(col => ({
          name: col.Field,
          type: col.Type.toLowerCase()
        }));

      // 테이블 데이터 가져오기
      let dataQuery = `SELECT `;
      
      // 각 컬럼에 대해 날짜 형식 지정
      const selectColumns = columns.map(col => {
        const dateCol = dateColumns.find(dc => dc.name === col.Field);
        if (dateCol) {
          if (dateCol.type.includes('timestamp') || dateCol.type.includes('datetime')) {
            // datetime, timestamp 타입은 YYYY-MM-DD HH:mm:ss 형식으로
            return `DATE_FORMAT(${col.Field}, '%Y-%m-%d %H:%i:%s') as ${col.Field}`;
          } else if (dateCol.type.includes('date')) {
            // date 타입은 YYYY-MM-DD 형식으로
            return `DATE_FORMAT(${col.Field}, '%Y-%m-%d') as ${col.Field}`;
          }
        }
        return col.Field;
      });
      
      dataQuery += selectColumns.join(', ') + ` FROM ${tableName}`;
      console.log('데이터 조회 쿼리:', dataQuery);
      
      const data = await sql({ query: dataQuery });
      
      if (data.length > 0) {
        const columns = Object.keys(data[0]);
        const insertHeader = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES\n`;
        
        const values = data.map(row => {
          return '(' + columns.map(col => {
            const value = row[col];
            if (value === null) return 'NULL';
            if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
            return value;
          }).join(', ') + ')';
        }).join(',\n');

        if (values.length > 0) {
          backupContent += insertHeader + values + ';\n\n';
        }
      }
    }

    // 뷰 백업
    console.log('뷰 백업 시작');
    for (const view of views) {
      const viewName = Object.values(view)[0];
      console.log('뷰 백업 중:', viewName);

      // 뷰 생성 구문 가져오기
      const showViewQuery = `SHOW CREATE VIEW ${viewName}`;
      const viewResult = await sql({ query: showViewQuery });
      const createViewSql = viewResult[0]['Create View'];

      backupContent += `DROP VIEW IF EXISTS ${viewName};\n`;
      backupContent += createViewSql + ';\n\n';
    }

    // 트리거 백업
    console.log('트리거 백업 시작');
    for (const trigger of triggers) {
      const triggerName = trigger.Trigger;
      console.log('트리거 백업 중:', triggerName);

      // 트리거 생성 구문 가져오기
      const showTriggerQuery = `SHOW CREATE TRIGGER ${triggerName}`;
      const triggerResult = await sql({ query: showTriggerQuery });
      const createTriggerSql = triggerResult[0]['SQL Original Statement'];

      backupContent += `DROP TRIGGER IF EXISTS ${triggerName};\n`;
      backupContent += `DELIMITER //\n${createTriggerSql}//\nDELIMITER ;\n\n`;
    }

    // 백업 파일 저장
    fs.writeFileSync(backupPath, backupContent);
    
    // 백업 이력 저장
    const stats = fs.statSync(backupPath);
    const historyQuery = `
      INSERT INTO BACKUP_HISTORY (
        BACKUP_NAME, 
        BACKUP_PATH, 
        BACKUP_SIZE, 
        CREATED_BY,
        STATUS,
        CREATED_AT
      ) VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    await sql({
      query: historyQuery,
      values: [
        backupFileName,
        backupPath,
        stats.size,
        'system',
        'SUCCESS'
      ]
    });

    console.log('백업 파일 생성 완료:', backupFileName);
    return {
      success: true,
      filename: backupFileName,
      size: stats.size
    };
  } catch (error) {
    console.error('백업 생성 실패:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '백업 생성 중 오류가 발생했습니다.'
    });
  }
};

export const getBackupList = async () => {
  try {
    console.log('백업 목록 조회 시작');
    const query = `
      SELECT 
        ID,
        BACKUP_NAME,
        BACKUP_PATH,
        BACKUP_SIZE,
        CREATED_BY,
        STATUS,
        CREATED_AT
      FROM BACKUP_HISTORY 
      ORDER BY CREATED_AT DESC
    `;
    
    const result = await sql({ query });
    console.log('백업 목록 조회 완료');
    return result;
  } catch (error) {
    console.error('백업 목록 조회 실패:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '백업 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

export const downloadBackup = async (event: H3Event) => {
    try {
      console.log('이벤트 컨텍스트:', event.context);
      console.log('요청 URL:', event.node.req.url);
      
      const filename = event.context.params.filename;
      console.log('요청된 파일명:', filename);
      
      const backupPath = path.join(process.cwd(), 'backups');
      console.log('백업 디렉토리:', backupPath);
      
      const filePath = path.join(backupPath, filename);
      console.log('전체 파일 경로:', filePath);
      console.log('파일 존재 여부:', fs.existsSync(filePath));
      
      if (!fs.existsSync(filePath)) {
        console.error('파일을 찾을 수 없음:', filePath);
        throw createError({
          statusCode: 404,
          statusMessage: `백업 파일을 찾을 수 없습니다: ${filename}`
        });
      }

      // 파일 읽기
      const fileContent = fs.readFileSync(filePath);
      console.log('파일 크기:', fileContent.length);
      
      // 응답 헤더 설정
      event.node.res.setHeader('Content-Type', 'application/sql');
      event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      event.node.res.setHeader('Content-Length', fileContent.length);
      
      return fileContent;
    } catch (error) {
      console.error('다운로드 처리 중 에러:', error);
      throw error;
    }
};

export const deleteBackup = async (event: H3Event) => {
  try {
    const filename = event.context.params.filename;
    const filePath = path.join(backupDir, filename);
    
    if (!fs.existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        statusMessage: '백업 파일을 찾을 수 없습니다.'
      });
    }

    // 파일 삭제
    fs.unlinkSync(filePath);
    
    // 데이터베이스 기록 삭제
    const query = 'DELETE FROM BACKUP_HISTORY WHERE BACKUP_NAME = ?';
    await sql({ query, values: [filename] });
    
    console.log('백업 파일 삭제 완료:', filename);

    return {
      success: true,
      message: '백업 파일이 삭제되었습니다.'
    };
  } catch (error) {
    console.error('백업 삭제 실패:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '백업 삭제 중 오류가 발생했습니다.'
    });
  }
};
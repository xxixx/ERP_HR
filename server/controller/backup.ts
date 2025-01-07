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
    const tablesQuery = "SHOW TABLES";
    const tables = await sql({ query: tablesQuery });
    
    let backupContent = '';
    
    // 각 테이블의 생성 구문과 데이터를 백업
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      console.log('테이블 백업 중:', tableName);

      // 테이블 생성 구문 가져오기
      const createTableQuery = `SHOW CREATE TABLE ${tableName}`;
      const createTableResult = await sql({ query: createTableQuery });
      const createTableSql = createTableResult[0]['Create Table'];
      
      backupContent += `DROP TABLE IF EXISTS ${tableName};\n`;
      backupContent += createTableSql + ';\n\n';

      // 테이블 데이터 가져오기
      const dataQuery = `SELECT * FROM ${tableName}`;
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

        if (values) {
          backupContent += insertHeader + values + ';\n\n';
        }
      }
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
import { defineEventHandler } from 'h3';
import formidable from 'formidable';
import { mkdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  // 업로드 디렉토리 설정
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  
  try {
    // 업로드 디렉토리가 없으면 생성
    await mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB 제한
      multiples: true, // 다중 파일 업로드 허용
      filename: (name, ext, part, form) => {
        // 원본 파일명 유지하면서 충돌 방지를 위한 타임스탬프 추가
        return `${Date.now()}-${part.originalFilename}`;
      }
    });

    const [fields, filesObj] = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // files 객체 처리
    const files = filesObj['files[]'];
    if (!files) {
      return {
        success: false,
        error: '업로드된 파일이 없습니다.'
      };
    }

    // 단일 파일인 경우 배열로 변환
    const filesArray = Array.isArray(files) ? files : [files];
    
    // 파일 정보 변환
    const uploadedFiles = filesArray.map(file => ({
      FILE_NAME: file.originalFilename,
      FILE_PATH: `/uploads/${file.newFilename}`,
      FILE_SIZE: file.size,
      MIME_TYPE: file.mimetype
    }));

    return {
      success: true,
      files: uploadedFiles
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      error: '파일 업로드 중 오류가 발생했습니다.'
    };
  }
});

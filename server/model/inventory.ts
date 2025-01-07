import { sql } from '~~/server/db';

export type InventoryModel = {
  NO: any;
  PRODUCT_NO: any;
  PRODUCT_CODE: any;
  CAR: any;
  LOCATION: any;
  PRODUCT_NAME: any;
  PRODUCT_FULLNAME: any;
  PROCESSCODE: any;
};

export const getInventory = async () => {
  const result = await sql({
    query: 'SELECT *,DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM INVENTORY inv join PRODUCTS_INVENTORY pi on inv.PRODUCT_NO = pi.NO ORDER BY DATE DESC'
  });
  return result;
};

export const getStockFromInventory = async () => {
  const result = await sql({
    query: 'SELECT inv.*,inv.PRODUCT_NO as product_no, DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM STOCK inv join PRODUCTS_INVENTORY pi on inv.PRODUCT_NO = pi.NO  where inv.stock_inventory > 0 ORDER BY DATE DESC'
    // query: 'SELECT inv.NO,inv.PRODUCT_NO as product_no,inv.PRODUCT_CODE,inv.PRODUCT_FULLNAME,inv.PROCESSCODE,inv.COUNT,inv.STOCK_INVENTORY ,DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM STOCK inv join PRODUCTS_INVENTORY pi on inv.PRODUCT_NO = pi.NO  where inv.stock_inventory > 0 ORDER BY DATE DESC'
  });
  return result;
};

export const getStockInventory = async () => {
  const result = await sql({
    query: 'SELECT *,DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM STOCK inv join PRODUCTS_INVENTORY pi on inv.PRODUCT_NO = pi.NO ORDER BY DATE DESC'
  });
  return result;
};

export const getAllProducts = async () => {
  const result = await sql({
    query: 'SELECT * FROM PRODUCTS_INVENTORY'
  });
  return result;
};

export const getStock = async () => {
  const result = await sql({
    query: 'SELECT * FROM STOCK ORDER BY DATE DESC'
  });
  return result;
};

export const getProductionStockAll = async () => {
  const result = await sql({
    query: 'SELECT pr.*,wp.ProductCode,wp.PRODUCT_NAME, wp.PRODUCT_FULLNAME from PRODUCTION pr JOIN JAEDAN jr ON pr.PROCESSCODE = jr.PROCESSCODE JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO JOIN WorkingPartProductsWondanViewTable wp ON wo.WORKING_PART = wp.WorkingPartNo ORDER BY pr.OUT_DATE DESC;'
  });
  return result;
};

export const getProductionStock = async () => {
  const result = await sql({
    query: 'SELECT pr.*,wp.ProductCode,wp.PRODUCT_NAME, wp.PRODUCT_FULLNAME from PRODUCTION pr JOIN JAEDAN jr ON pr.PROCESSCODE = jr.PROCESSCODE JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO JOIN WorkingPartProductsWondanViewTable wp ON wo.WORKING_PART = wp.WorkingPartNo WHERE pr.STATE = 0 ORDER BY pr.OUT_DATE  DESC;'
  });
  return result;
};

export const productionDeliveryList = async () => {
  const result = await sql({
    query: 'SELECT pr.*,wp.ProductCode,wp.PRODUCT_NAME, wp.PRODUCT_FULLNAME from PRODUCTION pr JOIN JAEDAN jr ON pr.PROCESSCODE = jr.PROCESSCODE JOIN WORKING_ORDER wo ON jr.WORK_ORDER_NO = wo.NO JOIN WorkingPartProductsWondanViewTable wp ON wo.WORKING_PART = wp.WorkingPartNo  WHERE pr.STATE = 1 ORDER BY  pr.OUT_DATE DESC;'
  });
  return result;
};

export const getStockChart = async () => {
  const result = await sql({
    query: 'SELECT NO,PRODUCT_NO,PRODUCT_CODE,PRODUCT_FULLNAME, COUNT, DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM STOCK ORDER BY DATE DESC limit 60'
  });
  return result;
};

// export const stockRegister = async (data: any) => {
//   const result = await sql({
//     query: 'INSERT INTO STOCK (PRODUCT_NO,PRODUCT_CODE,PRODUCT_FULLNAME, COUNT,DATE) VALUES ( ?, ?, ?,?,?)',
//     values: [ data.PRODUCT_NO,data.PRODUCT_CODE,data.PRODUCT_FULLNAME, data.COUNT,data.DATE]
//   });
//   return result;
// };
export const stockRegister = async (data: any) => {
  console.log(data);
  
  const result = await sql({
    query: 'INSERT INTO STOCK (PRODUCT_NO, PRODUCT_CODE, PRODUCT_FULLNAME, PROCESSCODE, COUNT, DATE, STOCK_INVENTORY) VALUES (?, ?, ?, ?, ?, ?, ?)',
    values: [data.PRODUCT_NO, data.PRODUCT_CODE, data.PRODUCT_FULLNAME, data.PROCESSCODE, data.COUNT, data.DATE, data.COUNT] // COUNT 값을 STOCK_INVENTORY에 추가
  });
  return result;
};
export const stockRegisterFromBarcode = async (data: any) => {
  console.log(data);
  
  const result = await sql({
    query: 'INSERT INTO STOCK (PRODUCT_NO, PRODUCT_CODE, PRODUCT_FULLNAME, PROCESSCODE, COUNT, DATE, STOCK_INVENTORY,LOT_NUMBER,BOX_NUMBER) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)',
    values: [data.PRODUCT_NO, data.PRODUCT_CODE, data.PRODUCT_FULLNAME, data.PROCESSCODE, data.COUNT, data.DATE, data.COUNT,data.LOT_NUMBER,data.BOX_NUMBER] // COUNT 값을 STOCK_INVENTORY에 추가
  });
  return result;
};

export const stockRemove = async (NO: string) => {
  const result = await sql({
    query: 'DELETE FROM STOCK WHERE NO = ?',
    values: [NO]
  });
//   return result.affectedRows > 0;
return true;
};

export const getDelivery = async () => {
  const result = await sql({
    query: 'SELECT delivery.* FROM DELIVERY delivery JOIN PRODUCTS_INVENTORY pi ON delivery.PRODUCT_NO = pi.NO ORDER BY DATE '
  });
  return result;
};
export const getDeliveryChart = async () => {
  const result = await sql({
    query: 'SELECT NO,PRODUCT_NO,PRODUCT_CODE,PRODUCT_FULLNAME, COUNT, DATE_FORMAT(DATE, "%y-%m-%d") as formatted_date FROM DELIVERY ORDER BY DATE limit 60'
  });
  return result;
};
// export const deliveryRegister = async (data: any) => {
//   const result = await sql({
//     query: 'INSERT INTO DELIVERY (PRODUCT_NO,PRODUCT_CODE,PRODUCT_FULLNAME, COUNT,DATE) VALUES ( ?, ?, ?,?,?)',
//     values: [ data.PRODUCT_NO,data.PRODUCT_CODE,data.PRODUCT_FULLNAME, data.COUNT,data.DATE]
//   });
//   return result;
// };
export const deliveryRegister = async (data: any) => {
  console.log("deliveryRegister DATA============",data);
  
  // DELIVERY 테이블에 데이터 삽입
  const deliveryResult = await sql({
    query: 'INSERT INTO DELIVERY (PRODUCT_NO, PRODUCT_FULLNAME, COUNT, DATE) VALUES (?, ?, ?,  ?)',
    values: [data.PRODUCT_NO, data.PRODUCT_FULLNAME, data.COUNT, data.DATE]
  });

  // STOCK 테이블의 STOCK_INVENTORY 업데이트
  const stockUpdateResult = await sql({
    query: 'UPDATE STOCK SET STOCK_INVENTORY = STOCK_INVENTORY - ? WHERE NO = ?',
    values: [data.COUNT, data.NO]
  });

  return { deliveryResult, stockUpdateResult };
};
export const StockFromDeliveryRegister = async (data: any) => {
  console.log(data);
  const result = await sql({
    query: 'INSERT INTO DELIVERY (PRODUCT_NO,PRODUCT_CODE,PRODUCT_FULLNAME, COUNT,DATE) VALUES ( ?, ?, ?,?,?)',
    values: [ data.NO,data.PRODUCT_NO,data.PRODUCT_CODE,data.PRODUCT_FULLNAME, data.COUNT,data.DATE]
  });
  return result;
};
export const productionDelivery = async (data: any) => {
  const stockNos = data.stockNos;
  const selectedDate = data.form.DATE;

  if (!stockNos || stockNos.length === 0) {
    throw new Error('No stock numbers provided');
  }

  if (!selectedDate) {
    throw new Error('No date provided');
  }

  // stockNos 배열을 활용해 PRODUCTION 테이블의 STATE와 OUT_DATE 값을 업데이트하는 SQL 쿼리
  const result = await sql({
    query: `
      UPDATE PRODUCTION 
      SET STATE = 1, OUT_DATE = ?
      WHERE NO IN (?)
    `,
    values: [selectedDate, stockNos] // 선택된 날짜와 stockNos 배열을 전달
  });

  return result;
};
export const deliveryRemove = async (NO: string) => {
  const result = await sql({
    query: 'DELETE FROM DELIVERY WHERE NO = ?',
    values: [NO]
  });
//   return result.affectedRows > 0;
return true;
};

export const getPagedInventory = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: 'SELECT COUNT(*) as total FROM STOCK'
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / pageSize);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
    
      
      FROM STOCK 
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [pageSize, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};

// 날짜 범위로 검색
export const getInventoryByDate = async (startDate: string, endDate: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: `
      SELECT COUNT(*) as total 
      FROM STOCK 
      WHERE DATE BETWEEN ? AND ?
    `,
    values: [startDate, endDate]
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *,
    
      
      FROM STOCK 
      WHERE DATE BETWEEN ? AND ?
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [startDate, endDate, limit, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};

// 검색어로 검색
export const searchInventory = async (searchTerm: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: `
      SELECT COUNT(*) as total 
      FROM STOCK 
      WHERE 
        PRODUCT_NAME LIKE ? OR
        LOT LIKE ? OR
        PRODUCT_CODE LIKE ?
    `,
    values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *,
    
      FROM STOCK 
      WHERE 
        PRODUCT_NAME LIKE ? OR
        LOT LIKE ? OR
        PRODUCT_CODE LIKE ?
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, limit, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};

export const getPagedStockFromDelivery = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: 'SELECT COUNT(*) as total FROM DELIVERY'
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / pageSize);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
      FROM DELIVERY 
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [pageSize, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};
export const getPagedStock = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: 'SELECT COUNT(*) as total FROM STOCK'
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / pageSize);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
      FROM STOCK 
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [pageSize, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};

export const getStockFromDeliveryByDate = async (startDate: string, endDate: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: `
      SELECT COUNT(*) as total 
      FROM DELIVERY 
      WHERE DATE BETWEEN ? AND ?
    `,
    values: [startDate, endDate]
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
      FROM DELIVERY 
      WHERE DATE BETWEEN ? AND ?
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [startDate, endDate, limit, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};
export const getStockByDate = async (startDate: string, endDate: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: `
      SELECT COUNT(*) as total 
      FROM STOCK 
      WHERE DATE BETWEEN ? AND ?
    `,
    values: [startDate, endDate]
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
      FROM STOCK 
      WHERE DATE BETWEEN ? AND ?
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [startDate, endDate, limit, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};

export const searchStockFromDelivery = async (searchTerm: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: `
      SELECT COUNT(*) as total 
      FROM DELIVERY 
      WHERE 
        PRODUCT_FULLNAME LIKE ? OR
        PRODUCT_NO LIKE ? OR
        PRODUCT_CODE LIKE ?
    `,
    values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
      FROM DELIVERY 
      WHERE 
        PRODUCT_FULLNAME LIKE ? OR
        PRODUCT_NO LIKE ? OR
        PRODUCT_CODE LIKE ?
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, limit, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};
export const searchStockFrom = async (searchTerm: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  // 전체 레코드 수 조회
  const countResult = await sql({
    query: `
      SELECT COUNT(*) as total 
      FROM STOCK 
      WHERE 
        PRODUCT_FULLNAME LIKE ? OR
        PROCESSCODE LIKE ? OR
        PRODUCT_CODE LIKE ?
    `,
    values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
  });
  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  // 페이지별 데이터 조회
  const result = await sql({
    query: `
      SELECT *
      FROM STOCK 
      WHERE 
        PRODUCT_FULLNAME LIKE ? OR
        PROCESSCODE LIKE ? OR
        PRODUCT_CODE LIKE ?
      ORDER BY DATE DESC
      LIMIT ? OFFSET ?
    `,
    values: [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, limit, offset]
  });

  return {
    data: result,
    totalPages,
    currentPage: page
  };
};
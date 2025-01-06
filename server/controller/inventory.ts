import { H3Event, createError } from 'h3';
import * as InventoryModel from '~~/server/model/inventory';

export const getInventory = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getInventory();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const getStockFromInventory = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getStockFromInventory();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const getAllProducts = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getAllProducts();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const stockRegister = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await InventoryModel.stockRegister(body);
    return { data: result };
  } catch (err) {
    console.error('Error creating stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const stockRegisterFromBarcode = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await InventoryModel.stockRegisterFromBarcode(body);
    return { data: result };
  } catch (err) {
    console.error('Error creating stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const getStock = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getStock();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const getProductionStockAll = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getProductionStock();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const getProductionStock = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getProductionStock();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const productionDeliveryList = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.productionDeliveryList();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const getStockChart = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getStockChart();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const getDeliveryChart = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getDeliveryChart();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const stockRemove = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.stockRemove(evt.context.params?.NO as string);
    return { data: result };
  } catch (err) {
    console.error('Error removing stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const getDelivery = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.getDelivery();
    return { data: result };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
  }
};

export const deliveryRegister = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await InventoryModel.deliveryRegister(body);
    return { data: result };
  } catch (err) {
    console.error('Error creating stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const StockFromDeliveryRegister = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await InventoryModel.StockFromDeliveryRegister(body);
    return { data: result };
  } catch (err) {
    console.error('Error creating stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const productionDelivery = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await InventoryModel.productionDelivery(body);
    return { data: result };
  } catch (err) {
    console.error('Error creating stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const deliveryRemove = async (evt: H3Event) => {
  try {
    const result = await InventoryModel.deliveryRemove(evt.context.params?.NO as string);
    return { data: result };
  } catch (err) {
    console.error('Error removing stock:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const getPagedInventory = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 20;

    console.log('Fetching paged inventory:', { page, pageSize });
    const result = await InventoryModel.getPagedInventory(page, pageSize);
    console.log('Fetched inventory data:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in getPagedInventory:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inventory data'
    });
  }
};

export const getInventoryByDate = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const startDate = query.startDate as string;
    const endDate = query.endDate as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Start date and end date are required'
      });
    }

    console.log('Fetching inventory by date:', { startDate, endDate, page, limit });
    const result = await InventoryModel.getInventoryByDate(startDate, endDate, page, limit);
    console.log('Fetched inventory data:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in getInventoryByDate:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inventory data by date'
    });
  }
};

export const searchInventory = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const searchTerm = query.searchTerm as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    if (!searchTerm) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Search term is required'
      });
    }

    console.log('Searching inventory:', { searchTerm, page, limit });
    const result = await InventoryModel.searchInventory(searchTerm, page, limit);
    console.log('Search results:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in searchInventory:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search inventory'
    });
  }
};

export const getPagedStockFromDelivery = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 20;
    
    console.log('Fetching paged stock from delivery:', { page, pageSize });
    const result = await InventoryModel.getPagedStockFromDelivery(page, pageSize);
    console.log('Fetched stock from delivery data:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });
    
    return result;
  } catch (error) {
    console.error('Error in getPagedStockFromDelivery:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stock from delivery data'
    });
  }
};
export const getPagedStock = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 20;
    
    console.log('Fetching paged stock from delivery:', { page, pageSize });
    const result = await InventoryModel.getPagedStock(page, pageSize);
    console.log('Fetched stock from delivery data:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });
    
    return result;
  } catch (error) {
    console.error('Error in getPagedStockFromDelivery:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stock from delivery data'
    });
  }
};

export const getStockFromDeliveryByDate = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const startDate = query.startDate as string;
    const endDate = query.endDate as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Start date and end date are required'
      });
    }

    console.log('Fetching stock from delivery by date:', { startDate, endDate, page, limit });
    const result = await InventoryModel.getStockFromDeliveryByDate(startDate, endDate, page, limit);
    console.log('Fetched stock from delivery data:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in getStockFromDeliveryByDate:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stock from delivery data by date'
    });
  }
};
export const getStockByDate = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const startDate = query.startDate as string;
    const endDate = query.endDate as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Start date and end date are required'
      });
    }

    console.log('Fetching stock from delivery by date:', { startDate, endDate, page, limit });
    const result = await InventoryModel.getStockByDate(startDate, endDate, page, limit);
    console.log('Fetched stock from delivery data:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in getStockFromDeliveryByDate:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stock from delivery data by date'
    });
  }
};

export const searchStockFromDelivery = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const searchTerm = query.searchTerm as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    if (!searchTerm) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Search term is required'
      });
    }

    console.log('Searching stock from delivery:', { searchTerm, page, limit });
    const result = await InventoryModel.searchStockFromDelivery(searchTerm, page, limit);
    console.log('Search results:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in searchStockFromDelivery:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search stock from delivery'
    });
  }
};
export const searchStockFrom = async (event: H3Event) => {
  try {
    const query = getQuery(event);
    const searchTerm = query.searchTerm as string;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    if (!searchTerm) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Search term is required'
      });
    }

    console.log('Searching stock from delivery:', { searchTerm, page, limit });
    const result = await InventoryModel.searchStockFrom(searchTerm, page, limit);
    console.log('Search results:', { 
      totalPages: result.totalPages, 
      currentPage: result.currentPage,
      dataLength: result.data.length 
    });

    return result;
  } catch (error) {
    console.error('Error in searchStockFromDelivery:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search stock from delivery'
    });
  }
};
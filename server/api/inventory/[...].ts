import { useBase, createRouter, defineEventHandler } from 'h3';
import * as inventoryCtrl from '~/server/controller/inventory';

const router = createRouter();

// 페이징된 재고 목록 조회
router.get('/inventory/getPagedInventory', defineEventHandler(inventoryCtrl.getPagedInventory));

// 날짜 범위로 재고 검색
router.get('/inventory/getInventoryByDate', defineEventHandler(inventoryCtrl.getInventoryByDate));

// 검색어로 재고 검색
router.get('/inventory/searchInventory', defineEventHandler(inventoryCtrl.searchInventory));

router.get('/inventory/getinventory', defineEventHandler(inventoryCtrl.getInventory));
router.get('/inventory/getStockFromInventory', defineEventHandler(inventoryCtrl.getStockFromInventory));
router.get('/inventory/products', defineEventHandler(inventoryCtrl.getAllProducts));
router.get('/inventory/stock', defineEventHandler(inventoryCtrl.getStock));
router.get('/inventory/productionStockAll', defineEventHandler(inventoryCtrl.getProductionStockAll));
router.get('/inventory/productionStock', defineEventHandler(inventoryCtrl.getProductionStock));
router.get('/inventory/productionDeliveryList', defineEventHandler(inventoryCtrl.productionDeliveryList));
router.post('/inventory/productionDelivery', defineEventHandler(inventoryCtrl.productionDelivery));
router.get('/inventory/getStockChart', defineEventHandler(inventoryCtrl.getStockChart));
router.get('/inventory/getDeliveryChart', defineEventHandler(inventoryCtrl.getDeliveryChart));
router.get('/inventory/delivery', defineEventHandler(inventoryCtrl.getDelivery));
router.post('/inventory/stock', defineEventHandler(inventoryCtrl.stockRegister));
router.post('/inventory/stockRegisterFromBarcode', defineEventHandler(inventoryCtrl.stockRegisterFromBarcode));
router.post('/inventory/delivery', defineEventHandler(inventoryCtrl.deliveryRegister));
router.post('/inventory/StockFromDelivery', defineEventHandler(inventoryCtrl.StockFromDeliveryRegister));
router.delete('/inventory/stock/:NO', defineEventHandler(inventoryCtrl.stockRemove));
router.delete('/inventory/delivery/:NO', defineEventHandler(inventoryCtrl.deliveryRemove));

// stockFromDelivery 페이징 라우트
router.get('/inventory/getPagedStockFromDelivery', defineEventHandler(inventoryCtrl.getPagedStockFromDelivery));
router.get('/inventory/getStockFromDeliveryByDate', defineEventHandler(inventoryCtrl.getStockFromDeliveryByDate));
router.get('/inventory/searchStockFromDelivery', defineEventHandler(inventoryCtrl.searchStockFromDelivery));

router.get('/inventory/getPagedStock', defineEventHandler(inventoryCtrl.getPagedStock));
router.get('/inventory/getStockByDate', defineEventHandler(inventoryCtrl.getStockByDate));
router.get('/inventory/searchStockFrom', defineEventHandler(inventoryCtrl.searchStockFrom));
export default useBase('/api', router.handler);
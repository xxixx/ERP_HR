import { useBase, createRouter, defineEventHandler } from 'h3';
import * as scannedBarcodesCtl from '~~/server/controller/scannedBarcodes';

const router = createRouter();
// 단일 바코드 저장 API
// router.post('/scannedBarcode', defineEventHandler(scannedBarcodesCtl.saveScannedBarcode));

// 여러 바코드 저장 API
// router.post('/scannedBarcodes', defineEventHandler(scannedBarcodesCtl.saveScannedBarcodes));

export default useBase('/api', router.handler);
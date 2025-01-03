import { useBase, createRouter, defineEventHandler } from 'h3';
import * as barcodeCtrl from '~/server/controller/barcode';
import * as scannedBarcodesCtl from '~~/server/controller/scannedBarcodes';

const router = createRouter();

router.get('/barcode/Barcodecount/:processCode', defineEventHandler(barcodeCtrl.getBarcodecount));
router.get('/barcode/getScannedBarcodecount/:processCode', defineEventHandler(barcodeCtrl.getScannedBarcodecount));
router.post('/barcode/BarcodecountRegister', defineEventHandler(barcodeCtrl.BarcodecountRegister));
router.put('/barcode/:productCode', defineEventHandler(barcodeCtrl.updateLastSerialNumber));
router.post('/barcode/BarcodeScanRegister', defineEventHandler(barcodeCtrl.BarcodeScanRegister));
router.get('/barcode/getLatestBoxNumber', defineEventHandler(scannedBarcodesCtl.getLatestBoxNumber));
//바코드중복체크
router.get('/barcode/checkDuplicate/:barcode', defineEventHandler(scannedBarcodesCtl.checkDuplicate));
// 단일 바코드 저장 API
router.post('/barcode/scannedBarcode', defineEventHandler(scannedBarcodesCtl.saveScannedBarcode));
// 여러 바코드 저장 API
router.post('/barcode/scannedBarcodes', defineEventHandler(scannedBarcodesCtl.saveScannedBarcodes));
export default useBase('/api', router.handler);
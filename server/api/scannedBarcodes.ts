import { useBase, createRouter, defineEventHandler } from 'h3';
import * as scannedBarcodesCtl from '~~/server/controller/scannedBarcodes';

const router = createRouter();

// router.post('/scannedBarcode', defineEventHandler(scannedBarcodesCtl.saveScannedBarcode));
// router.post('/scannedBarcodes', defineEventHandler(scannedBarcodesCtl.saveScannedBarcodes));
export default useBase('/api', router.handler);
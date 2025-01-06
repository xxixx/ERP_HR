import { H3Event } from 'h3';
import * as ScannedBarcode from '~~/server/model/ScannedBarcode';

export const saveScannedBarcode = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await ScannedBarcode.saveScannedBarcode({
      BARCODE: body.barcode,
      CREATE_DATE: body.date,
      PROCESS_CODE: body.processCode
    });

    if (result.error) {
      evt.res.statusCode = 400;
      evt.res.end(JSON.stringify({ error: result.error }));
    } else {
      evt.res.statusCode = 200;
      evt.res.end(JSON.stringify({ success: true }));
    }
  } catch (err) {
    console.error('Error creating saveScannedBarcode post', err);
    evt.res.statusCode = 500;
    evt.res.end(JSON.stringify({ error: 'Something went wrong' }));
  }
};

export const saveScannedBarcodes = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await ScannedBarcode.saveScannedBarcodes({
      barcodes: body.barcodes,
      CREATE_DATE: body.date,
      PROCESS_CODE: body.processCode
    });

    if (result.error) {
      evt.res.statusCode = 400;
      evt.res.end(JSON.stringify({ error: result.error }));
    } else {
      evt.res.statusCode = 200;
      evt.res.end(JSON.stringify({ success: true }));
    }
  } catch (err) {
    console.error('Error creating saveScannedBarcodes posts', err);
    evt.res.statusCode = 500;
    evt.res.end(JSON.stringify({ error: 'Something went wrong' }));
  }
};




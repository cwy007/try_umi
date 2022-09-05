/* eslint-disable import/prefer-default-export */
import { message } from 'antd';
import JsBarcode from 'jsbarcode';
import { BarcodeFormat, OnBarcodeError } from './type';

export function textToBase64Barcode(
  text: string,
  format?: BarcodeFormat,
  onError?: OnBarcodeError,
) {
  const canvas = document.createElement('canvas');
  try {
    let newText = text;
    if (format === 'EAN8') {
      newText = newText.slice(0, 7);
    } else if (format === 'EAN13') {
      newText = newText.slice(0, 12);
    } else if (format === 'UPC') {
      newText = newText.slice(0, 11);
    }
    // 生成的条形码过大，会导致在流转卡打印等项目中点击打印后出现的系统打印页面中变形，修改这一块时请注意。
    JsBarcode(canvas, newText, {
      margin: 0,
      displayValue: false,
      // width: 280,
      // height: 50,
      format,
      flat: true,
    });
  } catch (e) {
    if (onError) {
      onError(format || 'CODE128');
    } else {
      message.error('条形码文字不符合条件！');
    }
  }

  return canvas.toDataURL('image/png');
}

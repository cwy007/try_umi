import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import cs from 'classnames';
import Node from './Node';
import { QRCodeBoardProps } from './type';
import styles from './index.less';
import { textToBase64Barcode } from './utils';

const QRCodeBoard = ({
  qrCode,
  mode,
  value,
  activeNode,
  onChange,
  onChangeActive,
  closeHelpLine,
  onBarcodeError,
  openAutoAlignment = true,
}: QRCodeBoardProps) => {
  if (!value) {
    return null;
  }
  const isEditing = mode === 'edit';
  const { size, qrCode: qrCodePosition, barcode, nodes } = value;

  const openQRCode = Boolean(qrCode && qrCodePosition);
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  useEffect(() => {
    if (openQRCode) {
      const opts = {
        errorCorrectionLevel: 'L',
        type: 'image/png',
        quality: 0.1,
        margin: 0,
        color: {
          dark: '#000',
        },
      };
      QRCode.toDataURL(qrCode || 'default', opts, (err, url) => {
        if (err) throw err;
        setQRCodeUrl(url);
      });
    }
  }, [qrCode, openQRCode]);

  const barcodeText = barcode && barcode.text;
  const barcodeFormat = barcode && barcode.format;
  const barcodeUrl = useMemo(
    () =>
      barcodeText &&
      textToBase64Barcode(barcodeText, barcodeFormat, onBarcodeError),
    [barcodeText, barcodeFormat],
  );

  return (
    <div
      className={cs(
        styles.qrCodeBoard,
        isEditing && !closeHelpLine ? styles.isEditing : styles.isDisplay,
      )}
      style={{ width: `${size.width}mm`, height: `${size.height}mm` }}
    >
      {openQRCode && (
        <Node
          mode={mode}
          position={qrCodePosition!}
          onChange={(v) => {
            Object.assign(qrCodePosition, v);
            if (onChange) {
              onChange(value);
            }
          }}
          options={{
            ratio: 1,
          }}
          openAutoAlignment={openAutoAlignment}
        >
          <div className={styles.qrCodeWrap}>
            <img src={qrCodeUrl} alt={qrCode} />
          </div>
        </Node>
      )}
      {barcodeText && (
        <Node
          mode={mode}
          position={barcode as any}
          onChange={(v) => {
            Object.assign(barcode, v);
            if (onChange) {
              onChange(value);
            }
          }}
          openAutoAlignment={openAutoAlignment}
        >
          <div className={styles.qrCodeWrap}>
            <img src={barcodeUrl} alt={qrCode} />
          </div>
        </Node>
      )}

      {nodes.map((item) => (
        <Node
          mode={mode}
          key={item.id}
          position={item}
          node={item}
          isActive={activeNode && item.id === activeNode.id}
          onChange={(v) => {
            Object.assign(item, v);
            if (onChange) {
              onChange(value);
            }
          }}
          onChangeActive={onChangeActive}
          style={item.style}
          openAutoAlignment={openAutoAlignment}
        >
          <span
            style={{
              fontSize: item.fontSize,
              wordBreak: 'break-all',
            }}
          >
            {item.text}
          </span>
        </Node>
      ))}
    </div>
  );
};

export * from './type';

export default QRCodeBoard;

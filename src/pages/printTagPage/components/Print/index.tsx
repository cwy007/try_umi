/*
 * 调用window.print()后，打印预览中显示的内容
 */
import React from 'react';
// import { QRCodeBoard } from '@newcore/newcore-ui';
// import { TagPrintTemplateType } from '@/common/types/printTag';
import WindowPrintContainer from './WindowPrintContainer';
import './print.less';
import QRCodeBoard from '../QRCodeBoard';
import { TagPrintTemplateType } from '../../types';

const Print = ({ templates }: { templates: TagPrintTemplateType[] }) => (
  <WindowPrintContainer>
    <table className="printStyle">
      <tbody>
        <tr>
          <td>
            {templates.map((template) => (
              <QRCodeBoard
                key={template.qrCodeValue}
                qrCode={template.qrCodeValue}
                value={template.value}
              />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  </WindowPrintContainer>
);

export default Print;

import { QRCodeBoardValue } from '../components/QRCodeBoard';

type ID = number | string;

export interface ProcurementParamsType {
  itemSpecifications?: string[] | [];
  type?: string;
  recordId?: string;
  batchId?: string;
  attributes?: string[];
}

export interface ExtendParamsType extends ProcurementParamsType {
  workshop?: {
    id: ID;
    name: string;
  };
}

// export interface QRCodeBoardValue {
//   size: Size & {
//       type?: 'fixed' | 'custom';
//   };
//   qrCode?: Position;
//   barcode?: BarcodeNode;
//   nodes: Node[];
// }

export interface AttrChildNode {
  text: string;
  top: number;
  left: number;
  width: number;
  height: number;
  fontSize: number;
}

export interface AttrNodeExtend {
  selected?: string[];
  children?: AttrChildNode[];
}

export type AttrNode = Node & AttrNodeExtend;

export type NodeExtend = Node | AttrNode;

export interface QRCodeBoardValueExtend extends QRCodeBoardValue {
  nodes: NodeExtend[];
}

export interface TagPrintTemplateType {
  qrCodeValue: string;
  extendParams?: ExtendParamsType;
  value: QRCodeBoardValueExtend;
  openAutoAlignment: boolean;
}

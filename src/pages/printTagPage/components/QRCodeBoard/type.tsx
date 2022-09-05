interface Size {
  width: number;
  height: number;
}

export interface Position extends Size {
  left: number;
  top: number;
  style?: React.CSSProperties;
}

type ID = number | string;

export interface Node extends Position {
  id: ID;
  text: string;
  fontSize: number;
  type?: 'label' | 'custom' | 'value';
  style?: React.CSSProperties;
}

export type BarcodeFormat = 'CODE39' | 'CODE128' | 'EAN8' | 'EAN13' | 'UPC';

export interface BarcodeNode extends Position {
  text: string;
  format?: BarcodeFormat;
}

export interface QRCodeBoardValue {
  size: Size & {
    type?: 'fixed' | 'custom';
  }; // QRCodeBoard 编辑区域或显示区域的大小，这里的单位为 mm
  qrCode?: Position;
  barcode?: BarcodeNode;
  nodes: Node[]; // 除二维码外其他的 node
}

export type OnBarcodeError = (format: BarcodeFormat) => void;

export interface QRCodeBoardProps {
  qrCode?: string; // 用于生成二维码
  closeHelpLine?: boolean;
  mode?: 'display' | 'edit'; // 默认 display
  // defaultValue?: QRCodeBoardValue;
  value: QRCodeBoardValue;
  onChange?: (value: QRCodeBoardValue) => void;
  activeNode?: Node;
  onChangeActive?: (node: Node) => void;
  onBarcodeError?: OnBarcodeError;
  openAutoAlignment?: boolean; // 是否开启拖动时自动吸附对齐
}

export interface InteractNodeOptions {
  ratio?: number | 'preserve'; // 缩放时是否固定宽高的比例
}

export interface InteractNodeProps {
  children: React.ReactNode;
  position: Position;
  onChange?: (value: Position) => void;
  options?: InteractNodeOptions;
  isActive?: boolean;
  node?: Node;
  onChangeActive?: (node: Node) => void;
  openAutoAlignment?: boolean; // 拖动元素时是否自动吸附
}

// 没有 default，该文件不会被 build
export default () => {};

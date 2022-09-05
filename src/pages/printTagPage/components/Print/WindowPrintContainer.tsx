/*
 * 打印预览元素的挂载点
 */
import { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

let printTagRoot = document.getElementById('print-transfer-root') as HTMLElement;
if (printTagRoot) {
  printTagRoot.innerHTML = '';
} else {
  printTagRoot = document.createElement('div');
  printTagRoot.id = 'print-transfer-root';
  document.body.append(printTagRoot);
}

const PrintContainer = (props: { children: ReactNode }) => {
  const el = document.createElement('div');

  useEffect(() => {
    printTagRoot.appendChild(el);
    return () => {
      printTagRoot.removeChild(el);
    };
  });

  return ReactDOM.createPortal(props.children, el);
};

export default PrintContainer;

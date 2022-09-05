/*
 * @Author: Duan | duan.he@xinheyun.com
 * @Date: 2020-05-13 11:02:18
 * @Last Modified by: Duan
 * @Last Modified time: 2020-05-13 11:05:06
 */
import { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

let printTagRoot = document.getElementById('print-transfer-root');
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

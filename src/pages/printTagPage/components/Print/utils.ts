// import { TagPrintTemplateType } from '@/common/types/printTag';
import { TagPrintTemplateType } from "../../types";

export const updatePrintSize = (template: TagPrintTemplateType) => {
  const size = template && template.value ? template.value.size : undefined;
  if (!size) {
    return;
  }
  const printCssText = `
    @media print {
      @page {
        size: ${size.width}mm  ${size.height + 0.4}mm;
      }
    }
    `;
  let printStyleElement = document.body.querySelector('#printStyle');
  if (printStyleElement) {
    printStyleElement.innerHTML = printCssText;
  } else {
    printStyleElement = document.createElement('style');
    printStyleElement.id = 'printStyle';
    // printStyleElement.type = 'text/css';
    printStyleElement.innerHTML = printCssText;
    document.body.append(printStyleElement);
  }
};

import { Form, FormInstance } from 'antd';
import { createContext } from 'react';

export const EditableContext = createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

// 剩余属性 ...props 在解构赋值中的使用
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    // component 设置 Form 渲染元素，为 false 则不创建 DOM 节点
    <Form form={form} component={false}>
      {/* 每一行都有一个对应的 form 实例可以用 */}
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;

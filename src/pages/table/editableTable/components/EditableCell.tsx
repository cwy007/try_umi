import { Form, Input } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { EditableContext } from './EditableRow';

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

// Cell 的 props 是 column 中 onCell 函数设置的
const EditableCell: React.FC<EditableCellProps> = ({
  title, // 来源为 columns 中配置配置的内容
  editable, // 来源为 columns 中配置配置的内容
  children, // dataIndex 后 render 方法返回的内容
  dataIndex, // 来源为 columns 中配置配置的内容
  record, // onCell 的第一个参数，row 对应的数据
  handleSave, // 自定义函数，参数为编辑后的行数据，替换 dataSource 中对应的对象
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!; // ! 断言值一定存在

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus(); // 鼠标聚焦
    }
  }, [editing]);

  // 编辑开关
  const toggleEdit = () => {
    setEditing(!editing); // 切换cell的编辑状态
    form.setFieldsValue({ [dataIndex]: record[dataIndex] }); // 设定 input 框的值
  };

  const save = async () => {
    try {
      const values = await form.validateFields(); // 对 input 框中的值做验证

      toggleEdit(); // 切换编辑状态
      handleSave({ ...record, ...values }); // 保存数据
    } catch (errInfo) {
      console.log('Save failed:', errInfo); // 数据验证失败，打印log
    }
  };

  let childNode = children;

  // 编辑状态显示 Input
  // 非编辑状态显示 div
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;

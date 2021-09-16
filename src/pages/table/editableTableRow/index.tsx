import { Table, Button, Popconfirm, Form, Typography } from 'antd';
import EditableCell from './components/EditableCell';
import './index.less';
import React, { useState } from 'react';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

// 路由组件
const EditableTable = () => {
  const [form] = Form.useForm(); // form 实例，设置输入框的值
  const [data, setData] = useState(originData); // table 数据源
  const [editingKey, setEditingKey] = useState(''); // 正在编辑的行的 key

  // 判断行 record 是否在编辑中
  const isEditing = (record: Item) => record.key === editingKey;

  // 设置form fields 的值，每次只会显示三个字段 name, age, address
  // 设置状态变量 editingKey
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  // cancel 时将状态变量 editKey 清空，表示没有表格行处于编辑状态
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      // validateFields 触发表单验证，返回form字段的值
      const row = (await form.validateFields()) as Item; // ts 类型断言

      const newData = [...data]; // table 数据源
      const index = newData.findIndex((item) => key === item.key); // 当前编辑的行索引
      if (index > -1) {
        // 修改操作
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(''); // 清空编辑态
      } else {
        newData.push(row); // 新增操作
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true, // 合并列配置 onCell，单元格属性
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record); // 当前行是否处于编辑状态 - 显示不同按钮
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      // 配置单元格属性
      onCell: (record: Item) => ({
        record, // 行数据
        inputType: col.dataIndex === 'age' ? 'number' : 'text', // 输入框的类型
        dataIndex: col.dataIndex, // 字段名称
        title: col.title, // 使用：表单验证时的错误提示信息中
        editing: isEditing(record), // 判断当前数据 record 是否处于编辑状态
      }),
    };
  });

  return (
    // component 为 false 时不会在浏览器上真正渲染 form 元素
    <Form form={form} component={false}>
      <Table
        // 替换 table 的内部组件
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered // 显示边框
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel, // 清空编辑状态
          pageSize: 5, // 每页显示 5 条数据
        }}
      />
    </Form>
  );
};

EditableTable.title = '可编辑行';
export default EditableTable;

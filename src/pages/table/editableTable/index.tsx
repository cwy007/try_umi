import { Table, Button, Popconfirm } from 'antd';
import EditableRow from './components/EditableRow';
import EditableCell from './components/EditableCell';
import './index.less';
import React, { useState } from 'react';

const data = [
  {
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: '32',
    address: 'London, Park Lane no. 1',
  },
];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableTable = () => {
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState<DataType[]>(data);

  let columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      // 是否可编辑
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key: React.Key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columnsMap = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      // 设置单元格属性
      onCell: (record: DataType) => ({
        record, // row 对应的数据
        editable: col.editable, // 配置内容
        dataIndex: col.dataIndex, // 配置内容
        title: col.title, // 配置内容
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>

      <Table
        // 覆盖默认的 table 元素
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        // 表格行的类名
        rowClassName={() => 'editable-row'}
        bordered
        // 数据数组
        dataSource={dataSource}
        columns={columnsMap as ColumnTypes}
      />
    </div>
  );
};

EditableTable.title = '可编辑单元格';
export default EditableTable;

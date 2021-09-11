/**
 * 点击整行时选中数据的示例
 */
import React, { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const SpecialRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    [],
  );

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a href="#">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const selectRow = (record: any) => {
    const cpSelectedRowKeys = [...selectedRowKeys];
    if (cpSelectedRowKeys.indexOf(record.key) >= 0) {
      cpSelectedRowKeys.splice(cpSelectedRowKeys.indexOf(record.key), 1);
    } else {
      cpSelectedRowKeys.push(record.key);
    }
    setSelectedRowKeys(cpSelectedRowKeys);
  };

  const onSelectedRowKeysChange = (keys: any[]) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
    // hideSelectAll: true, // 全选按钮
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      onRow={(record) => ({
        onClick: () => {
          selectRow(record);
        },
      })}
    />
  );
};

export default SpecialRowSelection;

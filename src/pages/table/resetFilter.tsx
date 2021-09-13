import { Table, Button, Space, Typography } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { useState } from 'react';
const { Title, Paragraph, Text, Link } = Typography;

const data = [
  {
    key: '1',
    name: 'John Brown'.repeat(10),
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
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const resetFilter = () => {
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [filteredInfo, setFilteredInfo] = useState<any>({});

  const handleChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name, // 受控模式：过滤
      onFilter: (value, record) => record.name.includes(value), // 过滤条件
      sorter: (a, b) => a.name.length - b.name.length, // 排序条件
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order, // 受控模式：排序
      ellipsis: true, // 内容过多时会显示省略号 ...
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      ellipsis: true,
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />

      <Typography>
        <Paragraph>
          使用受控属性对筛选和排序状态进行控制。
          <blockquote>
            1. columns 中定义了 filteredValue 和 sortOrder 属性即视为受控模式。
            <br />
            2. 只支持同时对一列进行排序，请保证只有一列的 sortOrder
            属性是生效的。
            <br />
            3. 务必指定 column.key。
          </blockquote>
        </Paragraph>
      </Typography>
    </>
  );
};

resetFilter.title = '可控的筛选和排序';
export default resetFilter;

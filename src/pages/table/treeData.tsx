import { Table, Switch, Space, Typography, Divider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import { useState } from 'react';
const { Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    // React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
// rowSelection 对象指定行选择时所需的内容
// 选择功能的配置。
const rowSelection: TableRowSelection<any> = {
  // 选中项发生变化时的回调
  onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  // 用户手动选择/取消选择某行的回调
  onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
    console.log(
      'record, selected, selectedRows',
      record,
      selected,
      selectedRows,
    );
  },
  // 用户手动选择/取消选择所有行的回调
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    console.log(
      'selected, selectedRows, changeRows',
      selected,
      selectedRows,
      changeRows,
    );
  },
};

function TreeData() {
  const [checkStrictly, setCheckStrictly] = useState(false);
  console.log(checkStrictly);

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        CheckStrictly:{' '}
        <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        // checkStrictly checkable 状态下节点选择完全受控
        // checkStrictly为 true 时（父子数据选中状态不再关联）
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />

      <Divider>树形数据展示</Divider>
      <Typography>
        <Paragraph>
          表格支持树形数据的展示，当数据中有 <Text code>children</Text>
          字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用
          <Text code>childrenColumnName</Text> 进行配置。 <br />
          可以通过设置
          <Text code>indentSize</Text> 以控制每一层的缩进宽度。
        </Paragraph>
      </Typography>
    </>
  );
}

TreeData.title = '树形数据展示';
export default TreeData;

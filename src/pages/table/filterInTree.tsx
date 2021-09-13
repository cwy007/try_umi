import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Title, Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    filterMode: 'tree', // 4.17.0
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    // width: '30%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    // width: '40%',
  },
];

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
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const filterInTree = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />

      <Typography>
        <Paragraph>
          可以使用 <Text code>filterMode</Text> 来修改筛选菜单的 UI，可选值有
          <Text code>menu</Text>（默认）和 <Text code>tree</Text>。
          <blockquote>
            <Text code>filterSearch</Text> 用于开启筛选项的搜索。
          </blockquote>
        </Paragraph>
      </Typography>
    </div>
  );
};

filterInTree.title = '树形筛选菜单';
export default filterInTree;

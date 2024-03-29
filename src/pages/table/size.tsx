import { Table, Typography } from 'antd';
const { Paragraph, Text, Link } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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
];

const size = () => {
  return (
    <div>
      <h4>Middle size table</h4>
      <Table columns={columns} dataSource={data} size="middle" />
      <h4>Small size table</h4>
      <Table columns={columns} dataSource={data} size="small" />
      <Typography>
        <Paragraph>两种紧凑型的列表，小型列表只用于对话框内。</Paragraph>
      </Typography>
    </div>
  );
};

size.title = '紧凑型';
export default size;

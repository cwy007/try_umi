import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
    align: 'right',
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
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

const bordered = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
      <Typography>
        <Paragraph>添加表格边框线，页头和页脚。</Paragraph>
      </Typography>
    </div>
  );
};

bordered.title = '带边框';
export default bordered;

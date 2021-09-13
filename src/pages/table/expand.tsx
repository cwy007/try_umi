import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Paragraph, Text, Link } = Typography;

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

const expand = () => {
  return (
    <div>
      <Table
        // 列描述
        columns={columns}
        // 配置展开属性
        expandable={{
          // 额外的展开行
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          // 设置是否允许行展开
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        // 数据数组
        dataSource={data}
      />
      <Typography>
        <Paragraph>当表格内容较多不能一次性完全展示时。</Paragraph>
      </Typography>
    </div>
  );
};

expand.title = '可展开';
export default expand;

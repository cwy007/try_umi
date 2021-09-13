import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Title, Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3, // 值越大权重越大，优先按照值大的列排序
    },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const multipleSorter = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />

      <Typography>
        <Paragraph>
          <Text code>column.sorter</Text> 支持
          <Text code>multiple</Text>
          字段以配置多列排序优先级。通过
          <Text code>sorter.compare</Text>
          配置排序逻辑，你可以通过不设置该函数只启动多列排序的交互形式。
        </Paragraph>
      </Typography>
    </div>
  );
};

multipleSorter.title = '多列排序';
export default multipleSorter;
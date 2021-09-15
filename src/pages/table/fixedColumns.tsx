import { Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    // （IE 下无效）列是否固定，可选 true (等效于 left) left right
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];

const fixedHeader = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        // scroll 表格是否可滚动，也可以指定滚动区域的宽、高，配置项
        // scrollToFirstRowOnChange 当分页、排序、筛选变化后是否滚动到表格顶部
        // x 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content'
        // y 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值
        scroll={{ x: 1300 }}
      />

      <Typography>
        <Divider orientation="left">固定列</Divider>
        <Paragraph>
          对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和
          <Text code>scroll.x</Text> 配合使用。
          <br />
          <blockquote>
            若列头与内容不对齐或出现列重复，请指定固定列的宽度 width。
            <br />
            如果指定 width
            不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
            <br />
            建议指定 scroll.x
            为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过
            scroll.x。
          </blockquote>
          <Text strong>
            注意：v4 版本固定列通过 sticky 实现，IE 11 会降级成横向滚动。
          </Text>
        </Paragraph>
      </Typography>
    </div>
  );
};

export default fixedHeader;

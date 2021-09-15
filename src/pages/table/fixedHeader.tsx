import { Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  // 留一列不设定宽度，以适应弹性布局
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const fixedHeader = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        // pageSize 每页条数
        pagination={{ pageSize: 50 }}
        // scroll 表格是否可滚动，也可以指定滚动区域的宽、高，配置项
        // scrollToFirstRowOnChange 当分页、排序、筛选变化后是否滚动到表格顶部
        // x 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content'
        // y 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值
        scroll={{ y: 240 }}
      />

      <Typography>
        <Divider orientation="left">固定表头</Divider>
        <Paragraph>
          方便一页内展示大量数据。 <br />
          需要指定 <Text code>column</Text> 的 <Text code>width</Text>
          属性，否则列头和内容可能不对齐。如果指定 <Text code>width</Text>
          不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
        </Paragraph>
      </Typography>
    </div>
  );
};

fixedHeader.title = '固定头';
export default fixedHeader;

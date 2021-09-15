import { Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Paragraph, Text, Link } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    // （IE 下无效）列是否固定，可选 true (等效于 left) left right
    fixed: 'left',
    // 表头的筛选菜单项
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    // 本地模式下，确定筛选的运行函数
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，
        // 需要服务端排序可设为 true
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

const groupingColumns = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        // scroll 表格是否可滚动，也可以指定滚动区域的宽、高，配置项
        // scrollToFirstRowOnChange 当分页、排序、筛选变化后是否滚动到表格顶部
        // x 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content'
        // y 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
      />

      <Typography>
        <Divider orientation="left">表头分组</Divider>
        <Paragraph>
          <Text code>columns[n]</Text> 可以内嵌 <Text code>children</Text>
          ，以渲染分组表头。
        </Paragraph>
      </Typography>
    </div>
  );
};

groupingColumns.title = '表头分组';
export default groupingColumns;

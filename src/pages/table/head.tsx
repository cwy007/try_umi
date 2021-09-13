import { Table, Typography } from 'antd';
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';

const { Paragraph, Text } = Typography;

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    // 配置过滤项
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
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
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0, // 配置过滤条件
    sorter: (a, b) => a.name.length - b.name.length, // 配置排序：大于0排在前面
    sortDirections: ['descend'], // 可用的排序方式
    // filterMultiple: false, // 是否多选
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend', // 默认排序
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
    onFilter: (value, record) => {
      // 指定过滤条件
      // value 是指上面filters中选中的 value
      console.log(value, record);
      return record.address.indexOf(value) === 0;
    },
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

/**
 *
 * @param pagination {"current": 1,"pageSize": 10}
 * @param filters {"address": null,"name": [ "Joe"]}
 * @param sorter {"column": {"title": "Age","dataIndex": "age","defaultSortOrder": "descend"},"order": "descend","field": "age"}
 * @param extra
 * // {
//     "currentDataSource": [ // 这是过滤得到的结果
//         {
//             "key": "3",
//             "name": "Joe Black",
//             "age": 32,
//             "address": "Sidney No. 1 Lake Park"
//         }
//     ],
//     "action": "filter" // 这是本次执行的 table action 过滤
// }
 */
const onChange: TableProps<any>['onChange'] = (
  pagination, //
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const head = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />

      <Typography>
        <Paragraph>
          对某一列数据进行筛选，使用列的 <Text code>filters</Text>
          属性来指定需要筛选菜单的列，<Text code>onFilter</Text>
          用于筛选当前数据，<Text code>filterMultiple</Text>
          用于指定多选和单选。
        </Paragraph>
        <Paragraph>
          对某一列数据进行排序，通过指定列的 sorter 函数即可启动排序按钮。
          <Text code>
            sorter: function(rowA, rowB) {'\u007B'} ... {'\u007d'}
          </Text>
          ， rowA、rowB 为比较的两个行数据。
        </Paragraph>
        <Paragraph>
          <Text code>sortDirections: ['ascend' | 'descend']</Text>
          改变每列可用的排序方式，切换排序时按数组内容依次切换，设置在 table
          props 上时对所有列生效。你可以通过设置{' '}
          <Text code>['ascend', 'descend', 'ascend']</Text>
          禁止排序恢复到默认状态。 使用 <Text code>defaultSortOrder</Text>
          属性，设置列的默认排序顺序。
        </Paragraph>
      </Typography>
    </div>
  );
};

head.title = '筛选和排序';
export default head;

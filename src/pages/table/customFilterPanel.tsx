import { Table, Button, Space, Input, Typography } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { useRef, useState } from 'react';
const { Title, Paragraph, Text, Link } = Typography;
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {
  FilterConfirmProps,
  FilterDropdownProps,
} from 'antd/lib/table/interface';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
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

// 同时只有一个搜索框起作用
const customFilterPanel = () => {
  const [searchText, setSearchText] = useState<any>(''); // 搜索的字符串
  const [searchedColumn, setSearchedColumn] = useState(''); // 搜索哪一列
  const searchInputRef = useRef<any>(null);

  const getColumnSearchProps = (dataIndex: string) => ({
    // 搜索下拉框的view
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false }); // 不关闭下拉框
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex); // 表格列column的名称 dataIndex
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),

    // 自定义 filter 图标。
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),

    // 本地模式下，确定筛选的运行函数
    onFilter: (value: any, record: any) => {
      // value 输入框中的值
      // record 表格中每一行对应的数据对象
      console.log('value, record', value, record);

      return record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '';
    },

    //自定义筛选菜单可见变化时调用
    onFilterDropdownVisibleChange: (visible: boolean) => {
      console.log('visible', visible);

      if (visible) {
        setTimeout(() => searchInputRef.current?.select(), 100); // 聚焦
      }
    },

    // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并
    render: (text: any) => {
      // column.render
      console.log('text->', text);

      return searchedColumn === dataIndex ? (
        // Highlighter 为第三方pkg
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]} // 要进行高亮的字段
          autoEscape // 特殊字符自动转义(正则匹配)
          textToHighlight={text ? text.toString() : ''} // 要做高亮处理的字段
        />
      ) : (
        text
      );
    },
  });

  /** search 按钮的回调函数 */
  const handleSearch = (
    selectedKeys: any[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any,
  ) => {
    // confirm({closeDropdown: false});
    confirm(); // 隐藏下拉框
    setSearchText(selectedKeys[0]); // 设置搜索文本
    setSearchedColumn(dataIndex); // 设置当前搜索的字段名称
  };

  /** 重置按钮的回调函数 */
  const handleReset = (clearFilters: (() => void) | undefined) => {
    clearFilters && clearFilters();
    setSearchText('');
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true
      sorter: (a, b) => a.address.length - b.address.length, // 定义排序条件
      // 支持的排序方式，覆盖 Table 中 sortDirections， 取值为 ascend descend
      sortDirections: ['descend', 'ascend'], // 可选的排序
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />

      <Typography>
        <Paragraph>
          通过 <Text code>filterDropdown</Text>{' '}
          自定义的列筛选功能，并实现一个搜索列的示例。
          <br />
          给函数 confirm 添加 boolean 类型参数 <Text code>closeDropdown</Text>
          ，是否关闭筛选菜单，默认为 true。
        </Paragraph>
      </Typography>
    </>
  );
};

customFilterPanel.title = '自定义筛选菜单';
export default customFilterPanel;

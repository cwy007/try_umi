import { Table, Button, Space, Input, Typography } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { useEffect, useRef, useState } from 'react';
const { Title, Paragraph, Text, Link } = Typography;
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {
  FilterConfirmProps,
  FilterDropdownProps,
} from 'antd/lib/table/interface';

const axios = require('axios');

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true, // 服务器端进行排序
    render: (name: any) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    // 服务端过滤
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

/** get 请求的参数 params */
const getRandomuserParams = (params: any) => ({
  results: params.pagination.pageSize, // pageSize
  page: params.pagination.current, // 第几页
  ...params,
});

const ajax = () => {
  const [data, setData] = useState<any[]>([]); // table dataSource
  const [pagination, setPagination] = useState<{ [key: string]: number }>({
    current: 1,
    pageSize: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch({ pagination });
  }, []);

  // Table.onChange
  const handleTableChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    console.log('sorter', sorter);
    // 排序，分页，过滤
    fetch({
      sortField: sorter.field, // 排序的字段名
      sortOrder: sorter.order, // 排序方式
      pagination,
      ...filters, // 过滤
    });
  };

  const fetch = (params = {}) => {
    console.log('params', params);

    setLoading(true);
    axios({
      url: 'https://randomuser.me/api',
      method: 'get',
      type: 'json',
      params: getRandomuserParams(params), // get 请求的参数
    }).then((res: any) => {
      console.log(res);
      setLoading(false);
      setData(res.data.results);
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
      setPagination({ ...params?.pagination, total: 200 });
    });
  };

  return (
    <>
      {/* 本地action：对本地数据进行，排序，过滤和分页 */}
      {/* 非本地action：通过接口实现排序，过滤，分页 */}
      <Table
        columns={columns} // 表格定义
        rowKey={(record) => record.login.uuid} // react map key
        dataSource={data} // 数据源
        pagination={pagination}
        loading={loading} // 加载中的状态
        onChange={handleTableChange} // table Action：排序，分页，过滤
      />

      <Typography>
        <Paragraph>
          这个例子通过简单的 ajax
          读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面
          <Text code>loading</Text> 效果。开发者可以自行接入其他数据处理方式。
          <br />
          另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的
          <Text code>onFilter</Text> 和 <Text code>sorter</Text>
          函数，而是在把筛选和排序的参数发到服务端来处理。
          <br />
          当使用 <Text code>rowSelection</Text> 时，请设置{' '}
          <Text code>rowSelection.preserveSelectedRowKeys</Text>
          属性以保留 key。 <br />
          <Text strong>
            注意，此示例使用 <Link href="https://randomuser.me/">模拟接口</Link>
            ，展示数据可能不准确，请打开网络面板查看请求。
          </Text>
          <br />
          <blockquote>🛎️ 想要 3分钟实现？试试 ProTable！</blockquote>
        </Paragraph>
      </Typography>
    </>
  );
};

ajax.title = '远程加载数据';
export default ajax;

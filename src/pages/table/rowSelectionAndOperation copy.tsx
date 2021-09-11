import React, { useState } from 'react';
import { Table, Button, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { times } from 'lodash';

const { Paragraph, Text } = Typography;

const dataItem = {
  key: 0,
  name: `Edward King`,
  age: 32,
  address: `London, Park Lane no.`,
};

const data = times(46, (index) => ({
  ...dataItem,
  key: index,
  name: `${dataItem.name} ${index}`,
  address: `${dataItem.address} ${index}`,
}));

const columns: ColumnsType<any> = [
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

const rowSelectionAndOperation = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]); // Check here to configure the default column
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (keys: (string | number)[]) => {
    console.log('selectedRowKeys changed: ', keys);
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Typography>
        <Paragraph>
          选择后进行操作，完成后清空选择，通过
          <Text code>rowSelection.selectedRowKeys</Text>
          来控制选中项。
        </Paragraph>
      </Typography>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>

        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

// 扩展路由属性
rowSelectionAndOperation.title = '选择和操作';
export default rowSelectionAndOperation;

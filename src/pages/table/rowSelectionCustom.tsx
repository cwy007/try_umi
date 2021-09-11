import React, { useState } from 'react';
import { Table, Button, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { times } from 'lodash';

const { Paragraph, Text } = Typography;

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

const rowSelectionCustom = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]); // Check here to configure the default column

  const onSelectChange = (keys: (string | number)[]) => {
    console.log('selectedRowKeys changed: ', keys);
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (currentRowKeys: any[]) => {
          console.log('currentRowKeys', currentRowKeys);
          let newSelectedRowKeys = [];
          newSelectedRowKeys = currentRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (currentRowKeys: any[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = currentRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />

      <Typography>
        <Paragraph>
          通过 <Text code>rowSelection.selections</Text>{' '}
          自定义选择项，默认不显示下拉选项，设为 true 时显示默认选择项。
        </Paragraph>
      </Typography>
    </div>
  );
};

// 扩展路由属性
rowSelectionCustom.title = '自定义选择项';
export default rowSelectionCustom;

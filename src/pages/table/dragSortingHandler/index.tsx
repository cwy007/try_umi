import { Table } from 'antd';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import React, { useState } from 'react';
import './index.less';

// SortableHandle 高阶组件
// 手柄icon
const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableWrapper = SortableContainer((props: any) => <tbody {...props} />);

const SortableTable = () => {
  const [dataSource, setDataSource] = useState(data);

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource, oldIndex, newIndex).filter(
        (el) => !!el,
      );
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  const DraggableWrapper = (props: any) => (
    <SortableWrapper
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = (props: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === props['data-row-key'],
    );

    // index 属性好像是必须的
    return <SortableItem index={index} {...props} />;
  };

  return (
    <Table
      pagination={false} // 没有分页
      dataSource={dataSource} // 数据源
      columns={columns} // 列配置
      rowKey="index" // 表格行 key 的取值，可以是字符串或一个函数
      components={{
        body: {
          wrapper: DraggableWrapper,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};

SortableTable.title = '拖拽手柄列';
export default SortableTable;

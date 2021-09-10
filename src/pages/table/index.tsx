import React from 'react';
import { Typography, Divider, Card } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Table = () => {
  return (
    <Typography>
      <Title level={4}>何时使用 Table</Title>
      <Paragraph>当有大量结构化的数据需要展现时；</Paragraph>
      <Paragraph>
        当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。
      </Paragraph>
    </Typography>
  );
};

export default Table;

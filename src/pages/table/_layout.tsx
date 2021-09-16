import { Row, Col } from 'antd';
import { NavLink, Prompt, useRouteMatch } from 'umi';
import { Typography, Divider, Card } from 'antd';
import { Fragment } from 'react';

const { Title, Paragraph, Text, Link } = Typography;

const Links = [
  { href: '/table/basic', name: '基本用法' },
  { href: '/table/jsx', name: 'JSX风格的API', span: 3 },
  { href: '/table/rowSelection', name: '可选择' },
  { href: '/table/rowSelectionAndOperation', name: '选择和操作', span: 3 },
  { href: '/table/rowSelectionCustom', name: '自定义选择项', span: 3 },
  { href: '/table/head', name: '筛选和排序', span: 3 },
  { href: '/table/filterInTree', name: '树形筛选菜单' },
  { href: '/table/multipleSorter', name: '多列排序' },
  { href: '', name: 'divider', component: <Divider style={{ margin: 8 }} /> },
  { href: '/table/resetFilter', name: '可控的筛选和排序' },
  { href: '/table/customFilterPanel', name: '自定义筛选菜单' },
  { href: '/table/ajax', name: '远程加载数据' },
  { href: '/table/size', name: '紧凑型' },
  { href: '/table/bordered', name: '带边框' },
  { href: '/table/expand', name: '可展开' },
  { href: '/table/colspanRowspan', name: '表格行/列合并' },
  { href: '/table/treeData', name: '树形数据展示' },
  { href: '', name: 'divider2', component: <Divider style={{ margin: 8 }} /> },
  { href: '/table/fixedHeader', name: '固定表头' },
  { href: '/table/fixedColumns', name: '固定列' },
  { href: '/table/fixedColumnsHeader', name: '固定头和列' },
  { href: '/table/groupingColumns', name: '表头分组' },
  { href: '/table/editableTable', name: '可编辑单元格' },
  { href: '/table/editableTableRow', name: '可编辑行' },
  { href: '/table/nestedTable', name: '嵌套子表格' },
  { href: '/table/DragSorting', name: '拖拽排序' },
];

const TableLayout: React.FC<any> = ({ children }) => {
  return (
    <div className="table-layout">
      <Typography>
        <Paragraph>
          <ul>
            <Row>
              {Links.map(({ href, name, span, component }) =>
                component ? (
                  <Fragment key={name}>{component}</Fragment>
                ) : (
                  <Col span={span || 3} key={name}>
                    <li>
                      <NavLink
                        to={href}
                        style={{
                          borderBottom: '2px solid transparent',
                          paddingBottom: 10,
                          color: 'rgba(0, 0, 0, 0.85)',
                        }}
                        activeStyle={{
                          color: '#1890ff',
                          borderBottom: '2px solid #1890ff',
                          paddingBottom: 10,
                          transition: 'all 0.3s',
                        }}
                      >
                        {name}
                      </NavLink>
                    </li>
                  </Col>
                ),
              )}
            </Row>
          </ul>
        </Paragraph>
      </Typography>
      <Divider style={{ marginTop: -5 }} />
      {children}
    </div>
  );
};

export default TableLayout;

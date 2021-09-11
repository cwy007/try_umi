import { Row, Col } from 'antd';
import { NavLink, Prompt, useRouteMatch } from 'umi';
import { Typography, Divider, Card } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Links = [
  { href: '/table/basic', name: '基本用法' },
  { href: '/table/jsx', name: 'JSX风格的API' },
  { href: '/table/rowSelection', name: '可选择' },
];

const TableLayout: React.FC<any> = ({ children }) => {
  return (
    <div className="table-layout">
      <Typography>
        <Paragraph>
          <ul>
            <Row>
              {Links.map(({ href, name }) => (
                <Col span={4} key={name}>
                  <li>
                    <NavLink
                      to={href}
                      style={{
                        borderBottom: '2px solid transparent',
                        paddingBottom: 25,
                        color: 'rgba(0, 0, 0, 0.85)',
                      }}
                      activeStyle={{
                        color: '#1890ff',
                        borderBottom: '2px solid #1890ff',
                        paddingBottom: 25,
                        transition: 'all 0.3s',
                      }}
                    >
                      {name}
                    </NavLink>
                  </li>
                </Col>
              ))}
            </Row>
          </ul>
        </Paragraph>
      </Typography>
      <Divider />
      {children}
    </div>
  );
};

export default TableLayout;

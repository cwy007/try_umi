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
                    <Link href={href}>{name}</Link>
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

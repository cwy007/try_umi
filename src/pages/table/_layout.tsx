import { Row, Col } from 'antd';
import { NavLink, Prompt, useRouteMatch } from 'umi';

const TableLayout: React.FC<any> = ({ children }) => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <NavLink to="/useToggle">useToggle</NavLink>
        </Col>
        <Col span={6}>
          <NavLink to="/chatUI">chatUI</NavLink>
        </Col>
      </Row>
      {children}
    </div>
  );
};

export default TableLayout;

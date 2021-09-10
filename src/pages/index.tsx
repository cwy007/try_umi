import { Row, Col } from 'antd';
import { NavLink, Prompt, useRouteMatch } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const match = useRouteMatch();
  return (
    <div>
      {/* <Prompt message="你确定要离开么？" /> */}
      {/* 根据一个状态来确定用户离开页面时是否给一个提示选择 */}
      {/* <Prompt when={formIsHalfFilledOut} message="您确定半途而废么？" /> */}
      <ul>
        <li>match: {JSON.stringify(match)}</li>
      </ul>
      <Row>
        <Col span={6}>
          <NavLink to="/useToggle">useToggle</NavLink>
        </Col>
        <Col span={6}>
          <NavLink to="/chatUI">chatUI</NavLink>
        </Col>
      </Row>
    </div>
  );
}

import React, { useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'umi';
import { siderMenuLinks } from '@/localFiles/siderMenu';
import './index.less';
import headerMenu from '@/localFiles/headerMenu';

const { Header, Sider, Content } = Layout;

export default ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const location = useLocation();

  return (
    <Layout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="vertical" selectedKeys={[location.pathname]}>
          {siderMenuLinks.map((link) => (
            <Menu.Item key={link.path}>
              <Link to={link.path}>{link.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col span={20}>
              <span
                className="trigger"
                onClick={toggle}
                style={{ padding: 20 }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </span>
            </Col>

            {headerMenu.map((link) => (
              <Col span={2}>
                <Link key={link.name} to={link.path}>
                  {link.name}
                </Link>
              </Col>
            ))}
          </Row>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

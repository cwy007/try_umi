import React, { useState } from 'react';
import { Layout, Menu, Row, Col, Space, Divider } from 'antd';
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
      <Sider
        trigger={null}
        collapsible
        // collapsed={collapsed}
        style={{ display: collapsed ? 'none' : 'block' }}
      >
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
          <Space split={<Divider type="vertical" />} align="center">
            <span className="trigger" onClick={toggle} style={{ padding: 20 }}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            {headerMenu.map((link) => (
              <Link key={link.name} to={link.path}>
                {link.name}
              </Link>
            ))}
          </Space>
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

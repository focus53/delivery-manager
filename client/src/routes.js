import 'antd/dist/antd.css';
import Calendar from './components/Calendar/Calendar';
import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import AddressDataContainer from './components/AddressData/AddressDataContainer';
import { Col, Divider, Row } from 'antd';
import { connect } from 'react-redux';
import { setAuthenticatedTC, isLoginTC, loginTC, registerTC, logoutTC } from '../src/components/Redux/user-reducer';

import { Layout, Menu } from 'antd';
import { TeamOutlined, ExportOutlined, SettingOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Routes = (props) => {
  useEffect(() => {
    props.isLoginTC();
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  if (props.isAuthenticated) {
    return (
      <Layout>
        <Header>
          <div style={{ width: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            <Divider style={{ border: '#1890ff' }} orientation="center">
              <h2 style={{ color: 'whitesmoke' }}>Delivery manager</h2>
            </Divider>
          </div>
        </Header>
        <Layout style={{ minHeight: '92.5vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<CalendarOutlined />}>
                Calendar
              </Menu.Item>
              <Menu.Item key="2" icon={<HomeOutlined />}>
                Storages
              </Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />}>
                Settings
              </Menu.Item>

              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="4">Team 1</Menu.Item>
                <Menu.Item key="5">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="6" icon={<ExportOutlined />} onClick={() => props.logoutTC()}>
                Log out
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route path="/calendar">
                    <Row style={{ margin: '20px' }}>
                      <Col>
                        <Calendar />
                        <AddressDataContainer />
                      </Col>
                    </Row>
                  </Route>
                  <Redirect to="/calendar" />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  return (
    <Switch>
      <Route path="/auth">
        <Layout style={{ minHeight: '100%' }}>
          <Header style={{ padding: 0 }}>
            <div style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
              <Divider style={{ border: '#1890ff' }} orientation="center">
                <h2 style={{ color: 'whitesmoke' }}>Delivery manager</h2>
              </Divider>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <AuthPage
                setAuthenticatedTC={props.setAuthenticatedTC}
                loginTC={props.loginTC}
                registerTC={props.registerTC}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Delivery manager ©2020</Footer>
        </Layout>
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};

const mapStateToProps = (store) => {
  return {
    isAuthenticated: store.userReducer.isAuthenticated,
    userEmail: store.userReducer.userEmail,
  };
};

export default connect(mapStateToProps, { setAuthenticatedTC, isLoginTC, loginTC, registerTC, logoutTC })(Routes);

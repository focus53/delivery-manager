import React, { useState } from 'react';
import { Divider, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { TeamOutlined, ExportOutlined, SettingOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';

import Calendar from './../components/Calendar/Calendar';
import AddressDataContainer from './../components/AddressData/AddressDataContainer';
import { setAuthenticatedTC, isLoginTC, loginTC, registerTC, logoutTC } from '../components/Redux/user-reducer';
import Storages from '../components/Storages/Storages';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const ContentPage = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

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
              <NavLink to={`/calendar`}>Calendar</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<HomeOutlined />}>
              <NavLink to="/storages">Storages</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              <NavLink to="/settings">Settings</NavLink>
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
          <Content>
            <div style={{ padding: 25, minHeight: 360 }}>
              <Switch>
                <Route path="/calendar/:userId?">
                  <Calendar />
                  <AddressDataContainer />
                </Route>
                <Route path="/settings"></Route>
                <Route path="/storages">
                  <Storages />
                </Route>
                <Redirect to="/calendar" />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (store) => {
  return {
    isAuthenticated: store.userReducer.isAuthenticated,
    userId: store.userReducer.userId,
  };
};

export default connect(mapStateToProps, { setAuthenticatedTC, isLoginTC, loginTC, registerTC, logoutTC })(ContentPage);

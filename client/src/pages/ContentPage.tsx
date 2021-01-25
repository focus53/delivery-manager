import React, { useState } from 'react';
import { Row, Col, Layout } from 'antd';
import 'antd/dist/antd.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import './styles.css';

import Calendar from '../components/Calendar/Calendar';
import AddressDataContainer from '../components/AddressData/AddressDataContainer';
import Storages from '../components/Storages/Storages';
import TableAddressData from '../components/TableAddressData/TableAddressData';
import MenuComponent from '../components/MenuComponent/MenuComponent';

const { Content, Sider } = Layout;

const ContentPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="main-content">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <MenuComponent />
      </Sider>
      <Layout>
        <Content>
          <div style={{ padding: 25, minHeight: 360 }}>
            <Switch>
              <Route path="/calendar/:userId?">
                <Row gutter={25}>
                  <Col span={6}>
                    <Calendar />
                    <AddressDataContainer />
                  </Col>
                  <Col span={18}>
                    <TableAddressData />
                  </Col>
                </Row>
              </Route>
              <Route path="/settings" />
              <Route path="/storages">
                <Storages />
              </Route>
              <Redirect to="/calendar" />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContentPage;

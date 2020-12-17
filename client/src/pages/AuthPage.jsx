import React, { useState } from 'react';
import RegistrationForm from '../components/Form/RegistrationForm';
import AuthForm from '../components/Form/AuthFrom';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import { Layout, Divider } from 'antd';

const { Header, Content } = Layout;

const AuthPage = (props) => {

  const [register, setRegister] = useState(false);

  return (
    <div style={{ height: '100%' }}>
      <Switch>
        <Route path="/auth">
          <Layout style={{ minHeight: '100%' }}>
            <Header style={{ padding: 0 }}>
              <div style={{ width: '95%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                <Divider style={{ border: '#1890ff' }} orientation="center">
                  <h2 style={{ color: 'whitesmoke' }}>Delivery manager</h2>
                </Divider>
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                {register ? (
                  <RegistrationForm isRegister={setRegister} registerTC={props.registerTC} />
                ) : (
                  <AuthForm
                    isRegister={setRegister}
                    setAuthenticatedTC={props.setAuthenticatedTC}
                    loginTC={props.loginTC}
                  />
                )}
              </div>
            </Content>
          </Layout>
        </Route>
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
};

export default AuthPage;

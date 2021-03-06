import React, { useState } from 'react';
import RegistrationForm from '../components/Form/RegistrationForm';
import AuthForm from '../components/Form/AuthFrom';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './styles.css';

import { Layout } from 'antd';

const { Content } = Layout;

const AuthPage: React.FC = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="main-content">
      <Switch>
        <Route path="/auth">
          <Layout style={{ minHeight: '100%' }}>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                {register ? <RegistrationForm isRegister={setRegister} /> : <AuthForm isRegister={setRegister} />}
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

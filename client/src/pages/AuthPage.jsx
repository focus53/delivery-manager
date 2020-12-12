import React, { useState } from 'react';
import { Row, Col, Divider } from 'antd';
import RegistrationForm from '../components/Form/RegistrationForm';
import AuthForm from '../components/Form/AuthFrom';

const AuthPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <div>
      <Row style={{ marginTop: '20px' }}>
        <Col span={12} offset={6}>
          <Divider style={{ border: '#1890ff' }} orientation="center">
            <h2>Delivery manager</h2>
          </Divider>
        </Col>
      </Row>
      {register ? <RegistrationForm isRegister={setRegister} /> : <AuthForm isRegister={setRegister} />}
    </div>
  );
};

export default AuthPage;

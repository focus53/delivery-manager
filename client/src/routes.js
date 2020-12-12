import 'antd/dist/antd.css';
import Calendar from './components/Calendar/Calendar';
import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import AuthPage from './pages/AuthPage';
import AddressDataContainer from './components/AddressData/AddressDataContainer';
import { Col, Row } from 'antd';

const useRoutes = () => {
  return (
    <Switch>
      <Route path="/calendar">
        <Row style={{ margin: '20px' }}>
          <Col>
            <Calendar />
            <AddressDataContainer />
          </Col>
        </Row>
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Redirect to="/calendar" />
    </Switch>
  );
};

export default useRoutes;

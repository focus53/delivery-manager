import 'antd/dist/antd.css';
import Calendar from './components/Calendar/Calendar';
import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import AddressDataContainer from './components/AddressData/AddressDataContainer';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { setAuthenticatedTC, isLoginTC, loginTC, registerTC } from '../src/components/Redux/user-reducer';

const Routes = (props) => {
  useEffect(() => {
    props.isLoginTC();
  }, []);

  if (props.isAuthenticated) {
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
        <Redirect to="/calendar" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/auth">
        <AuthPage setAuthenticatedTC={props.setAuthenticatedTC} loginTC={props.loginTC} registerTC={props.registerTC} />
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

export default connect(mapStateToProps, { setAuthenticatedTC, isLoginTC, loginTC, registerTC })(Routes);

import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import { connect } from 'react-redux';
import { setAuthenticatedTC, isLoginTC, loginTC, registerTC, logoutTC } from './components/Redux/user-reducer';
import ContentPage from './pages/ContentPage';

const Routes = (props) => {
  useEffect(() => {
    props.isLoginTC();
  }, []);

  if (props.isAuthenticated) {
    return <ContentPage />;
  }

  return (
    <AuthPage setAuthenticatedTC={props.setAuthenticatedTC} loginTC={props.loginTC} registerTC={props.registerTC} />
  );
};

const mapStateToProps = (store) => {
  return {
    isAuthenticated: store.userReducer.isAuthenticated,
  };
};



export default connect(mapStateToProps, { setAuthenticatedTC, isLoginTC, loginTC, registerTC, logoutTC })(Routes);

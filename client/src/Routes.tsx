import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';

import AuthPage from './pages/AuthPage';
import { isLoginTC } from './Redux/user/userThunkCreators';
import ContentPage from './pages/ContentPage';
import { isAuthenticatedSelector } from './Redux/user/userSelectors';

const Routes: React.FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    dispatch(isLoginTC());
  }, [dispatch]);

  if (isAuthenticated) {
    return <ContentPage />;
  }
  return <AuthPage />;
};

export default Routes;

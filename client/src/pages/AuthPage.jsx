import React, { useState } from 'react';
import RegistrationForm from '../components/Form/RegistrationForm';
import AuthForm from '../components/Form/AuthFrom';

const AuthPage = (props) => {
  const [register, setRegister] = useState(false);

  return (
    <div>
      {register ? (
        <RegistrationForm isRegister={setRegister} registerTC={props.registerTC} />
      ) : (
        <AuthForm isRegister={setRegister} setAuthenticatedTC={props.setAuthenticatedTC} loginTC={props.loginTC} />
      )}
    </div>
  );
};

export default AuthPage;

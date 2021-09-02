import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

// components
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// context
import { AuthContext } from '../contexts/AuthContext';

const Auth = ({ authRouter }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'></div>
          <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>Tuntun learning</h1>
          <h4>Keep track of what you are learning</h4>
          {isAuthenticated ? <Redirect to='/home' /> : null}
          {!isAuthenticated && authRouter === 'login' && <LoginForm />}
          {!isAuthenticated && authRouter === 'register' && <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;

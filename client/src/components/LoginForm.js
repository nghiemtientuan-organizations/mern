import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage';

// context
import { AuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  // Router
  const history = useHistory();

  // Context
  const { loginUser } = useContext(AuthContext);

  // State
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await loginUser(loginForm);
      if (loginResponse?.success) {
        history.push('/home');
      } else {
        setAlert({
          type: 'danger',
          message: loginResponse.message,
        });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.message,
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <AlertMessage info={alert} />

        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={loginForm.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={loginForm.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button className='mt-3' variant='success' type='submit'>
          Login
        </Button>
      </Form>

      <p className='mt-3'>
        Don't have any account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='m1-2'>
            Click register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;

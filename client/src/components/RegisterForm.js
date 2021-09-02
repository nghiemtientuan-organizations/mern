import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import AlertMessage from './AlertMessage';

// context
import { AuthContext } from '../contexts/AuthContext';

const RegisterForm = () => {
  // Router
  const history = useHistory();

  // Context
  const { registerUser } = useContext(AuthContext);

  // State
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, password_confirmation } = registerForm;

    // simple validation
    if (password !== password_confirmation) {
      setAlert({
        type: 'danger',
        message: 'Password and password confirmation are not match',
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);

      return;
    }

    try {
      const registerResponse = await registerUser(registerForm);
      if (registerResponse?.success) {
        history.push('/home');
      } else {
        setAlert({
          type: 'danger',
          message: registerResponse.message,
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

        <Form.Label style={{ color: 'white' }}>
          Enter info here to register
        </Form.Label>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={registerForm.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={registerForm.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Control
            type='password'
            placeholder='Password confirmation'
            name='password_confirmation'
            value={registerForm.password_confirmation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button className='mt-3' variant='success' type='submit'>
          Register
        </Button>
      </Form>

      <p className='mt-3'>
        Already have any account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-2'>
            Click Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

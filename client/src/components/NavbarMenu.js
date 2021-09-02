import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.svg';
import logoutIcon from '../assets/logout.svg';

// context
import { AuthContext } from '../contexts/AuthContext';

const NavbarMenu = () => {
  // Router
  const history = useHistory();

  // Context
  const {
    authState: {
      user: { username },
    },
    logout,
  } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
      <Navbar.Brand className='font-weight-bolder test-white'>
        <img src={logo} alt='logo' width='32' height='32' className='mr-2' />
        Tuntun
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link
            className='font-weight-bolder text-white'
            to='/home'
            as={Link}
          >
            Dashboard
          </Nav.Link>

          <Nav.Link
            className='font-weight-bolder text-white'
            to='/about'
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className='font-weight-bolder text-white' disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant='secondary'
            className='font-weight-bolder text-white'
            onClick={handleLogout}
          >
            <img
              src={logoutIcon}
              alt='Logout'
              width='32'
              height='32'
              className='mr-2'
            />{' '}
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;

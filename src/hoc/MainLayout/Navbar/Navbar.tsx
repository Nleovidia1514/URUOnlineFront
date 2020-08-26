import React, { SyntheticEvent } from 'react';
import { Navbar, Nav, Icon, Dropdown, NavbarProps } from 'rsuite';

import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { User } from '../../../core/models/User.model';
import { logoutUserAction } from '../../../store/actions/auth.actions';

export default (props: NavbarProps) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logoutUserAction());
  }
  
  const currentUser: User | null = useSelector((state: AppState) => state.auth.currentUser);
  console.log(currentUser);
  return (
    <Navbar {...props}>
      <Navbar.Header>
          <h6 className="navbar-brand logo">URUOnline</h6>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item eventKey='1' icon={<Icon icon='home' />}>
            Home
          </Nav.Item>
          <Nav.Item eventKey='2'>News</Nav.Item>
          <Nav.Item eventKey='3'>Products</Nav.Item>
          <Dropdown title='About'>
            <Dropdown.Item eventKey='4'>Company</Dropdown.Item>
            <Dropdown.Item eventKey='5'>Team</Dropdown.Item>
            <Dropdown.Item eventKey='6'>Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
        <Dropdown title={currentUser?.name}>
            <Dropdown.Item eventKey='4' onClick={logoutUser}>Cerrar Sesión</Dropdown.Item>
            <Dropdown.Item eventKey='5'>Team</Dropdown.Item>
            <Dropdown.Item eventKey='6'>Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};
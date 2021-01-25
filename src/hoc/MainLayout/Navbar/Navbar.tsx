import React from 'react';
import {
  Navbar,
  Nav,
  Dropdown,
  NavbarProps,
  Avatar,
  Container,
} from 'rsuite';

import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { User } from '../../../core/models/User.model';
import { logoutUserAction } from '../../../store/actions/auth.actions';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default (props: NavbarProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();

  const logoutUser = () => {
    dispatch(logoutUserAction());
  };

  const currentUser: User | null = useSelector(
    (state: AppState) => state.auth.currentUser
  );
  return (
    <Navbar {...props}>
      <Navbar.Header>
        <h6 className='navbar-brand logo'>URUOnline</h6>
      </Navbar.Header>
      <Navbar.Body>
        <Nav onSelect={props.onSelect}>
        </Nav>
        <Nav pullRight justified>
          <Dropdown title={currentUser?.name}>
            <Dropdown.Item
              eventKey='4'
              onClick={() => history.push(match.path + '/profile')}
            >
              Perfil
            </Dropdown.Item>
            <Dropdown.Item eventKey='5' onClick={logoutUser}>
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown>
          <Container style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={currentUser?.profileImg} />
          </Container>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

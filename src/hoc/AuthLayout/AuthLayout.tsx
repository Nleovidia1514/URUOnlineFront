import React from 'react';
import {
  Container,
  Header,
  Navbar,
  Content,
  FlexboxGrid,
  Panel,
  Footer,
} from 'rsuite';
import {
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from 'react-router-dom';
import LoginForm from '../../auth/LoginForm/LoginForm';

import './AuthLayout.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import RegisterForm from '../../auth/registerForm/RegisterForm';
import PasswordRecoveryForm from '../../auth/PasswordRecoveryForm/PasswordRecoveryForm';

interface AuthLayoutProps {}

export default (props: RouteComponentProps<AuthLayoutProps>) => {
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  if (currentUser) {
    const history = useHistory();
    history.push('/app');
    return <></>;
  }
  return (
    <Container style={{ height: '100%' }}>
      <Header>
        <Navbar appearance='inverse'>
          <Navbar.Header>URUOnline</Navbar.Header>
        </Navbar>
      </Header>
      <Content className='auth-background'>
        <FlexboxGrid justify='center' align='middle' style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel
              className='form-panel'
              header={
                <Switch>
                  <Route
                    exact
                    path={props.match.path + '/login'}
                    render={() => (
                      <h1 style={{ color: 'black' }}>Iniciar Sesion</h1>
                    )}
                  />
                  <Route
                    exact
                    path={props.match.path + '/register'}
                    component={() => (
                      <h1 style={{ color: 'black' }}>Registrarse</h1>
                    )}
                  />
                </Switch>
              }
              bordered
            >
              <Route
                exact
                path={props.match.path + '/login'}
                component={LoginForm}
              />
              <Route
                exact
                path={props.match.path + '/register'}
                component={RegisterForm}
              />
              <Route
                exact
                path={props.match.path + '/passwordRecovery'}
                component={PasswordRecoveryForm} 
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer>Footer</Footer>
    </Container>
  );
};

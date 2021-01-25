import React, { useCallback, useState } from 'react';
import {
  Container,
  Header,
  Navbar,
  Content,
  FlexboxGrid,
  Panel,
  Footer,
  Icon,
  IconButton,
} from 'rsuite';
import {
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from 'react-router-dom';
import LoginForm from '../../auth/LoginForm/LoginForm';

import './AuthLayout.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import RegisterForm from '../../auth/registerForm/RegisterForm';
import PasswordRecoveryForm from '../../auth/PasswordRecoveryForm/PasswordRecoveryForm';
import VerifyCodeModal from '../../auth/VerifyCodeModal/VerifyCodeModal';
import { sendVerificationCodeAction } from '../../store/actions/auth.actions';

interface AuthLayoutProps {}

export default (props: RouteComponentProps<AuthLayoutProps>) => {
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const codeVerified = useSelector(
    (state: AppState) => state.auth.codeVerified
  );
  const [showVerify, setShowVerify] = useState(false);
  const dispatch = useDispatch();

  const sendVerificationCode = useCallback(() => {
    dispatch(sendVerificationCodeAction(currentUser?.phoneNumber));
  }, [dispatch, currentUser]);

  if (currentUser && (!currentUser.mfa || codeVerified)) {
    const history = useHistory();
    history.push('/app');
    return <></>;
  } else if (currentUser?.mfa && !showVerify && !codeVerified) {
    setShowVerify(true);
    sendVerificationCode();
  }

  return (
    <Container style={{ height: '100%', overflow: 'auto' }}>
      <VerifyCodeModal
        title='Autenticacion multi factor'
        show={showVerify}
        onCancel={() => setShowVerify(false)}
        onSuccessVerify={() => {}}
        phoneNumber={currentUser?.phoneNumber}
      />
      <Header>
        <Navbar
          appearance='inverse'
          style={{ display: 'flex', alignItems: 'center', height: 50 }}
        >
          <Navbar.Header
            style={{
              backgroundColor: '#000066',
              height: '80%',
              width: 100,
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}
          >
            URUOnline
          </Navbar.Header>
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
      <Footer
        style={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <IconButton
          style={{ marginRight: 3, marginLeft: 3 }}
          icon={<Icon icon='twitter' />}
          circle
          size='lg'
          onClick={() => window.open('https://twitter.com/notiuru')}
        />
        <IconButton
          style={{ marginRight: 3, marginLeft: 3 }}
          icon={<Icon icon='instagram' />}
          circle
          size='lg'
          onClick={() => window.open('https://www.instagram.com/notiuruoficial/?hl=en')}
        />
        <IconButton
          style={{ marginRight: 3, marginLeft: 3 }}
          icon={<Icon icon='desktop' />}
          circle
          size='lg'
          onClick={() => window.open('http://uru.insiemp.com/educa/')}
        />
      </Footer>
    </Container>
  );
};

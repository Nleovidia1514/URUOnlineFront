import React, { useEffect } from 'react';
import './App.css';

import 'rsuite/dist/styles/rsuite-dark.css';
import MainLayout from './hoc/MainLayout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthenticatedAction } from './store/actions/auth.actions';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import AuthLayout from './hoc/AuthLayout/AuthLayout';
import { Loader } from 'rsuite';
import { AppState } from './store/reducers';
import 'moment/locale/es';
import moment from 'moment';
import { coreActions } from './store/actions';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const checked = useSelector(
    (state: AppState) => state.auth.authenticatedChecked
  );
  const redirectUri = useSelector(
    (state: AppState) => state.general.redirectUrl
  );

  moment.locale('es');
  useEffect(() => {
    dispatch(checkAuthenticatedAction());
  }, [dispatch]);

  const mainclasses = ['main-container'];
  !checked && mainclasses.push('loader-container');

  if (redirectUri) {
    dispatch(coreActions.setRedirectAction(''));
    history.push(redirectUri);
  }
  return (
    <div className='App'>
      <div className={mainclasses.join(' ')}>
        {!checked ? (
          <Loader size='lg' content='Cargando...' />
        ) : (
          <Switch>
            <Redirect exact path='/' to='/auth/login' />
            <Route path='/auth' component={AuthLayout} />
            <Route path='/app' component={MainLayout} />
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;

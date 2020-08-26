import React, { useEffect } from 'react';
import './App.css';

import 'rsuite/dist/styles/rsuite-dark.css';
import MainLayout from './hoc/MainLayout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthenticatedAction } from './store/actions/auth.actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from './hoc/AuthLayout/AuthLayout';
import { Loader } from 'rsuite';
import { AppState } from './store/reducers';

function App() {
  const dispatch = useDispatch();
  const checked = useSelector(
    (state: AppState) => state.auth.authenticatedChecked
  );

  useEffect(() => {
    dispatch(checkAuthenticatedAction());
  }, [dispatch]);

  const mainclasses = ['main-container'];
  !checked && mainclasses.push('loader-container');

  return (
    <div className='App'>
      <div className={mainclasses.join(' ')}>
        {!checked ? (
          <Loader size='lg' content="Cargando..." />
        ) : (
          <Switch>
            <Redirect exact path="/" to="/auth/login" />
            <Route path='/auth' component={AuthLayout} />
            <Route path='/app' exact component={MainLayout} />
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;

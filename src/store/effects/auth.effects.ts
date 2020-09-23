import { put } from 'redux-saga/effects';
import api from '../../core/axios';
import { Action } from '../actions/action.model';
import { authActions } from '../actions/index';

export function* checkAuthenticatedEffect(action: Action) {
  try {
    const { data } = yield api.get('/auth');
    yield put(authActions.checkAuthenticatedSuccessAction(data));
  } catch (error) {
    yield put(authActions.checkAuthenticatedFailAction());
  }
}

export function* loginUserEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/login', action.payload);
    yield put(authActions.loginUserSuccessAction(data));
  } catch (error) {
    console.log(error);
    yield put(
      authActions.loginUserFailAction({
        message: error.message,
        stack: error.stack,
        status: error.response.status,
      })
    );
  }
}

export function* registerUserEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/register', action.payload);
    yield put(authActions.registerUserSuccessAction(data));
  } catch (error) {
    yield put(
      authActions.authActionFail(error.response.data)
    );
  }
}

export function* logoutUserEffect(action: Action) {
  try {
    yield api.get('/auth/logout');
    yield put(authActions.logoutUserSuccessAction());
  } catch (error) {
    yield put(
      authActions.authActionFail({
        message: error.message,
        stack: error.stack,
        status: error.response.status,
      })
    );
  }
}

export function* sendRecoveryCodeEffect(action: Action) {
  try {
    const { data } = yield api.get('/auth/passResetCode?id=' + action.payload);
    yield put(authActions.sendRecoveryCodeSuccessAction(data));
  } catch (error) {
    yield put(
      authActions.authActionFail(error.response.data)
    );
  }
}

export function* submitRecoveryCodeEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/passResetCode', action.payload);
    yield put(authActions.submitRecoveryCodeSuccessAction(data));
  } catch (error) {
    yield put(
      authActions.authActionFail(error.response.data)
    );
  }
}

export function* resetPasswordEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/resetPass', action.payload);
    yield put(authActions.resetPasswordSuccessAction(data));
  } catch (error) {
    yield put(
      authActions.authActionFail(error.response.data)
    );
  }
}

export {};

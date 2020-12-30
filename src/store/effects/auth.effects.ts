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
    yield put(authActions.authActionFail(error));
  }
}

export function* sendVerificationCodeEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/sendCode', {
      phoneNumber: action.payload
    });
    yield put(authActions.sendVerificationCodeSuccessAction(data));
  } catch (error) {
    yield put(authActions.authActionFail(error));
  }
}

export function* verifyCodeEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/verifyCode', {
      verificationCode: action.payload.verificationCode,
      phoneNumber: action.payload.phoneNumber
    });
    yield put(authActions.verifyCodeSuccessAction(data));
  } catch (error) {
    yield put(authActions.authActionFail(error));
  } 
}

export function* updateUserEffect(action: Action) {
  try {
    const { data } = yield api.put('/auth/users', action.payload);
    yield put(authActions.updateUserSuccessAction(data));
  } catch (error) {
    yield put(authActions.authActionFail(error));
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
    yield put(authActions.authActionFail(error.response.data));
  }
}

export function* submitRecoveryCodeEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/passResetCode', action.payload);
    yield put(authActions.submitRecoveryCodeSuccessAction(data));
  } catch (error) {
    yield put(authActions.authActionFail(error.response.data));
  }
}

export function* resetPasswordEffect(action: Action) {
  try {
    const { data } = yield api.post('/auth/resetPass', action.payload);
    yield put(authActions.resetPasswordSuccessAction(data));
  } catch (error) {
    yield put(authActions.authActionFail(error.response.data));
  }
}

export function* searchUsersEffect(action: Action) {
  try {
    const { data } = yield api.get('/auth/users?term=' + action.payload);
    yield put(authActions.searchUsersActionSuccess(data));
  } catch (error) {
    yield put(authActions.authActionFail(error.response.data));
  }
}

const authEffects = [
  {
    action: authActions.CHECK_AUTHENTICATED,
    effect: checkAuthenticatedEffect,
  },
  {
    action: authActions.LOGIN_USER,
    effect: loginUserEffect,
  },
  {
    action: authActions.REGISTER_USER,
    effect: registerUserEffect,
  },
  {
    action: authActions.SEND_VERIFICATION_CODE,
    effect: sendVerificationCodeEffect
  },
  {
    action: authActions.VERIFY_CODE,
    effect: verifyCodeEffect
  },
  {
    action: authActions.UPDATE_USER,
    effect: updateUserEffect,
  },
  {
    action: authActions.LOGOUT_USER,
    effect: logoutUserEffect,
  },
  {
    action: authActions.SEND_RECOVERY_CODE,
    effect: sendRecoveryCodeEffect,
  },
  {
    action: authActions.SUBMIT_RECOVERY_CODE,
    effect: submitRecoveryCodeEffect,
  },
  {
    action: authActions.RESET_PASSWORD,
    effect: resetPasswordEffect,
  },
  {
    action: authActions.SEARCH_USERS,
    effect: searchUsersEffect,
  },
];

export default authEffects;

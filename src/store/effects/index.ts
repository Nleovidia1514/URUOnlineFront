import { takeEvery } from 'redux-saga/effects';
import { authActions } from '../actions';
import { checkAuthenticatedEffect, loginUserEffect, registerUserEffect, logoutUserEffect, sendRecoveryCodeEffect, resetPasswordEffect, submitRecoveryCodeEffect } from './auth.effects';

export function* watchAuth() {
  yield takeEvery(authActions.CHECK_AUTHENTICATED, checkAuthenticatedEffect);
  yield takeEvery(authActions.LOGIN_USER, loginUserEffect);
  yield takeEvery(authActions.REGISTER_USER, registerUserEffect);
  yield takeEvery(authActions.LOGOUT_USER, logoutUserEffect);
  yield takeEvery(authActions.SEND_RECOVERY_CODE, sendRecoveryCodeEffect);
  yield takeEvery(authActions.SUBMIT_RECOVERY_CODE, submitRecoveryCodeEffect);
  yield takeEvery(authActions.RESET_PASSWORD, resetPasswordEffect);
}

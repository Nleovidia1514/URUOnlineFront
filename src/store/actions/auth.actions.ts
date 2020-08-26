import { User } from '../../core/models/User.model';
import { Action } from './action.model';
import { ApiError } from '../../core/models/ApiError.model';

export const CHECK_AUTHENTICATED = 'CHECK_AUTHENTICATED';
export const checkAuthenticatedAction = (): Action => ({
  type: CHECK_AUTHENTICATED,
});
export const CHECK_AUTHENTICATED_SUCESS = 'CHECK_AUTHENTICATED_SUCCESS';
export const checkAuthenticatedSuccessAction = (user: User): Action => ({
  type: CHECK_AUTHENTICATED_SUCESS,
  payload: user,
});
export const CHECK_AUTHENTICATED_FAIL = 'CHECK_AUTHENTICATED_FAIL';
export const checkAuthenticatedFailAction = (): Action => ({
  type: CHECK_AUTHENTICATED_FAIL,
});

export const LOGIN_USER = 'LOGIN_USER';
export const loginUserAction = (payload: {
  identification: string;
  password: string;
}): Action => ({ type: LOGIN_USER, payload });
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccessAction = (user: User): Action => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const loginUserFailAction = (error: ApiError) => ({
  type: LOGIN_USER_FAIL,
  payload: error,
});

export const REGISTER_USER = 'REGISTER_USER';
export const registerUserAction = (payload: User): Action => ({
  type: REGISTER_USER,
  payload,
});

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const registerUserSuccessAction = (payload: User): Action => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUserAction = (): Action => ({
  type: LOGOUT_USER,
});

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const logoutUserSuccessAction = (): Action => ({
  type: LOGOUT_USER_SUCCESS,
});

export const SEND_RECOVERY_CODE = 'SEND_RECOVERY_CODE';
export const sendRecoveryCodeAction = (identification: string): Action => ({
  type: SEND_RECOVERY_CODE,
  payload: identification,
});

export const SEND_RECOVERY_CODE_SUCCESS = 'SEND_RECOVERY_CODE_SUCCESS';
export const sendRecoveryCodeSuccessAction = (payload: {
  email: string;
  message: string;
}) => ({
  type: SEND_RECOVERY_CODE_SUCCESS,
  payload,
});

export const SUBMIT_RECOVERY_CODE = 'SUBMIT_RECOVERY_CODE';
export const submitRecoveryCodeAction = (payload: {
  email: string;
  code: string;
}) => ({
  type: SUBMIT_RECOVERY_CODE,
  payload,
});

export const SUBMIT_RECOVERY_CODE_SUCCESS = 'SUBMIT_RECOVERY_CODE_SUCCESS';
export const submitRecoveryCodeSuccessAction = (payload: any) => ({
  type: SUBMIT_RECOVERY_CODE_SUCCESS,
  payload,
});

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const resetPasswordAction = (payload: any): Action => ({
  type: RESET_PASSWORD,
  payload,
});

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const resetPasswordSuccessAction = (payload: {
  message: string;
}): Action => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

export const AUTH_ACTION_FAIL = 'AUTH_ACTION_FAIL';
export const authActionFail = (error: ApiError): Action => ({
  type: AUTH_ACTION_FAIL,
  payload: error,
});

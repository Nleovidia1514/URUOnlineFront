import { User } from '../../core/models/User.model';
import { Action } from '../actions/action.model';
import { authActions } from '../actions';
import { ApiError } from '../../core/models/ApiError.model';

export interface AuthState {
  authenticatedChecked: boolean;
  currentUser: User | null;
  currentResetEmail: string;
  loading: boolean;
  error: ApiError | null;
  message: string;
}

const initialState: AuthState = {
  authenticatedChecked: false,
  currentUser: null,
  currentResetEmail: '',
  loading: true,
  error: null,
  message: '',
};

export const authReducer = (
  state: AuthState = initialState,
  action: Action
) => {
  switch (action.type) {
    case authActions.CHECK_AUTHENTICATED:
      return {
        ...state,
        loading: false,
      };
    case authActions.CHECK_AUTHENTICATED_SUCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        authenticatedChecked: true,
      };
    case authActions.CHECK_AUTHENTICATED_FAIL:
      return {
        ...state,
        loading: false,
        authenticatedChecked: true,
      };
    case authActions.LOGIN_USER:
      return {
        ...state,
        loading: true,
        currentUser: null,
      };
    case authActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case authActions.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case authActions.REGISTER_USER:
      return {
        ...state,
        loading: true,
        currentUser: null,
        error: null,
      };
    case authActions.LOGOUT_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case authActions.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: null,
      };
    case authActions.SEND_RECOVERY_CODE:
      return {
        ...state,
        loading: true,
        error: null,
        message: ''
      };
    case authActions.SEND_RECOVERY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentResetEmail: action.payload.email,
        // message: action.payload.message,
      };
    case authActions.SUBMIT_RECOVERY_CODE:
      return {
        ...state,
        loading: true,
        error: null,
        message: '',
      };
    case authActions.SUBMIT_RECOVERY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case authActions.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case authActions.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        currentResetEmail: null,
      };
    case authActions.AUTH_ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

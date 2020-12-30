import { User } from '../../core/models/User.model';
import { Action } from '../actions/action.model';
import { authActions } from '../actions';
import { ApiError } from '../../core/models/ApiError.model';

export interface AuthState {
  authenticatedChecked: boolean;
  currentUser: User | null;
  currentResetEmail: string;
  autocompleteUsers: User[];
  loading: boolean;
  error: ApiError | null;
  codeVerified: boolean;
  message: string;
}

const initialState: AuthState = {
  authenticatedChecked: false,
  currentUser: null,
  currentResetEmail: '',
  autocompleteUsers: [],
  loading: true,
  codeVerified: false,
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

    case authActions.RESET_VERIFIED: 
      return {
        ...state,
        codeVerified: action.payload,
      }
    case authActions.SEND_VERIFICATION_CODE:
      return {
        ...state,
        error: null,
        loading: true,
        codeVerified: false,
        message: '',
      };
    case authActions.SEND_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        codeVerified: false,
        message: action.payload,
      };
    case authActions.VERIFY_CODE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case authActions.VERIFY_CODE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        codeVerified: true,
      };
    case authActions.REGISTER_USER:
      return {
        ...state,
        loading: true,
        currentUser: null,
        error: null,
      };
    case authActions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
      };
    case authActions.UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case authActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
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
        message: '',
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
    case authActions.SEARCH_USERS:
      return {
        ...state,
        loading: true,
        autocompleteUsers: [],
      };
    case authActions.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        autocompleteUsers: action.payload,
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

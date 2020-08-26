import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';

export interface AppState {
    auth: AuthState
}

export default combineReducers({
  auth: authReducer
});

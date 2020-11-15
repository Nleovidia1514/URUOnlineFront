import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';
import { generalReducer, GeneralState } from './general.reducer';
import { postsReducer, PostsState } from './posts.reducer';

export interface AppState {
  auth: AuthState;
  posts: PostsState;
  general: GeneralState;
}

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  general: generalReducer,
});

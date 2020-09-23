import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';
import { postsReducer, PostsState } from './posts.reducer';

export interface AppState {
    auth: AuthState,
    posts: PostsState
}

export default combineReducers({
  auth: authReducer,
  posts: postsReducer
});

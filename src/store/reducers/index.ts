import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';
import { courseReducer, CoursesState } from './course.reducer';
import { ExamsState } from './exams.reducer';
import { generalReducer, GeneralState } from './general.reducer';
import { postsReducer, PostsState } from './posts.reducer';
import { examsReducer } from './exams.reducer';

export interface AppState {
  auth: AuthState;
  posts: PostsState;
  general: GeneralState;
  exams: ExamsState;
  courses: CoursesState
}

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  general: generalReducer,
  courses: courseReducer,
  exams: examsReducer
});

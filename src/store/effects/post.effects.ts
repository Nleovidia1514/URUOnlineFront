import { put } from 'redux-saga/effects';
import api from '../../core/axios';
import { postActions } from '../actions';
import { Action } from '../actions/action.model';

export function* searchPostsEffect(action: Action) {
  try {
    const { data } = yield api.get('/posts?page=' + action.payload);
    yield put(postActions.searchPostsSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* createPostEffect(action: Action) {
  try {
    const { data } = yield api.post('/posts', action.payload);
    yield put(postActions.createPostSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* updatePost(action: Action) {
  try {
    const { data } = yield api.put('/posts', action.payload);
    yield put(postActions.updatePostSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* deletePostEffect(action: Action) {
  try {
    const { data } = yield api.delete('/posts?postId=' + action.payload);
    yield put(postActions.deletePostSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

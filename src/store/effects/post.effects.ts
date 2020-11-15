import { put } from 'redux-saga/effects';
import api from '../../core/axios';
import { coreActions, postActions } from '../actions';
import { Action } from '../actions/action.model';

export function* searchPostsEffect(action: Action) {
  try {
    const { data } = yield api.get(
      `/posts?page=${action.payload.page}&filter=${action.payload.filter}`
    );
    yield put(postActions.searchPostsSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* searchPostByIdEffect(action: Action) {
  try {
    const { data } = yield api.get('/posts?id=' + action.payload);
    yield put(postActions.searchPostByIdSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* createPostEffect(action: Action) {
  try {
    const { data } = yield api.post('/posts', action.payload);
    yield put(
      postActions.createPostSuccessAction({
        message: data.message,
        payload: data.post,
      })
    );
    yield put(coreActions.setRedirectAction('/app/posts/' + data.post._id));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* updatePost(action: Action) {
  try {
    const { data } = yield api.put('/posts', action.payload);
    yield put(postActions.updatePostSuccessAction(data));
    yield put(coreActions.setRedirectAction('/app/posts/' + action.payload._id));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* deletePostEffect(action: Action) {
  try {
    const { data } = yield api.delete('/posts?postId=' + action.payload);
    yield put(postActions.deletePostSuccessAction(data));
    yield put(coreActions.setRedirectAction('/app/posts'));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* upvotePostEffect(action: Action) {
  try {
    const { data } = yield api.post('/posts/vote?parentId=' + action.payload);
    yield put(postActions.upvotePostSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* downvotePostEffect(action: Action) {
  try {
    const { data } = yield api.delete('/posts/vote?parentId=' + action.payload);
    yield put(postActions.downvotePostSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* searchCommentsEffect(action: Action) {
  try {
    const { data } = yield api.get('/posts/comments?postId=' + action.payload);
    yield put(postActions.searchCommentsSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* createCommentEffect(action: Action) {
  try {
    const { data } = yield api.post('/posts/comments', action.payload);
    yield put(
      postActions.createCommentSuccessAction({
        message: data.message,
        payload: data.comment,
      })
    );
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* deleteCommentEffect(action: Action) {
  try {
    const { data } = yield api.delete(
      '/post/comments?commentId=' + action.payload
    );
    // yield put(postActions.deleteCommentSuccessAction(data));
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* upvoteCommentEffect(action: Action) {
  try {
    const { data } = yield api.post('/posts/vote?parentId=' + action.payload);
    yield put(
      postActions.upvoteCommentSuccessAction({
        ...data,
        payload: action.payload,
      })
    );
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

export function* downvoteCommentEffect(action: Action) {
  try {
    const { data } = yield api.delete('/posts/vote?parentId=' + action.payload);
    yield put(
      postActions.downvoteCommentSuccessAction({
        ...data,
        payload: action.payload,
      })
    );
  } catch (error) {
    yield put(postActions.postFailedAction(error));
  }
}

import { takeEvery } from 'redux-saga/effects';
import { authActions, postActions } from '../actions';
import { checkAuthenticatedEffect, loginUserEffect, registerUserEffect, logoutUserEffect, sendRecoveryCodeEffect, resetPasswordEffect, submitRecoveryCodeEffect } from './auth.effects';
import { createCommentEffect, createPostEffect, deletePostEffect, downvoteCommentEffect, downvotePostEffect, searchCommentsEffect, searchPostByIdEffect, searchPostsEffect, updatePost, upvoteCommentEffect, upvotePostEffect } from './post.effects';

export function* watchAuth() {
  yield takeEvery(authActions.CHECK_AUTHENTICATED, checkAuthenticatedEffect);
  yield takeEvery(authActions.LOGIN_USER, loginUserEffect);
  yield takeEvery(authActions.REGISTER_USER, registerUserEffect);
  yield takeEvery(authActions.LOGOUT_USER, logoutUserEffect);
  yield takeEvery(authActions.SEND_RECOVERY_CODE, sendRecoveryCodeEffect);
  yield takeEvery(authActions.SUBMIT_RECOVERY_CODE, submitRecoveryCodeEffect);
  yield takeEvery(authActions.RESET_PASSWORD, resetPasswordEffect);
}

export function* watchPosts() {
  yield takeEvery(postActions.SEARCH_POSTS, searchPostsEffect);
  yield takeEvery(postActions.SEARCH_POST_BY_ID, searchPostByIdEffect)
  yield takeEvery(postActions.CREATE_POST, createPostEffect);
  yield takeEvery(postActions.UPDATE_POST, updatePost);
  yield takeEvery(postActions.DELETE_POST, deletePostEffect);
  yield takeEvery(postActions.UPVOTE_POST, upvotePostEffect);
  yield takeEvery(postActions.DOWNVOTE_POST, downvotePostEffect);
  yield takeEvery(postActions.SEARCH_COMMENTS, searchCommentsEffect);
  yield takeEvery(postActions.CREATE_COMMENT, createCommentEffect);
  yield takeEvery(postActions.UPVOTE_COMMENT, upvoteCommentEffect);
  yield takeEvery(postActions.DOWNVOTE_COMMENT, downvoteCommentEffect);
}

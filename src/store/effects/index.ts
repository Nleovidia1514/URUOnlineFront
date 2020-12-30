import { takeEvery } from 'redux-saga/effects';
import authEffects from './auth.effects';
import courseEffects from './course.effects';
import examEffects from './exam.effects';
import generalEffects from './general.effects';
import postEffects from './post.effects';

export function* watchAuth() {
  for (let i = 0; i < authEffects.length; i++) {
    const el = authEffects[i];
    yield takeEvery(el.action, el.effect);
  }
}

export function* watchPosts() {
  for (let i = 0; i < postEffects.length; i++) {
    const el = postEffects[i];
    yield takeEvery(el.action, el.effect);
  }
}

export function* watchCourses() {
  for (let i = 0; i < courseEffects.length; i++) {
    const el = courseEffects[i];
    yield takeEvery(el.action, el.effect);
  }
}

export function* watchGeneral() {
  for (let i = 0; i < generalEffects.length; i++) {
    const el = generalEffects[i];
    yield takeEvery(el.action, el.effect);
  }
}

export function* watchExams() {
  for (let i = 0; i < examEffects.length; i++) {
    const el = examEffects[i];
    yield takeEvery(el.action, el.effect);
  }
}

export const watchers = [watchAuth, watchPosts, watchCourses, watchGeneral, watchExams];

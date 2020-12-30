import { put } from 'redux-saga/effects';
import api from '../../core/axios';
import { examActions } from '../actions';
import { Action } from '../actions/action.model';

function* createExamEffect(action: Action) {
  try {
    const { data } = yield api.post('/exams', action.payload);
    yield put(examActions.createExamSuccessAction(data.exam));
  } catch (error) {
    yield put(examActions.examFailAction(error));
  }
}

function* getExamsEffect(action: Action) {
  try {
    const { data } = yield api.get('/exams?id=' + action.payload);
    yield put(
      action.payload
        ? examActions.setCurrentExamAction(data)
        : examActions.getExamsSuccessAction(data)
    );
  } catch (error) {
    yield put(examActions.examFailAction(error));
  }
}

function* deleteExamEffect(action: Action) {
  try {
    yield api.delete('/exams', {
      data: { examId: action.payload },
    });
    yield put(examActions.deleteExamSuccessAction(action.payload));
  } catch (error) {
    yield put(examActions.examFailAction(error));
  }
}

function* addExamQuestionEffect(action: Action) {
  try {
    const { data } = yield api.put('/exams', action.payload);
    yield put(examActions.addExamQuestionSuccess(data.exam.questions));
  } catch (error) {
    yield put(examActions.examFailAction(error));
  }
}

function* createDeliveredExamEffect(action: Action) {
  try {
    const { data } = yield api.post('/exams/delivered', action.payload);
    yield put(examActions.createDeliveredExamSuccessAction(data));
  } catch (error) {
    yield put(examActions.examFailAction(error));
  }
}
const examEffects = [
  {
    action: examActions.CREATE_EXAM,
    effect: createExamEffect,
  },
  {
    action: examActions.GET_EXAMS,
    effect: getExamsEffect,
  },
  {
    action: examActions.DELETE_EXAM,
    effect: deleteExamEffect,
  },
  {
    action: examActions.ADD_EXAM_QUESTION,
    effect: addExamQuestionEffect,
  },
  {
    action: examActions.CREATE_DELIVERED_EXAM,
    effect: createDeliveredExamEffect,
  },
];

export default examEffects;

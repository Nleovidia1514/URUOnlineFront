import { put } from 'redux-saga/effects';
import api from '../../core/axios';
import { courseActions } from '../actions';
import { Action } from '../actions/action.model';
import { setRedirectAction } from '../actions/core.actions';

export function* searchCoursesEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses/${action.payload.userType}?period=${action.payload.period}`);
    yield put(courseActions.searchCoursesSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* createCourseEffect(action: Action) {
  try {
    const { data } = yield api.post('/courses', action.payload);
    yield put(courseActions.createCourseSuccessAction(data.course));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
} 

export function* searchCourseByIdEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses?courseId=${action.payload}`);
    yield put(courseActions.searchCourseByIdSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* addCourseMemberEffect(action: Action) {
  try {
    yield api.post(`/courses/members?courseId=${action.payload.course._id}&alumnId=${action.payload.user._id}`);
    yield put(courseActions.addCourseMemberSucessAction(action.payload.user));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* removeCourseMemberEffect(action: Action) {
  try {
    yield api.delete(`/courses/members?courseId=${action.payload.course._id}&alumnId=${action.payload.user._id}`);
    yield put(courseActions.removeCourseMemberSuccessAction(action.payload.user));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* searchCourseAssignationsEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses/assignations?courseId=${action.payload}`);
    yield put(courseActions.searchCourseAssignationsSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* searchSingleAssignationEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses/assignations?courseId=${action.payload.courseId}&assignId=${action.payload.assignId}&filter=${action.payload.filter}`);
    yield put(courseActions.searchSingleAssignationSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* deleteAssignationEffect(action: Action) {
  try {
    const { data } = yield api.delete(`/courses/assignations?assignationId=${action.payload}`);
    yield put(courseActions.deleteAssignationSuccessAction(data.message));
    yield put(setRedirectAction('/app/courses'))
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* createCourseAssignationEffect(action: Action) {
  try {
    const { data } = yield api.post('/courses/assignations', action.payload);
    yield put(courseActions.createCourseAssignationSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* createDeliveredAssignationEffect(action: Action) {
  try {
    const { data } = yield api.post('/courses/deliveredAssignations', action.payload);
    yield put(courseActions.createDeliveredAssignationSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* deleteDeliveredAssignationEffect(action: Action) {
  try {
    yield api.delete('/courses/deliveredAssignations', { data: action.payload });
    yield put(courseActions.deleteDeliveredAssignationSuccessAction(action.payload));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* createCourseGradeEffect(action: Action) {
  try {
    const { data } = yield api.post('/courses/grades', action.payload);
    yield put(courseActions.getAllProfessorGradesAction(action.payload.course));
    yield put(courseActions.createCourseGradeSuccessAction(data.grade));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* getCourseGradesEffect(action: Action) {
  try {
    const { data } = yield api.get('/courses/grades?courseId=' + action.payload);
    yield put(courseActions.getCourseGradesSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* createAlumnGradeEffect(action: Action) {
  try {
    const { data } = yield api.post('/courses/grades/alumn', action.payload);
    yield put(courseActions.createAlumnGradeSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* getAlumnGradesEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses/grades/alumn?courseId=${action.payload.course}&alumnId=${action.payload.alumn}&filter=${action.payload.filter}`);
    yield put(courseActions.getAlumnGradesSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* updateAlumnGradeEffect(action: Action) {
  try {
    const { data } = yield api.put(`/courses/grades/alumn?gradeId=${action.payload.grade}&alumnId=${action.payload.alumn}`, action.payload);
    yield put(courseActions.updateAlumnGradeSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* getAllProfessorGradesEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses/grades/professor?courseId=${action.payload}`);
    yield put(courseActions.getAllProfessorGradesSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* getAllCourseAttachmentsEffect(action: Action) {
  try {
    const { data } = yield api.get(`/courses/attachments?courseId=${action.payload}`);
    yield put(courseActions.getAllCourseAttachmentsSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

export function* createCourseFeedEffect(action: Action) {
  try {
    const { data } = yield api.post('/courses/feed', action.payload);
    yield put(courseActions.createCourseFeedSuccessAction(data));
  } catch (error) {
    yield put(courseActions.courseFailedAction(error));
  }
}

const courseEffects = [
  {
    action: courseActions.SEARCH_COURSES,
    effect: searchCoursesEffect
  },
  {
    action: courseActions.CREATE_COURSE,
    effect: createCourseEffect
  },
  {
    action: courseActions.SEARCH_COURSE_BY_ID,
    effect: searchCourseByIdEffect
  },
  {
    action: courseActions.ADD_COURSE_MEMBER,
    effect: addCourseMemberEffect
  },
  {
    action: courseActions.REMOVE_COURSE_MEMBER,
    effect: removeCourseMemberEffect
  },
  {
    action: courseActions.SEARCH_COURSE_ASSIGNATIONS,
    effect: searchCourseAssignationsEffect
  },
  {
    action: courseActions.DELETE_ASSIGNATION,
    effect: deleteAssignationEffect
  },
  {
    action: courseActions.SEARCH_SINGLE_ASSIGNATION,
    effect: searchSingleAssignationEffect
  },
  {
    action: courseActions.CREATE_COURSE_ASSIGNATION,
    effect: createCourseAssignationEffect
  },
  {
    action: courseActions.CREATE_DELIVERED_ASSIGNATION,
    effect: createDeliveredAssignationEffect
  },
  {
    action: courseActions.DELETE_DELIVERED_ASSIGNATION,
    effect: deleteDeliveredAssignationEffect
  },
  {
    action: courseActions.CREATE_COURSE_GRADE,
    effect: createCourseGradeEffect,
  },
  {
    action: courseActions.CREATE_ALUMN_GRADE,
    effect: createAlumnGradeEffect
  },
  {
    action: courseActions.GET_ALUMN_GRADES,
    effect: getAlumnGradesEffect
  },
  {
    action: courseActions.GET_COURSE_GRADES,
    effect: getCourseGradesEffect
  },
  {
    action: courseActions.UPDATE_ALUMN_GRADE,
    effect: updateAlumnGradeEffect
  },
  {
    action: courseActions.GET_ALL_PROFESSOR_GRADES,
    effect: getAllProfessorGradesEffect
  },
  {
    action: courseActions.GET_COURSE_ATTACHMENTS,
    effect: getAllCourseAttachmentsEffect
  },
  {
    action: courseActions.CREATE_COURSE_FEED,
    effect: createCourseFeedEffect
  }
]

export default courseEffects;

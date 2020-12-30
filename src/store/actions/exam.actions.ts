import { ApiError } from '../../core/models/ApiError.model';
import { DeliveredExam } from '../../core/models/DeliveredExam.model';
import { Exam, ExamQuestion } from '../../core/models/Exam.model';
import { Action } from './action.model';

export const CREATE_EXAM = 'CREATE_EXAM';
export const createExamAction = (payload: Exam): Action => ({
  type: CREATE_EXAM,
  payload,
});

export const CREATE_EXAM_SUCCESS = 'CREATE_EXAM_SUCCESS';
export const createExamSuccessAction = (payload: Exam): Action => ({
  type: CREATE_EXAM_SUCCESS,
  payload,
});

export const GET_EXAMS = 'GET_EXAMS';
export const getExamsAction = (payload?: string): Action => ({
  type: GET_EXAMS,
  payload,
});

export const GET_EXAMS_SUCCESS = 'GET_EXAMS_SUCCESS';
export const getExamsSuccessAction = (payload: Exam[]): Action => ({
  type: GET_EXAMS_SUCCESS,
  payload,
});

export const SET_CURRENT_EXAM = 'SET_CURRENT_EXAM';
export const setCurrentExamAction = (payload: Exam): Action => ({
  type: SET_CURRENT_EXAM,
  payload,
});

export const DELETE_EXAM = 'DELETE_EXAM';
export const deleteExamAction = (payload: string): Action => ({
  type: DELETE_EXAM,
  payload,
});

export const DELETE_EXAM_SUCCESS = 'DELETE_EXAM_SUCCESS';
export const deleteExamSuccessAction = (payload: string): Action => ({
  type: DELETE_EXAM_SUCCESS,
  payload,
});

export const ADD_EXAM_QUESTION = 'ADD_EXAM_QUESTION';
export const addExamQuestion = (payload: ExamQuestion): Action => ({
  type: ADD_EXAM_QUESTION,
  payload,
});

export const ADD_EXAM_QUESTION_SUCCESS = 'ADD_EXAM_QUESTION_SUCCESS';
export const addExamQuestionSuccess = (payload: ExamQuestion): Action => ({
  type: ADD_EXAM_QUESTION_SUCCESS,
  payload,
});

export const CREATE_DELIVERED_EXAM = 'CREATE_DELIVERED_EXAM';
export const createDeliveredExamAction = (payload: DeliveredExam): Action => ({
  type: CREATE_DELIVERED_EXAM,
  payload,
});

export const CREATE_DELIVERED_EXAM_SUCCESS = 'CREATE_DELIVERED_EXAM_SUCCESS';
export const createDeliveredExamSuccessAction = (
  payload: DeliveredExam
): Action => ({
  type: CREATE_DELIVERED_EXAM_SUCCESS,
  payload,
});

export const EXAM_FAIL = 'EXAM_FAIL';
export const examFailAction = (payload: ApiError): Action => ({
  type: EXAM_FAIL,
  payload,
});

import { DeliveredExam } from '../../core/models/DeliveredExam.model';
import { Exam } from '../../core/models/Exam.model';
import { examActions } from '../actions';
import { Action } from '../actions/action.model';

export interface ExamsState {
  currentExams: Exam[];
  currentExam: Exam;
  currentDeliveredExam: DeliveredExam;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: ExamsState = {
  currentExam: null,
  currentExams: [],
  currentDeliveredExam: null,
  loading: false,
  error: '',
  message: '',
};

export const examsReducer = (
  state: ExamsState = initialState,
  action: Action
): ExamsState => {
  switch (action.type) {
    case examActions.CREATE_EXAM:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case examActions.CREATE_EXAM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentExams: [...state.currentExams, action.payload],
      };
    case examActions.GET_EXAMS:
      const auxState = {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
      if (action.payload) auxState.currentExam = null;
      else auxState.currentExams = [];
      return auxState;
    case examActions.GET_EXAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentExams: action.payload,
        error: '',
      };
    case examActions.DELETE_EXAM:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case examActions.DELETE_EXAM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentExams: state.currentExams.filter(
          (x) => x._id !== action.payload
        ),
      };
    case examActions.ADD_EXAM_QUESTION:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case examActions.ADD_EXAM_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentExam: {
          ...state.currentExam,
          questions: action.payload,
        },
      };
    case examActions.CREATE_DELIVERED_EXAM:
      return {
        ...state,
        loading: true,
        currentDeliveredExam: null,
        error: '',
      };
    case examActions.CREATE_DELIVERED_EXAM_SUCCESS:
      return {
        ...state,
        currentDeliveredExam: action.payload,
        loading: false,
      };
    case examActions.SET_CURRENT_EXAM:
      return {
        ...state,
        currentExam: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

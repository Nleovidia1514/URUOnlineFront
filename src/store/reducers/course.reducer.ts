import { AlumnGrade } from '../../core/models/AlumnGrade.model';
import { Assignation } from '../../core/models/Assignation.model';
import { Attachment } from '../../core/models/Attachment.model';
import { Course } from '../../core/models/Course.model';
import { CourseGrade } from '../../core/models/CourseGrade.model';
import { DeliveredAssignation } from '../../core/models/DeliveredAssignation.model';
import { ProfessorGrade } from '../../core/models/ProfessorGrade.model';
import { User } from '../../core/models/User.model';
import { courseActions } from '../actions';
import { Action } from '../actions/action.model';

export interface CoursesState {
  currentCourses: Course[];
  currentCourse: Course | null;
  currentCourseAssignations: Assignation[];
  currentCourseGrades: CourseGrade[];
  currentAlumnGrades: AlumnGrade[];
  currentProfessorGrades: ProfessorGrade[];
  currentAssignation: Assignation;
  currentAttachments: Attachment[];
  error: string;
  message: string;
  loading: boolean;
}

const initialState: CoursesState = {
  currentCourses: [],
  currentCourse: null,
  currentCourseAssignations: [],
  currentProfessorGrades: [],
  currentCourseGrades: [],
  currentAlumnGrades: [],
  currentAttachments: [],
  currentAssignation: null,
  error: '',
  message: '',
  loading: false,
};

export const courseReducer = (
  state: CoursesState = initialState,
  action: Action
): CoursesState => {
  switch (action.type) {
    case courseActions.SEARCH_COURSES:
      return {
        ...state,
        currentCourses: [],
        loading: true,
        error: '',
      };

    case courseActions.SEARCH_COURSES_SUCCESS:
      return {
        ...state,
        currentCourses: action.payload,
        loading: false,
      };
    case courseActions.CREATE_COURSE:
      return {
        ...state,
        loading: true,
      };
    case courseActions.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCourses: [...state.currentCourses, action.payload],
      };
    case courseActions.SEARCH_COURSE_BY_ID:
      return {
        ...state,
        currentCourse: null,
        loading: true,
        error: '',
      };
    case courseActions.SEARCH_COURSE_BY_ID_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        loading: false,
        error: '',
      };
    case courseActions.ADD_COURSE_MEMBER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case courseActions.ADD_COURSE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCourse: {
          ...state.currentCourse,
          alumns: [action.payload, ...(state.currentCourse?.alumns as User[])],
        },
      };
    case courseActions.REMOVE_COURSE_MEMBER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case courseActions.REMOVE_COURSE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCourse: {
          ...state.currentCourse,
          alumns: state.currentCourse?.alumns?.filter(
            (x) => x._id !== action.payload._id
          ),
        },
      };
    case courseActions.CREATE_DELIVERED_ASSIGNATION:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case courseActions.CREATE_DELIVERED_ASSIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
        currentAssignation: {
          ...state.currentAssignation,
          delivered: [...state.currentAssignation.delivered, action.payload],
        },
      };
    case courseActions.DELETE_DELIVERED_ASSIGNATION:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case courseActions.DELETE_DELIVERED_ASSIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: 'Se ha eliminado la entrega con exito.',
        currentAssignation: {
          ...state.currentAssignation,
          delivered: (state.currentAssignation
            .delivered as DeliveredAssignation[])?.filter(
            (x) => x._id !== action.payload._id
          ),
        },
      };
    case courseActions.CREATE_COURSE_ASSIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: 'Se ha creado la asignacion con exito.',
        currentCourseAssignations: [
          ...state.currentCourseAssignations,
          action.payload,
        ],
      };
    case courseActions.DELETE_ASSIGNATION:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case courseActions.DELETE_ASSIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: action.payload,
        currentAssignation: null,
      };
    case courseActions.SEARCH_COURSE_ASSIGNATIONS:
      return {
        ...state,
        loading: true,
        currentCourseAssignations: [],
      };
    case courseActions.SEARCH_COURSE_ASSIGNATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCourseAssignations: action.payload,
      };
    case courseActions.SEARCH_SINGLE_ASSIGNATION:
      return {
        ...state,
        loading: true,
        currentAssignation: null,
      };
    case courseActions.SEARCH_SINGLE_ASSIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentAssignation: action.payload,
      };

    case courseActions.CREATE_COURSE_GRADE:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case courseActions.CREATE_COURSE_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentCourseGrades: [...state.currentCourseGrades, action.payload],
      };
    case courseActions.GET_COURSE_GRADES:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        currentCourseGrades: [],
      };
    case courseActions.GET_COURSE_GRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentCourseGrades: action.payload,
      };
    case courseActions.GET_ALL_PROFESSOR_GRADES:
      return {
        ...state,
        loading: true,
        message: '',
        error: '',
        currentProfessorGrades: [],
      };
    case courseActions.GET_ALL_PROFESSOR_GRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentProfessorGrades: action.payload,
      };
    case courseActions.CREATE_ALUMN_GRADE:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case courseActions.CREATE_ALUMN_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentAlumnGrades: [...state.currentAlumnGrades, action.payload],
      };
    case courseActions.GET_ALUMN_GRADES:
      return {
        ...state,
        loading: true,
        error: '',
        currentAlumnGrades: [],
      };
    case courseActions.UPDATE_ALUMN_GRADE:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case courseActions.UPDATE_ALUMN_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentAlumnGrades: [
          ...state.currentAlumnGrades.filter(
            (x) => x._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case courseActions.GET_ALUMN_GRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAlumnGrades: action.payload,
      };
    case courseActions.GET_COURSE_ATTACHMENTS:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        currentAttachments: [],
      };
    case courseActions.GET_COURSE_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
        currentAttachments: action.payload,
      };
    case courseActions.CREATE_COURSE_FEED:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
      };
    case courseActions.CREATE_COURSE_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentCourse: {
          ...state.currentCourse,
          feed: action.payload,
        },
      };
    case courseActions.COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

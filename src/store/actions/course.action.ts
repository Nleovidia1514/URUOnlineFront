import { AlumnGrade } from "../../core/models/AlumnGrade.model";
import { ApiError } from "../../core/models/ApiError.model";
import { Assignation } from "../../core/models/Assignation.model";
import { Attachment } from "../../core/models/Attachment.model";
import { Course, CourseFeed  } from "../../core/models/Course.model";
import { CourseGrade } from "../../core/models/CourseGrade.model";
import { DeliveredAssignation } from "../../core/models/DeliveredAssignation.model";
import { ProfessorGrade } from "../../core/models/ProfessorGrade.model";
import { User } from "../../core/models/User.model";
import { Action } from "./action.model";

export const SEARCH_COURSE_BY_ID = 'SEARCH_COURSE_BY_ID';
export const searchCourseByIdAction = (payload: string): Action => ({
    type: SEARCH_COURSE_BY_ID,
    payload
});

export const SEARCH_COURSE_BY_ID_SUCCESS = 'SEARCH_COURSE_BY_ID_SUCCESS';
export const searchCourseByIdSuccessAction = (payload: Course): Action => ({
    type: SEARCH_COURSE_BY_ID_SUCCESS,
    payload
});

export const SEARCH_COURSES = 'SEARCH_COURSES';
export const searchCoursesAction = (payload: { userType: string, period: string }): Action => ({
    type: SEARCH_COURSES,
    payload
});

export const SEARCH_COURSES_SUCCESS = 'SEARCH_COURSES_SUCCESS';
export const searchCoursesSuccessAction = (payload: Course[]): Action => ({
    type: SEARCH_COURSES_SUCCESS,
    payload
});

export const CREATE_COURSE = 'CREATE_COURSE';
export const createCourseAction = (payload: Course): Action => ({
    type: CREATE_COURSE,
    payload
});

export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const createCourseSuccessAction = (payload: Course): Action => ({
    type: CREATE_COURSE_SUCCESS,
    payload
})

export const ADD_COURSE_MEMBER = 'ADD_COURSE_MEMBER';
export const addCourseMemberAction = (payload: { user: User, course: Course }): Action => ({
    type: ADD_COURSE_MEMBER,
    payload
});

export const ADD_COURSE_MEMBER_SUCCESS = 'ADD_COURSE_MEMBER_SUCCESS';
export const addCourseMemberSucessAction = (payload: User): Action => ({
    type: ADD_COURSE_MEMBER_SUCCESS,
    payload
});

export const REMOVE_COURSE_MEMBER = 'REMOVE_COURSE_MEMBER';
export const removeCourseMemberAction = (payload: { user: User, course: Course }): Action => ({
    type: REMOVE_COURSE_MEMBER,
    payload
});

export const REMOVE_COURSE_MEMBER_SUCCESS = 'REMOVE_COURSE_MEMBER_SUCCESS';
export const removeCourseMemberSuccessAction = (payload: User): Action => ({
    type: REMOVE_COURSE_MEMBER_SUCCESS,
    payload
});

export const SEARCH_COURSE_ASSIGNATIONS = 'SEARCH_COURSE_ASSIGNATIONS';
export const searchCourseAssignationsAction = (payload: string): Action => ({
    type: SEARCH_COURSE_ASSIGNATIONS,
    payload
});

export const SEARCH_SINGLE_ASSIGNATION = 'SEARCH_SINGLE_ASSIGNATION';
export const searchSingleAssignationAction = (payload: { courseId: string, assignId: string, filter: string }): Action => ({
    type: SEARCH_SINGLE_ASSIGNATION,
    payload
});

export const SEARCH_SINGLE_ASSIGNATION_SUCCESS = 'SEARCH_SINGLE_ASSIGNATION_SUCCESS';
export const searchSingleAssignationSuccessAction = (payload: Assignation): Action => ({
    type: SEARCH_SINGLE_ASSIGNATION_SUCCESS,
    payload
});

export const DELETE_ASSIGNATION = 'DELETE_ASSIGNATION';
export const deleteAssignationAction = (payload: string): Action => ({
    type: DELETE_ASSIGNATION,
    payload
});

export const DELETE_ASSIGNATION_SUCCESS = 'DELETE_ASSIGNATION_SUCCESS';
export const deleteAssignationSuccessAction = (payload: string): Action => ({
    type: DELETE_ASSIGNATION_SUCCESS,
    payload
});

export const SEARCH_COURSE_ASSIGNATIONS_SUCCESS = 'SEARCH_COURSE_ASSIGNATIONS_SUCCESS';
export const searchCourseAssignationsSuccessAction = (payload: Assignation[]): Action => ({
    type: SEARCH_COURSE_ASSIGNATIONS_SUCCESS,
    payload
});

export const CREATE_COURSE_ASSIGNATION = 'CREATE_COURSE_ASSIGNATION';
export const createCourseAssignationAction = (payload: Assignation): Action => ({
    type: CREATE_COURSE_ASSIGNATION,
    payload
});

export const CREATE_COURSE_ASSIGNATION_SUCCESS = 'CREATE_COURSE_ASSIGNATION_SUCCESS';
export const createCourseAssignationSuccessAction = (payload: Assignation): Action => ({
    type: CREATE_COURSE_ASSIGNATION_SUCCESS,
    payload
});

export const CREATE_DELIVERED_ASSIGNATION = 'CREATE_DELIVERED_ASSIGNATION';
export const createDeliveredAssignationAction = (payload: DeliveredAssignation): Action => ({
    type: CREATE_DELIVERED_ASSIGNATION,
    payload
});

export const CREATE_DELIVERED_ASSIGNATION_SUCCESS = 'CREATE_DELIVERED_ASSIGNATION_SUCCESS';
export const createDeliveredAssignationSuccessAction = (payload: DeliveredAssignation): Action => ({
    type: CREATE_DELIVERED_ASSIGNATION_SUCCESS,
    payload
});

export const DELETE_DELIVERED_ASSIGNATION = 'DELETE_DELIVERED_ASSIGNATION';
export const deleteDeliveredAssignationAction = (payload: DeliveredAssignation): Action => ({
    type: DELETE_DELIVERED_ASSIGNATION,
    payload
});

export const DELETE_DELIVERED_ASSIGNATION_SUCCESS = 'DELETE_DELIVERED_ASSIGNATION_SUCCESS';
export const deleteDeliveredAssignationSuccessAction = (payload: DeliveredAssignation): Action => ({
    type: DELETE_DELIVERED_ASSIGNATION_SUCCESS,
    payload
});

export const CREATE_COURSE_GRADE = 'CREATE_COURSE_GRADE';
export const createCourseGradeAction = (payload: CourseGrade): Action => ({
    type: CREATE_COURSE_GRADE,
    payload
});

export const CREATE_COURSE_GRADE_SUCCESS = 'CREATE_COURSE_GRADE_SUCCESS';
export const createCourseGradeSuccessAction = (payload: CourseGrade): Action => ({
    type: CREATE_COURSE_GRADE_SUCCESS,
    payload
});

export const GET_COURSE_GRADES = 'GET_COURSE_GRADES';
export const getCourseGradesAction = (payload: string): Action => ({
    type: GET_COURSE_GRADES,
    payload
});

export const GET_COURSE_GRADES_SUCCESS = 'GET_COURSE_GRADES_SUCCESS';
export const getCourseGradesSuccessAction = (payload: CourseGrade[]): Action => ({
    type: GET_COURSE_GRADES_SUCCESS,
    payload
});

export const GET_ALL_PROFESSOR_GRADES = 'GET_ALL_PROFESSOR_GRADES';
export const getAllProfessorGradesAction = (payload: string): Action => ({
    type: GET_ALL_PROFESSOR_GRADES,
    payload
});

export const GET_ALL_PROFESSOR_GRADES_SUCCESS = 'GET_ALL_PROFESSOR_GRADES_SUCCESS';
export const getAllProfessorGradesSuccessAction = (payload: ProfessorGrade[]): Action => ({
    payload: payload,
    type: GET_ALL_PROFESSOR_GRADES_SUCCESS
})

export const UPDATE_ALUMN_GRADE = 'UPDATE_ALUMN_GRADE';
export const updateAlumnGradeAction = (payload: AlumnGrade): Action => ({
    type: UPDATE_ALUMN_GRADE,
    payload
});

export const UPDATE_ALUMN_GRADE_SUCCESS = 'UPDATE_ALUMN_GRADE_SUCCESS';
export const updateAlumnGradeSuccessAction = (payload: AlumnGrade): Action => ({
    type: UPDATE_ALUMN_GRADE_SUCCESS,
    payload
});

export const CREATE_ALUMN_GRADE = 'CREATE_ALUMN_GRADE';
export const createAlumnGradeAction = (payload: AlumnGrade): Action => ({
    type: CREATE_ALUMN_GRADE,
    payload
});

export const CREATE_ALUMN_GRADE_SUCCESS = 'CREATE_ALUMN_GRADE_SUCCESS';
export const createAlumnGradeSuccessAction = (payload: AlumnGrade): Action => ({
    type: CREATE_ALUMN_GRADE_SUCCESS,
    payload
});

export const GET_ALUMN_GRADES = 'GET_ALUMN_GRADES';
export const getAlumnGradesAction = (payload: { course: string, alumn: string, filter: string }): Action => ({
    type: GET_ALUMN_GRADES,
    payload
});

export const GET_ALUMN_GRADES_SUCCESS = 'GET_ALUMN_GRADES_SUCCESS';
export const getAlumnGradesSuccessAction = (payload: { course: string, alumn: string }): Action => ({
    type: GET_ALUMN_GRADES_SUCCESS,
    payload
});

export const GET_COURSE_ATTACHMENTS = 'GET_COURSE_ATTACHMENTS';
export const getAllCourseAttachmentsAction = (payload: string): Action => ({
    type: GET_COURSE_ATTACHMENTS,
    payload
});

export const GET_COURSE_ATTACHMENTS_SUCCESS = 'GET_COURSE_ATTACHMENTS_SUCCESS';
export const getAllCourseAttachmentsSuccessAction = (payload: Attachment[]): Action => ({
    type: GET_COURSE_ATTACHMENTS_SUCCESS,
    payload
});

export const CREATE_COURSE_FEED = 'CREATE_COURSE_FEED';
export const createCourseFeedAction = (payload: { course: string, content: string }): Action => ({
    type: CREATE_COURSE_FEED,
    payload
});

export const CREATE_COURSE_FEED_SUCCESS = 'CREATE_COURSE_FEED_SUCCESS';
export const createCourseFeedSuccessAction = (payload: CourseFeed[]): Action => ({
    type: CREATE_COURSE_FEED_SUCCESS,
    payload
});

export const COURSE_FAILED = 'COURSE_FAILED';
export const courseFailedAction = (error: ApiError): Action => ({
    type: COURSE_FAILED,
    payload: error
});



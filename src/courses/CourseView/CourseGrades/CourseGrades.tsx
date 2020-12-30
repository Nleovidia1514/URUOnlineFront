import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'rsuite';
import { User } from '../../../core/models/User.model';
import {
  getAllProfessorGradesAction,
  getAlumnGradesAction,
  getCourseGradesAction,
} from '../../../store/actions/course.action';
import { AppState } from '../../../store/reducers';
import AlumnGradesTable from './AlumnGradesTable/AlumnGradesTable';
import CreateGradeModal from './CreateGradeModal/CreateGradeModal';
import ProfessorGradesTable from './ProfessorGradesTable/ProfessorGradesTable';

export default () => {
  const dispatch = useDispatch();
  const [showCreateGrade, setShowCreateGrade] = useState(false);
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const loading = useSelector((state: AppState) => state.courses.loading);
  const alumnGrades = useSelector(
    (state: AppState) => state.courses.currentAlumnGrades
  );
  const professorGrades = useSelector(
    (state: AppState) => state.courses.currentProfessorGrades
  );

  const isProfessor = (course?.professor as User)?._id === currentUser._id;

  useEffect(() => {
    if (!course || !currentUser) return;

    if (isProfessor) {
      dispatch(getCourseGradesAction(course._id));
      dispatch(getAllProfessorGradesAction(course._id));
    } else {
      dispatch(
        getAlumnGradesAction({
          course: course._id,
          alumn: currentUser._id,
          filter: currentUser._id !== (course.professor as User)._id ? 'alumn' : 'professor'
        })
      );
    }
  }, [dispatch, course, currentUser, isProfessor]);

  return (
    <div>
      <CreateGradeModal
        show={showCreateGrade}
        close={() => setShowCreateGrade(false)}
      />
      {(course?.professor as User)?._id === currentUser._id ? (
        <Button
          style={{ marginBottom: 20 }}
          color='blue'
          onClick={() => setShowCreateGrade(true)}
        >
          Agregar nota
        </Button>
      ) : null}
      {isProfessor ? (
        <ProfessorGradesTable loading={loading} grades={professorGrades} />
      ) : (
        <AlumnGradesTable loading={loading} grades={alumnGrades} />
      )}
    </div>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Divider, Loader, Radio, RadioGroup, Row } from 'rsuite';
import { courseActions } from '../../store/actions';
import { AppState } from '../../store/reducers';
import CourseSummary from './CourseSummary/CourseSummary';

import './CoursesList.css';
import CreateCourseModal from './CreateCourseModal/CreateCourseModal';

export const getCurrentPeriod = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  let letter: string;

  if (month >= 0 && month <= 4) {
    letter = 'A';
  } else if (month > 4 && month <= 8) {
    letter = 'B';
  } else if (month > 8 && month <= 12) {
    letter = 'C';
  }

  return `${year}-${letter}`;
};

export const getPeriods = () => {
  const date = new Date();

  if (date.getUTCMonth() <= 4) {
    return [
      date.getUTCFullYear() - 1 + '-C',
      date.getUTCFullYear() + '-A',
      date.getUTCFullYear() + '-B',
    ];
  } else if (date.getUTCMonth() <= 8) {
    return [
      date.getUTCFullYear() + '-A',
      date.getUTCFullYear() + '-B',
      date.getUTCFullYear() + '-C',
    ];
  } else if (date.getUTCMonth() <= 12) {
    return [
      date.getUTCFullYear() + '-B',
      date.getUTCFullYear() + '-C',
      (date.getUTCFullYear() + 1) + '-A',
    ];
  }
};

export default () => {
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const currentCourses = useSelector(
    (state: AppState) => state.courses.currentCourses
  );
  const loading = useSelector((state: AppState) => state.courses.loading);
  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentPeriod());
  const [showCourseModal, setShowCourseModal] = useState(false);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    setShowCourseModal(false);
  }, [setShowCourseModal]);

  useEffect(() => {
    dispatch(
      courseActions.searchCoursesAction({
        userType: currentUser.type,
        period: selectedPeriod,
      })
    );
  }, [dispatch, currentUser, selectedPeriod]);

  if (loading) {
    return <Loader size='lg' content='Cargando...' />;
  }
  return (
    <Container>
      <Row>
        <h1>
          Cursos{' '}
          {currentUser.type === 'professor' ? (
            <>
              &bull;{' '}
              <Button onClick={() => setShowCourseModal(true)}>
                Agregar curso
              </Button>
            </>
          ) : null}
        </h1>
        <RadioGroup inline onChange={setSelectedPeriod} value={selectedPeriod}>
          {getPeriods().map((x, index) => <Radio key={x} value={x} checked={x === getCurrentPeriod()}>{x}</Radio>)}
        </RadioGroup>
        <Divider />
        {currentCourses.map((x) => (
          <Col key={x._id} sm={24} md={8}>
            <CourseSummary course={x}></CourseSummary>
          </Col>
        ))}
      </Row>
      <CreateCourseModal close={closeModal} show={showCourseModal} />
    </Container>
  );
};

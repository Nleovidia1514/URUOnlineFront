import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { Container, Nav } from 'rsuite';
import { courseActions } from '../../store/actions';
import CourseArchives from './CourseArchives/CourseArchives';
import CourseAssignations from './CourseAssignations/CourseAssignations';
import CourseFeed from './CourseFeed/CourseFeed';
import CourseGrades from './CourseGrades/CourseGrades';
import CourseMembers from './CourseMembers/CourseMembers';

import './CourseView.css';

export default () => {
  const [activeTab, setActiveTab] = useState('feed');
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { id } = match.params as any;

  const selectHandle = useCallback(
    (eventKey: string) => {
      setActiveTab(eventKey);
      history.push(match.path.replace(':id', id) + '/' + eventKey);
    },
    [history, match.path, id, setActiveTab]
  );

  useEffect(() => {
    setActiveTab(
      location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
    );
  }, [location.pathname]);

  useEffect(() => {
    dispatch(courseActions.searchCourseByIdAction(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Nav appearance='subtle' activeKey={activeTab} onSelect={selectHandle}>
        <Nav.Item eventKey='feed'>Feed</Nav.Item>
        <Nav.Item eventKey='assignments'>Asignaciones</Nav.Item>
        <Nav.Item eventKey='members'>Miembros</Nav.Item>
        <Nav.Item eventKey='grades'>Notas</Nav.Item>
        <Nav.Item eventKey='archives'>Archivos</Nav.Item>
      </Nav>
      <Container style={{ padding: 20 }}>
        <Switch>
          <Route
            path={match.path + '/feed'}
            exact
            component={CourseFeed}
          ></Route>
          <Route
            path={match.path + '/members'}
            exact
            component={CourseMembers}
          />
          <Route
            path={match.path + '/assignments'}
            component={CourseAssignations}
          />
          <Route path={match.path + '/grades'} exact component={CourseGrades} />
          <Route
            path={match.path + '/archives'}
            exact
            component={CourseArchives}
          />
        </Switch>
      </Container>
    </Container>
  );
};

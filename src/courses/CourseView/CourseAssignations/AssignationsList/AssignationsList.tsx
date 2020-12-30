import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Divider, Icon, IconButton, List, Loader } from 'rsuite';
import { User } from '../../../../core/models/User.model';
import { searchCourseAssignationsAction } from '../../../../store/actions/course.action';
import { AppState } from '../../../../store/reducers';
import Assignation from '../Assignation/Assignation';
import CreateAssignationModal from '../CreateAssignationModal/CreateAssignationModal';

export default () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const assignations = useSelector(
    (state: AppState) => state.courses.currentCourseAssignations
  );
  const loading = useSelector((state: AppState) => state.courses.loading);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const { id } = match.params as any;

  const closeAssignModal = useCallback(() => {
    setShowAssignModal(false);
  }, []);

  useEffect(() => {
    dispatch(searchCourseAssignationsAction(id));
  }, [dispatch, id]);

  return (
    <Container style={{ flex: 0 }}>
      <div>
        <h3 style={{ color: 'white', display: 'inline' }}>Pendientes</h3>
        {currentUser?._id === (course?.professor as User)?._id ? (
          <>
            &nbsp; &#8226; Agregar nueva asignacion
            <IconButton
              style={{ marginLeft: 10 }}
              icon={<Icon icon='plus' />}
              circle
              onClick={() => setShowAssignModal(true)}
            />
          </>
        ) : null}
      </div>
      <Divider />
      {loading ? (
        <Loader center />
      ) : assignations.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <span>No hay asignaciones pendientes </span>&nbsp;&nbsp;&nbsp;
          <Icon icon='smile-o' size='3x' />
        </div>
      ) : (
        <List hover>
          {assignations
            .filter((x) => new Date().getTime() < new Date(x.dueDate).getTime())
            .map((x) => (
              <List.Item
                key={x._id}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  history.push(match.path.replace(':id', id) + x._id)
                }
              >
                <Assignation assignation={x}></Assignation>
              </List.Item>
            ))}
        </List>
      )}
      <br />
      <h3 style={{ color: 'white', display: 'inline' }}>Finalizadas </h3>
      <Divider />
      {loading ? (
        <Loader center />
      ) : (
        <List hover>
          {assignations
            .filter((x) => new Date().getTime() > new Date(x.dueDate).getTime())
            .map((x) => (
              <List.Item
                key={x._id}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  history.push(match.path.replace(':id', id) + x._id)
                }
              >
                <Assignation assignation={x}></Assignation>
              </List.Item>
            ))}
        </List>
      )}
      <CreateAssignationModal
        show={showAssignModal}
        close={closeAssignModal}
        course={course}
      />
    </Container>
  );
};

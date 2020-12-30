import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Divider,
  Grid,
  Icon,
  List,
  Row,
  Tooltip,
  Whisper,
} from 'rsuite';
import {
  deleteAssignationAction,
  deleteDeliveredAssignationAction,
  searchSingleAssignationAction,
} from '../../../../store/actions/course.action';
import { AppState } from '../../../../store/reducers';
import moment from 'moment';
import { Attachment } from '../../../../core/models/Attachment.model';
import { User } from '../../../../core/models/User.model';
import { deleteAttachmentAction } from '../../../../store/actions/core.actions';
import CreateDeliveredModal from './CreateDeliveredModal/CreateDeliveredModal';
import { DeliveredAssignation } from '../../../../core/models/DeliveredAssignation.model';
import DeliveredDetailModal from './DeliveredDetailModal/DeliveredDetailModal';
import { CourseGrade } from '../../../../core/models/CourseGrade.model';

export default () => {
  const [showDelivered, setShowDelivered] = useState(false);
  const [currentDelivered, setCurrentDelivered] = useState(null);
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const loading = useSelector((state: AppState) => state.courses.loading);

  const assignation = useSelector(
    (state: AppState) => state.courses.currentAssignation
  );
  const { assignId } = match.params as any;

  useEffect(() => {
    if (!course) return;
    dispatch(
      searchSingleAssignationAction({
        courseId: course?._id,
        assignId,
        filter:
          currentUser._id !== (course.professor as User)._id
            ? 'alumn'
            : 'professor',
      })
    );
  }, [dispatch, course, assignId, currentUser]);

  const deleteAssignation = useCallback(() => {
    assignation?.attachments.forEach((x) =>
      dispatch(deleteAttachmentAction(x))
    );
    dispatch(deleteAssignationAction(assignId));
  }, [dispatch, assignId, assignation]);

  const deleteDeliveredAssignation = useCallback(
    (delivered) => {
      dispatch(deleteDeliveredAssignationAction(delivered));
    },
    [dispatch]
  );

  return (
    <Container>
      <Grid>
        <Row>
          <Col md={16}>
            <h2 style={{ display: 'inline', marginRight: 20 }}>
              {assignation?.title} -{' '}
              {(assignation?.grade as CourseGrade)?.percentage + '%'}
            </h2>
            {(course?.professor as User)?._id === currentUser?._id ? (
              <Button color='red' onClick={deleteAssignation} loading={loading}>
                Eliminar asignación
              </Button>
            ) : null}
            <Divider />
            <p>{assignation?.content}</p>
            <Divider />
            <h3>Archivos adjuntos</h3>
            {(assignation?.attachments as Attachment[])?.map((x) => {
              let icon = 'text';

              if (x.contentType.includes('image')) icon = 'image';

              return (
                <Whisper
                  key={x._id}
                  placement='bottom'
                  trigger='hover'
                  speaker={<Tooltip>{x.title}</Tooltip>}
                >
                  <Icon
                    onClick={() => window.open(x.url)}
                    style={{ margin: 20, cursor: 'pointer' }}
                    icon={`file-${icon}-o` as any}
                    size='4x'
                  />
                </Whisper>
              );
            })}
          </Col>
          <Col md={8} style={{ paddingLeft: '20px' }}>
            <h3>Fecha de entrega: </h3>
            <h3>{moment(assignation?.dueDate).format('DD/MM/YYYY hh:mm a')}</h3>
            {course?.alumns.find((x) => x._id === currentUser._id) ? (
              <Button
                onClick={() => setShowDelivered(true)}
                style={{ marginBottom: 20 }}
                color='blue'
                disabled={
                  assignation?.delivered.findIndex(
                    (x) => x.owner._id === currentUser._id
                  ) > -1
                }
              >
                Entregar asignacion
              </Button>
            ) : null}
            <h3>Entregas:</h3>
            <List hover>
              {(assignation?.delivered as DeliveredAssignation[])?.map((x) => (
                <List.Item
                  key={x._id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCurrentDelivered(x)}
                >
                  <Grid fluid>
                    <Row style={{ width: '100%' }}>
                      <Col sm={x.attachments.length > 0 ? 16 : 24}>
                        <strong>
                          {x.owner.name} {x.owner.lastname} - (
                          {x.grade ? 'Corregida' : 'Pendiente'})
                        </strong>
                        <br />
                        {new Date(x.uploadedDate).getTime() >
                        new Date(assignation.dueDate).getTime() ? (
                          <span style={{ color: 'red' }}></span>
                        ) : (
                          moment(x.uploadedDate).format('DD/MM/YYYY hh:mm a')
                        )}
                        <p style={{ marginTop: 10 }}>{x.comment}</p>
                      </Col>
                      {x.attachments.length > 0 ? (
                        <Col sm={7}>
                          <Icon icon='file-text-o' size='4x' />
                        </Col>
                      ) : null}
                      {x.owner._id === currentUser._id ||
                      currentUser._id === (course.professor as User)?._id ? (
                        <Col sm={1}>
                          <Icon
                            icon='close'
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => deleteDeliveredAssignation(x)}
                          ></Icon>
                        </Col>
                      ) : null}
                    </Row>
                  </Grid>
                </List.Item>
              ))}
            </List>
          </Col>
        </Row>
      </Grid>
      {currentDelivered ? (
        <DeliveredDetailModal
          delivered={currentDelivered}
          show={!!currentDelivered}
          close={() => setCurrentDelivered(null)}
        />
      ) : null}
      <CreateDeliveredModal
        show={showDelivered}
        close={() => setShowDelivered(false)}
      />
    </Container>
  );
};

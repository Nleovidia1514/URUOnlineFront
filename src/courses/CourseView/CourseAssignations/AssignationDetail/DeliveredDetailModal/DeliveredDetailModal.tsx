import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Divider,
  Grid,
  Icon,
  List,
  Modal,
  Row,
  SelectPicker,
} from 'rsuite';
import { Attachment } from '../../../../../core/models/Attachment.model';
import { CourseGrade } from '../../../../../core/models/CourseGrade.model';
import { DeliveredAssignation } from '../../../../../core/models/DeliveredAssignation.model';
import { DeliveredExam } from '../../../../../core/models/DeliveredExam.model';
import { Exam } from '../../../../../core/models/Exam.model';
import { User } from '../../../../../core/models/User.model';
import {
  createAlumnGradeAction,
  updateAlumnGradeAction,
} from '../../../../../store/actions/course.action';
import { setCurrentExamAction } from '../../../../../store/actions/exam.actions';
import { AppState } from '../../../../../store/reducers';
import CreateDeliveredExamModal from '../CreateDeliveredExamModal/CreateDeliveredExamModal';

export interface DeliveredDetailModalProps {
  show: boolean;
  close: () => void;
  delivered: DeliveredAssignation;
}

const possibleGrades = [
  'SI',
  'NP',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

export default ({ show, close, delivered }: DeliveredDetailModalProps) => {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState(delivered.grade?.value);
  const [showExam, setShowExam] = useState(false);
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const assignation = useSelector(
    (state: AppState) => state.courses.currentAssignation
  );

  const saveGrade = useCallback(() => {
    if (delivered.grade) {
      dispatch(
        updateAlumnGradeAction({
          alumn: delivered.owner._id,
          grade: (assignation.grade as CourseGrade)._id,
          value: grade,
        })
      );
    } else {
      dispatch(
        createAlumnGradeAction({
          alumn: delivered.owner._id,
          grade: (assignation.grade as CourseGrade)._id,
          value: grade,
        })
      );
    }

    close();
  }, [dispatch, grade, assignation, delivered, close]);

  return (
    <Modal show={show} onHide={close} backdrop='static'>
      <Modal.Header>
        <Modal.Title>
          Entrega de {delivered?.owner.name} {delivered?.owner.lastname} - C.I.{' '}
          {delivered?.owner.identification}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{delivered?.comment}</p>

        {delivered?.exam ? (
          <>
            <h4>Examen</h4>
            <Divider />
            <Button
              color='blue'
              block
              onClick={() => {
                dispatch(setCurrentExamAction(assignation.exam as Exam));
                setShowExam(true);
              }}
            >
              Ver respuestas
            </Button>
          </>
        ) : null}
        {delivered?.attachments.length === 0 ? null : (
          <>
            <h4>Archivos adjuntos</h4>
          </>
        )}
        <List hover>
          {(delivered?.attachments as Attachment[])?.map((x) => (
            <List.Item
              key={x._id}
              style={{ cursor: 'pointer' }}
              onClick={() => window.open(x.url)}
            >
              <Grid fluid>
                <Row>
                  <Col sm={4}>
                    <Icon
                      icon='file-text-o'
                      style={{ cursor: 'pointer', display: 'inline' }}
                      onClick={() => window.open(x.url)}
                      size='4x'
                    ></Icon>
                  </Col>
                  <Col sm={20}>
                    <h5>{x.title}</h5>
                  </Col>
                </Row>
              </Grid>
            </List.Item>
          ))}
        </List>
        <Divider />
        <h3>Nota</h3>
        {(course?.professor as User)?._id === currentUser._id ? (
          <>
            <SelectPicker
              searchable={false}
              placement='topStart'
              onChange={setGrade}
              value={grade}
              data={possibleGrades.map((x) => ({ label: x, value: x }))}
            />
          </>
        ) : delivered.grade ? (
          <h5>{delivered.grade?.value}</h5>
        ) : (
          <h5>Pendiente</h5>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button color='red' onClick={close}>
          Cerrar
        </Button>
        {(course?.professor as User)?._id === currentUser._id ? (
          <Button color='blue' onClick={saveGrade} disabled={!grade}>
            Guardar
          </Button>
        ) : null}
      </Modal.Footer>
      <CreateDeliveredExamModal
        show={showExam}
        close={() => setShowExam(false)}
        readonly={true}
        deliveredExam={delivered?.exam as DeliveredExam}
      />
    </Modal>
  );
};

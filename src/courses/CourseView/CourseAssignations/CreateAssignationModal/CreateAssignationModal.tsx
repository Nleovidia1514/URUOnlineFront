import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  Grid,
  Modal,
  Row,
  Schema,
} from 'rsuite';
import FileUploader from '../../../../core/components/controls/FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCourseAssignationAction,
  getCourseGradesAction,
} from '../../../../store/actions/course.action';
import { Assignation } from '../../../../core/models/Assignation.model';
import { Course } from '../../../../core/models/Course.model';
import Input from '../../../../core/components/controls/Input';
import { AppState } from '../../../../store/reducers';
import { getExamsAction } from '../../../../store/actions/exam.actions';
import environment from '../../../../core/environment';

export interface CreateAssignationModal {
  show: boolean;
  close: () => void;
  course: Course;
}

const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  title: StringType('Por favor ingrese un numero de cedula valido.')
    .isRequired('Este campo es obligatorio.')
    .maxLength(100),
  content: StringType('Por favor ingrese una contraseña valida.')
    .isRequired('Este campo es obligatorio.')
    .maxLength(10000),
  dueDate: DateType().isRequired('Este campo es obligatorio.'),
  grade: StringType('Por favor ingrese una nota valida.').isRequired(
    'Este campo es obligatorio.'
  ),
  exam: StringType('Por favor ingrese una nota valida.'),
});

export default ({ show, close, course }: CreateAssignationModal) => {
  const initialValue = {
    title: '',
    content: '',
    dueDate: new Date(),
    grade: '',
    exam: '',
  };

  const dispatch = useDispatch();
  const courseGrades = useSelector(
    (state: AppState) => state.courses.currentCourseGrades
  );
  const exams = useSelector((state: AppState) => state.exams.currentExams);
  const uploader = useRef(null);
  const [formValue, setFormValue] = useState(initialValue);
  let form = useRef<any>(null);
  const [createdAttachments, setCreatedAttachments] = useState([]);
  const courseId = course?._id;

  useEffect(() => {
    if (!course) return;
    dispatch(getCourseGradesAction(course._id));
    dispatch(getExamsAction());
  }, [dispatch, course]);

  const resetForm = useCallback(() => {
    setCreatedAttachments([]);
    setFormValue(initialValue);
  }, [initialValue]);

  const handleUploadSuccess = useCallback(
    (newAttach) => {
      if (!newAttach) {
        dispatch(
          createCourseAssignationAction({
            attachments: [],
            course: courseId,
            ...formValue,
          } as Assignation)
        );
        resetForm();
        close();
      } else {
        const nextAttachs = [...createdAttachments, newAttach];
        setCreatedAttachments(nextAttachs);
        if (nextAttachs.length === uploader.current.state.fileList.length) {
          dispatch(
            createCourseAssignationAction({
              attachments: nextAttachs.map((x) => x._id),
              course: courseId,
              ...formValue,
            } as Assignation)
          );
          resetForm();
          close();
        }
      }
    },
    [dispatch, createdAttachments, courseId, formValue, close, resetForm]
  );

  return (
    <Modal
      full
      backdrop={true}
      show={show}
      onHide={() => {
        resetForm();
        close();
      }}
    >
      <Modal.Header>
        <Modal.Title>Crear nueva asignacion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          ref={form}
          fluid
          onChange={(formValue) => setFormValue(formValue as any)}
          formValue={formValue}
          model={model}
        >
          <Grid>
            <Row style={{ marginBottom: 20 }}>
              <Input label='Titulo de la asignación' name='title' />
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Input label='Descripcion' name='content' type='textarea' />
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col sm={10}>
                <Input
                  label='Fecha de entrega'
                  name='dueDate'
                  type='date'
                  allowHour={true}
                />
              </Col>
              <Col sm={10} smOffset={4}>
                <Input
                  disableSearch={true}
                  label='Nota relacionada'
                  name='grade'
                  data={courseGrades.map((x) => ({
                    label: `${x.name} - ${x.percentage}%`,
                    value: x._id,
                  }))}
                  type='select'
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col sm={10}>
                <Input
                  disableSearch={true}
                  label='Examen relacionado'
                  name='exam'
                  data={exams.map((x) => ({
                    label: x.name,
                    value: x._id,
                  }))}
                  type='select'
                />
              </Col>
            </Row>
            <Row>
              <ControlLabel>Archivos adjuntos</ControlLabel>
              <FileUploader
                action={environment.API_BASE + '/attachments/upload'}
                uploaderRef={uploader}
                onUploadSuccess={handleUploadSuccess}
              ></FileUploader>
            </Row>
          </Grid>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} color='red'>
          Cerrar
        </Button>
        <Button
          onClick={() => {
            if (!form.current.check()) return;
            if (uploader.current.state.fileList.length > 0) {
              uploader.current.start();
            } else {
              handleUploadSuccess(null);
            }
          }}
          appearance='primary'
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

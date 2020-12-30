import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Col, Form, Grid, Modal, Row, Schema } from 'rsuite';
import ImageUploader from '../../../core/components/controls/ImageUploader';
import Input from '../../../core/components/controls/Input';
import environment from '../../../core/environment';
import { createCourseAction } from '../../../store/actions/course.action';
import { AppState } from '../../../store/reducers';
import { getCurrentPeriod, getPeriods } from '../CoursesList';

export interface CreateCourseModalProps {
  show: boolean;
  close: () => void;
}

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType('Por favor ingrese un nombre valido.')
    .isRequired('Este campo es obligatorio.')
    .maxLength(100),
  period: StringType('Por favor ingrese un periodo valido.')
    .isRequired('Este campo es obligatorio')
    .maxLength(30),
  capacity: NumberType('Por favor ingrese una capacidad valida.')
    .isRequired('Este campo es obligatorio.')
    .min(10),
});

export default ({ show, close }: CreateCourseModalProps) => {
  const initialValue = {
    name: '',
    period: getCurrentPeriod(),
    capacity: 10,
  };
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialValue);
  let form = useRef<any>(null);
  let uploader = useRef<any>(null);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const course = useSelector((state: AppState) => state.courses.currentCourse);

  const resetForm = useCallback(() => {
    setFormValue(initialValue);
  }, [initialValue]);

  const handleUploadSuccess = useCallback(
    ({ url }) => {
      dispatch(
        createCourseAction({
          backgroundImg: url,
          professor: currentUser._id,
          alumns: [],
          ...formValue,
        })
      );
    },
    [dispatch, formValue, currentUser]
  );

  return (
    <Modal
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
          <Grid fluid>
            <Row>
              <Col mdOffset={8} md={8}>
                <ImageUploader
                  action={encodeURIComponent(`${environment.API_BASE}/courses/uploadCourseImg?courseName=${course?.name}`)}
                  onSuccessUpload={handleUploadSuccess}
                  autoupload={false}
                  uploaderRef={uploader}
                ></ImageUploader>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Input label='Nombre' name='name' />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={12}>
                <Input label='Periodo' name='period' type='select' data={getPeriods().map(x => ({ label: x, value: x }))} />
              </Col>
              <Col md={12}>
                <Input label='Capacidad' name='capacity' type='number' min={10} max={50} />
              </Col>
            </Row>
          </Grid>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} appearance='primary'>
          Cerrar
        </Button>
        <Button
          onClick={() => {
            if (!form.current.check()) return;
            if (uploader.current.state.fileList.length === 0) {
              Alert.error('Por favor seleccione una imagen para el curso.');
            } else {
              uploader.current.start();
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

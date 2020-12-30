import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Schema } from 'rsuite';
import Input from '../../../../core/components/controls/Input';
import { createCourseGradeAction } from '../../../../store/actions/course.action';
import { AppState } from '../../../../store/reducers';

export interface CreateGradeModalProps {
  show: boolean;
  close: () => void;
}

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType('Por favor ingrese un nombre valido.').isRequired(
    'Este campo es obligatorio.'
  ),
  percentage: NumberType('Por favor ingrese un porcentaje valida.')
    .isRequired('Este campo es obligatorio.')
    .min(1)
    .max(100),
});

export default (props: CreateGradeModalProps) => {
  const dispatch = useDispatch();
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const loading = useSelector((state: AppState) => state.courses.loading);

  const [formValue, setFormValue] = useState({
    name: '',
    percentage: 25,
  });
  const form = useRef<any>(null);

  const saveGrade = useCallback(() => {
    if (form.current.check()) {
      dispatch(
        createCourseGradeAction({
          ...formValue,
          course: course._id,
        })
      );
    }
  }, [dispatch, formValue, course]);

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header>
        <Modal.Title>Agregar nota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          ref={form}
          fluid
          onChange={(formValue) => setFormValue(formValue as any)}
          formValue={formValue}
          model={model}
        >
          <Input name='name' label='Nombre' disabled={loading} />
          <Input
            name='percentage'
            label='Porcentaje'
            type='number'
            disabled={loading}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button color='red' onClick={props.close}>
          Cancelar
        </Button>
        <Button color='blue' onClick={saveGrade} loading={loading}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

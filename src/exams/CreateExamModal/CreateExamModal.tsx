import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Schema } from 'rsuite';
import Input from '../../core/components/controls/Input';
import { examActions } from '../../store/actions';
import { AppState } from '../../store/reducers';

interface CreateExamModalProps {
  show: boolean;
  close: () => void;
}

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType('Por favor ingrese una contraseña valida.')
    .isRequired('Este campo es obligatorio.')
    .minLength(6),
});

export default (props: CreateExamModalProps) => {
  const initialValue = {
    name: '',
  };

  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.exams.loading);

  const [formValue, setFormValue] = useState(initialValue);
  const form = useRef<any>(null);

  const saveExam = useCallback(() => {
    if (form.current.check()) {
      dispatch(
        examActions.createExamAction({
          ...formValue,
          questions: [],
        })
      );
      setFormValue(initialValue);
      props.close();
    }
  }, [dispatch, props, initialValue, formValue]);

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header>
        <Modal.Title>Crear nuevo examen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          model={model}
          fluid
          ref={form}
          onChange={setFormValue}
          formValue={formValue}
        >
          <Input label='Nombre' name='name'></Input>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button color='red' onClick={props.close}>
          Cancelar
        </Button>
        <Button appearance='primary' onClick={saveExam} loading={loading}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Grid,
  Row,
  Schema,
} from 'rsuite';
import Input from '../../core/components/controls/Input';
import { AppState } from '../../store/reducers';

const { StringType, BooleanType } = Schema.Types;

const model = Schema.Model({
  password: StringType('Por favor ingrese una contraseña valida.')
    .isRequired('Este campo es obligatorio.')
    .minLength(6),
  verifyPassword: StringType('Por favor ingrese una contraseña valida.')
    .isRequired('Este campo es obligatorio.')
    .minLength(6)
    .addRule((value, data) => {
      if (value !== data.password) return false;
      return true;
    }, 'Las contraseñas no coinciden.'),
  mfa: BooleanType('Por favor ingrese una opcion valida.'),
});

export interface SecurityFormProps {
  value: {
    password: string;
    verifyPassword: string;
    mfa: boolean;
  };
  setValue: (formValue) => void;
  saveChanges: (changes: any) => void;
}

export default ({ value, setValue, saveChanges }: SecurityFormProps) => {
  const loading = useSelector((state: AppState) => state.auth.loading);
  return (
    <Form
      fluid
      onChange={(formValue) => setValue(formValue)}
      formValue={value}
      model={model}
    >
      <Grid fluid>
        <Row style={{ marginBottom: 20 }}>
          <Col sm={24}>
            <Input name='password' label='Contraseña' />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col sm={24}>
            <Input name='verifyPassword' label='Verificar contraseña' />
          </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <Button
              color={value.mfa ? 'red' : 'blue'}
              onClick={() => {
                setValue({
                  ...value,
                  mfa: !value.mfa
                });
                saveChanges({ mfa: !value.mfa })
              }}
              loading={loading}
            >
              {value.mfa
                ? 'Desactivar autenticacion de dos pasos '
                : 'Activar autenticacion de dos pasos (telefono)'}
            </Button>
          </Col>
        </Row>
      </Grid>
    </Form>
  );
};

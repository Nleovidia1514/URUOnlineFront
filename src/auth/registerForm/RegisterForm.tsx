import React, { useState, useRef, useCallback } from 'react';
import { Schema, Form, Button, Message, Grid, Row, Col } from 'rsuite';
import Input from '../../core/components/controls/Input';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Link } from 'react-router-dom';
import { registerUserAction } from '../../store/actions/auth.actions';

import './RegisterForm.css';

const { StringType, NumberType, DateType } = Schema.Types;
const model = Schema.Model({
  identification: NumberType(
    'Por favor ingrese un numero de cedula valido.'
  ).isRequired('Este campo es obligatorio.'),
  email: StringType()
    .isRequired('Este campo es obligatorio.')
    .isEmail('El formato no es correcto.')
    .maxLength(100),
  name: StringType()
    .isRequired('Este campo es obligatorio.')
    .minLength(3)
    .maxLength(100),
  lastname: StringType()
    .isRequired('Este campo es obligatorio.')
    .minLength(3)
    .maxLength(100),
  birthdate: DateType().isRequired('Este campo es obligatorio.'),
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
});

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.auth.loading);
  const [formValue, setFormValue] = useState({
    identification: 0,
    email: '',
    name: '',
    lastname: '',
    birthdate: new Date(),
    password: '',
    verifyPassword: '',
  });
  const error = useSelector((state: AppState) =>
    state.auth.error ? state.auth.error : null
  );
  let form = useRef<any>(null);
  const submitRegister = useCallback(() => {
    if (form.current.check()) {
      dispatch(registerUserAction(formValue));
    }
  }, [dispatch, form, formValue]);
  return (
    <>
      {error ? (
        <Message showIcon type='error' description={error.message} />
      ) : null}
      <Form
        ref={form}
        fluid
        onChange={(formValue) => setFormValue(formValue as any)}
        formValue={formValue}
        model={model}
      >
        <Grid fluid>
          <Row className='grid-row'>
            <Col sm={24}>
              <Input name='identification' label='Cedula' />
            </Col>
          </Row>
          <Row className='grid-row'>
            <Col sm={24}>
              <Input name='email' label='Correo Electronico' />
            </Col>
          </Row>
          <Row className='grid-row'>
            <Col sm={24} md={12}>
              <Input name='name' label='Nombre' />
            </Col>
            <Col sm={24} md={12}>
              <Input name='lastname' label='Apellido' />
            </Col>
          </Row>
          <Row className='grid-row'>
            <Col sm={24} md={12}>
              <Input name='birthdate' label='Fecha de Nacimiento' type='date' />
            </Col>
          </Row>
          <Row className='grid-row'>
            <Col sm={24} md={12}>
              <Input name='password' label='Contraseña' type='password' />
            </Col>
            <Col sm={24} md={12}>
              <Input
                name='verifyPassword'
                label='Repetir contraseña'
                type='password'
              />
            </Col>
          </Row>
        </Grid>
        <p>
          <Link to='/auth/login'>Ya tienes una cuenta ? Inicia Sesion</Link>
        </p>
        <br></br>
        <Button
          loading={loading}
          appearance='primary'
          disabled={loading}
          onClick={submitRegister}
        >
          Registrarse
        </Button>
      </Form>
    </>
  );
};

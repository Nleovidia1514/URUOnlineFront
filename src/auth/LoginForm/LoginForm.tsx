import React, { useState, useRef, useCallback } from 'react';
import { Schema, Form, Button, Message } from 'rsuite';
import Input from '../../core/components/controls/Input';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Link } from 'react-router-dom';
import { loginUserAction } from '../../store/actions/auth.actions';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  identification: NumberType(
    'Por favor ingrese un numero de cedula valido.'
  ).isRequired('Este campo es obligatorio.'),
  password: StringType('Por favor ingrese una contraseña valida.')
    .isRequired('Este campo es obligatorio.')
    .minLength(6),
});

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.auth.loading);
  const [formValue, setFormValue] = useState({
    identification: '',
    password: '',
  });
  const error = useSelector((state: AppState) =>
    state.auth.error ? state.auth.error : null
  );
  let form = useRef<any>(null);
  const submitLogin = useCallback(() => {
    if (form.current.check()) {
      dispatch(loginUserAction(formValue));
    }
  }, [dispatch, form, formValue]);
  return (
    <>
      {error ? <Message showIcon type='error' description={error.message} /> : null}
      <Form
        ref={form}
        fluid
        onChange={(formValue) => setFormValue(formValue as any)}
        formValue={formValue}
        model={model}
      >
        <Input name='identification' label='Cedula' />
        <Input name='password' label='Contraseña' type='password' />
        <p>
          <Link to='/auth/register'>Aun no tienes una cuenta ?</Link>
        </p>
        <p>
          <Link to='/auth/passwordRecovery'>Olvidaste tu contraseña ?</Link>
        </p>
        <br></br>
        <Button
          loading={loading}
          appearance='primary'
          disabled={loading}
          onClick={submitLogin}
        >
          Iniciar Sesion
        </Button>
      </Form>
    </>
  );
};

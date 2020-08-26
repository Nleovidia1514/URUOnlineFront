import React, { useState, useRef, useCallback } from 'react';
import { Form, Button, Message, HelpBlock, Schema } from 'rsuite';
import Input from '../../core/components/controls/Input';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/reducers';
import {
  sendRecoveryCodeAction,
  submitRecoveryCodeAction,
  resetPasswordAction,
} from '../../store/actions/auth.actions';
import { Link } from 'react-router-dom';

const resetPassModel = Schema.Model({
  email: Schema.Types.StringType().isEmail().isRequired(),
  password: Schema.Types.StringType().isRequired('Este campo es obligatorio.'),
  verifyPassword: Schema.Types.StringType(
    'Por favor ingrese una contraseña valida.'
  )
    .isRequired('Este campo es obligatorio.')
    .minLength(6)
    .addRule((value, data) => {
      if (value !== data.password) return false;
      return true;
    }, 'Las contraseñas no coinciden.'),
});

export default () => {
  const loading = useSelector((state: AppState) => state.auth.loading);
  const error = useSelector((state: AppState) =>
    state.auth.error ? state.auth.error : null
  );
  const currentResetEmail = useSelector(
    (state: AppState) => state.auth.currentResetEmail
  );
  const message = useSelector((state: AppState) => state.auth.message);

  const dispatch = useDispatch();

  const [stage, setStage] = useState(1);

  const [sendCodeFormValue, setSendCodeFormValue] = useState({
    identification: '',
  });
  const [submitCodeFormValue, setSubmitCodeFormValue] = useState({
    email: '',
    code: '',
  });
  const [resetPassFormValue, setResetPassFormValue] = useState({
    email: '',
    password: '',
    verifyPassword: '',
  });

  let form = useRef<any>(null);

  const sendCode = useCallback(() => {
    if (sendCodeFormValue.identification !== '') {
      dispatch(sendRecoveryCodeAction(sendCodeFormValue.identification));
    }
  }, [dispatch, sendCodeFormValue]);

  const submitCode = useCallback(() => {
    if (submitCodeFormValue.code !== '') {
      dispatch(submitRecoveryCodeAction(submitCodeFormValue));
    }
  }, [submitCodeFormValue, dispatch]);

  const resetPassword = useCallback(() => {
    if (form.current.check()) {
      dispatch(resetPasswordAction(resetPassFormValue));
    }
  }, [form, dispatch, resetPassFormValue]);

  if (currentResetEmail && stage === 1) {
    setSubmitCodeFormValue({
      email: currentResetEmail,
      code: '',
    });
    setStage(2);
  } else if (message !== '' && stage === 2) {
    setResetPassFormValue({
      email: currentResetEmail,
      password: '',
      verifyPassword: '',
    });
    setStage(3);
  }

  switch (stage) {
    case 1:
      return (
        <>
          {error ? (
            <Message showIcon type='error' description={error.message} />
          ) : null}
          <Form
            ref={form}
            fluid
            onChange={(formValue) => setSendCodeFormValue(formValue as any)}
            formValue={sendCodeFormValue}
          >
            <Input name='identification' label='Cedula' />
            <HelpBlock>
              Ingresa tu cedula y enviaremos un codigo a tu correo electronico
              asociado que te servirá para recuperar tu contraseña.
            </HelpBlock>
            <br></br>
            <Button
              loading={loading}
              appearance='primary'
              disabled={loading}
              onClick={sendCode}
            >
              Solicitar Codigo
            </Button>
          </Form>
        </>
      );
    case 2:
      return (
        <>
          <Message
            showIcon
            type='warning'
            description='No recargues ni dejes esta pagina!'
          />
          {error ? (
            <Message showIcon type='error' description={error.message} />
          ) : null}
          <Form
            ref={form}
            fluid
            onChange={(formValue) => setSubmitCodeFormValue(formValue as any)}
            formValue={submitCodeFormValue}
          >
            <Input name='code' label='Codigo de recuperación' />

            <HelpBlock>
              Ingresa el codigo que te hemos enviado al correo para recuperar tu
              contraseña.
            </HelpBlock>
            <br></br>
            <Button
              loading={loading}
              appearance='primary'
              disabled={loading}
              onClick={submitCode}
            >
              Enviar Codigo
            </Button>
          </Form>
        </>
      );
    case 3:
      return (
        <>
          {message ? (
            <Message
              showIcon
              type='success'
              description={
                <p>
                  {message}
                  <br />
                  {message.includes('recuperado') ? <Link to="/auth/login">Ir a la pagina de login</Link> : null}
                </p>
              }
            />
          ) : null}
          {error ? (
            <Message showIcon type='error' description={error.message} />
          ) : null}
          <Form
            ref={form}
            fluid
            onChange={(formValue) => setResetPassFormValue(formValue as any)}
            formValue={resetPassFormValue}
            model={resetPassModel}
          >
            <Input name='password' label='Nueva contraseña' type='password' />
            <Input
              name='verifyPassword'
              label='Repetir nueva contraseña'
              type='password'
            />

            <HelpBlock>
              Ingresa el codigo que te hemos enviado al correo para recuperar tu
              contraseña.
            </HelpBlock>
            <br></br>
            <Button
              loading={loading}
              appearance='primary'
              disabled={loading}
              onClick={resetPassword}
            >
              Reestablecer contraseña
            </Button>
          </Form>
        </>
      );
    default:
      return <></>;
  }
};

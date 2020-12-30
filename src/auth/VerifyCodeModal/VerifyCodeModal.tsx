import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Message, Modal } from 'rsuite';
import { resetVerifiedAction, verifiyCodeAction } from '../../store/actions/auth.actions';
import { AppState } from '../../store/reducers';

export interface VerifyCodeModalProps {
  onCancel: () => void;
  onSuccessVerify: () => void;
  phoneNumber: string;
  show: boolean;
  title: string;
}

export default (props: VerifyCodeModalProps) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.auth.loading);
  const error = useSelector((state: AppState) => state.auth.error);
  const isVerified = useSelector((state: AppState) => state.auth.codeVerified);
  const { onSuccessVerify } = props;
  useEffect(() => {
    if (isVerified) {
      onSuccessVerify();
      dispatch(resetVerifiedAction(false));
    }
  }, [dispatch, isVerified, onSuccessVerify]);

  const [verificationCode, setVerificationCode] = useState('');

  const sendVerificationCode = useCallback(() => {
      dispatch(verifiyCodeAction({
        phoneNumber: props.phoneNumber,
        verificationCode: verificationCode
      }))
  }, [dispatch, verificationCode, props.phoneNumber]);

  const isValid = useCallback(() => {
    let valid = true;
    if (verificationCode.length !== 5) valid = false;
    else if (isNaN(parseInt(verificationCode))) valid = false;
    
    return valid;
  }, [verificationCode]);

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? <Message showIcon type='error' description={error.message} /> : null}
        <Input label='Codigo de verificación' onChange={setVerificationCode}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={sendVerificationCode} loading={loading} disabled={!isValid()}> 
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

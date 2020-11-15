import React, { PropsWithChildren, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'rsuite';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ConfirmModalMembers {
    open: () => any;
}

export default React.forwardRef<ConfirmModalMembers, PropsWithChildren<ConfirmModalProps>>((props, ref) => {
  const [show, setShow] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setShow(true),
  }));
  return (
    <Modal
      backdrop='static'
      show={show}
      onHide={() => setShow(false)}
      size='xs'
    >
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onConfirm} appearance='primary'>
          Confirmar
        </Button>
        <Button
          onClick={() => {
            setShow(false);
            props.onCancel && props.onCancel();
          }}
          appearance='subtle'
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'rsuite';
import { DeliveredExam } from '../../../../../core/models/DeliveredExam.model';
import ExamViewer from '../../../../../exams/ExamViewer/ExamViewer';
import { AppState } from '../../../../../store/reducers';

interface CreateDeliveredExamProps {
  show: boolean;
  close: () => void;
  deliveredExam?: DeliveredExam;
  readonly: boolean;
}

export default (props: CreateDeliveredExamProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const exam = useSelector((state: AppState) => state.exams.currentExam);
  const loading = useSelector((state: AppState) => state.exams.loading);
  const viewerRef = useRef<any>(null);

  const saveExam = useCallback(() => {
    setShowConfirm(false);
    viewerRef.current.sendExamAnswers();
    props.close();
  }, [props]);

  const { deliveredExam, readonly, show } = props;

  useEffect(() => {
    if (!deliveredExam || !readonly || !show) return;
    setTimeout(
      () => viewerRef.current.setExamAnswers(deliveredExam.answers),
      1000
    );
  }, [deliveredExam, readonly, show]);

  return (
    <Modal show={props.show} onHide={props.close} full backdrop='static'>
      <Modal.Header>
        <Modal.Title>{exam?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExamViewer fetchExam={false} ref={viewerRef} readonly={readonly} />
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
          <Modal.Header>
            <Modal.Title>Confirmar submision</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Icon
              icon='remind'
              style={{
                color: '#ffb300',
                fontSize: 24,
              }}
            />
            Una vez confirmada la submision no podra modificar sus respuestas.
          </Modal.Body>
          <Modal.Footer>
            <Button color='red' onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button color='blue' onClick={saveExam} loading={loading}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </Modal.Body>
      <Modal.Footer>
        <Button color='red' onClick={props.close}>
          {props.readonly ? 'Cerrar' : 'Cancelar'}
        </Button>
        {props.readonly ? null : (
          <Button color='blue' onClick={() => setShowConfirm(true)}>
            Confirmar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

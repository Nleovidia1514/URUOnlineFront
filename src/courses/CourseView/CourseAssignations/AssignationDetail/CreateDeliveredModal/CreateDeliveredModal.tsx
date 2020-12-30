import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ControlLabel, Input, Modal } from 'rsuite';
import FileUploader from '../../../../../core/components/controls/FileUploader';
import { DeliveredAssignation } from '../../../../../core/models/DeliveredAssignation.model';
import { Exam } from '../../../../../core/models/Exam.model';
import { createDeliveredAssignationAction } from '../../../../../store/actions/course.action';
import { setCurrentExamAction } from '../../../../../store/actions/exam.actions';
import { AppState } from '../../../../../store/reducers';
import CreateDeliveredExamModal from '../CreateDeliveredExamModal/CreateDeliveredExamModal';

export interface CreateDeliveredModalProps {
  show: boolean;
  close: () => void;
}

export default ({ show, close }: CreateDeliveredModalProps) => {
  const [createdAttachments, setCreatedAttachments] = useState([]);
  const [showExam, setShowExam] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const uploader = useRef<any>(null);
  const currentDeliveredExam = useSelector(
    (state: AppState) => state.exams.currentDeliveredExam
  );
  const assignation = useSelector(
    (state: AppState) => state.courses.currentAssignation
  );

  const handleUploadSuccess = useCallback(
    (newAttach) => {
      if (!newAttach) {
        dispatch(
          createDeliveredAssignationAction({
            comment,
            attachments: [],
            assignation: assignation?._id,
            exam: currentDeliveredExam ? currentDeliveredExam._id : '',
          } as DeliveredAssignation)
        );
        close();
      } else {
        const nextAttachs = [...createdAttachments, newAttach];
        setCreatedAttachments(nextAttachs);
        if (nextAttachs.length === uploader.current.state.fileList.length) {
          dispatch(
            createDeliveredAssignationAction({
              attachments: nextAttachs.map((x) => x._id),
              assignation: assignation?._id,
              comment,
              exam: currentDeliveredExam ? currentDeliveredExam._id : '',
            } as DeliveredAssignation)
          );
          close();
        }
      }
    },
    [
      dispatch,
      createdAttachments,
      close,
      comment,
      assignation,
      currentDeliveredExam,
    ]
  );

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header>
          <Modal.Title>Entrega de asignacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlLabel>Comentario</ControlLabel>
          <Input
            onChange={setComment}
            value={comment}
            type='textarea'
            style={{ marginBottom: 20 }}
          />
          {assignation?.exam ? (
            currentDeliveredExam ? (
              <Button
                onClick={() => {
                  dispatch(setCurrentExamAction(assignation.exam as Exam));
                  setShowExam(true);
                }}
                color='blue'
                block
                style={{ marginBottom: 20 }}
              >
                Ver respuestas
              </Button>
            ) : (
              <Button
                color='blue'
                style={{ marginBottom: 20 }}
                block
                onClick={() => {
                  dispatch(setCurrentExamAction(assignation.exam as Exam));
                  setShowExam(true);
                }}
              >
                Realizar examen
              </Button>
            )
          ) : null}
          <FileUploader
            action='/attachments/upload'
            onUploadSuccess={handleUploadSuccess}
            uploaderRef={uploader}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button color='red' onClick={close}>
            Cancelar
          </Button>
          <Button
            color='blue'
            onClick={() => {
              if (uploader.current.state.fileList.length > 0) {
                uploader.current.start();
              } else {
                handleUploadSuccess(null);
              }
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <CreateDeliveredExamModal
        show={showExam}
        close={() => setShowExam(false)}
        deliveredExam={currentDeliveredExam}
        readonly={!!currentDeliveredExam}
      />
    </>
  );
};

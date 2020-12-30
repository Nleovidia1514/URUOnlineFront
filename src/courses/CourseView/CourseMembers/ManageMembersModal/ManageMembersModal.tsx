import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Divider, List, Icon, Loader } from 'rsuite';
import UsersAutocomplete from '../../../../core/components/controls/UsersAutocomplete';
import { Course } from '../../../../core/models/Course.model';
import { User } from '../../../../core/models/User.model';
import {
  addCourseMemberAction,
  removeCourseMemberAction,
} from '../../../../store/actions/course.action';
import { AppState } from '../../../../store/reducers';
import Member from '../Member/Member';

import './ManageMembersModal.css';

export interface ManageMembersModalProps {
  show: boolean;
  close: () => void;
  course: Course | null;
}

export default ({ show, close, course }: ManageMembersModalProps) => {
  const loading = useSelector((state: AppState) => state.courses.loading);
  const dispatch = useDispatch();
  const handleUserAdd = useCallback(
    (user: User) => {
      dispatch(
        addCourseMemberAction({
          user,
          course: course as Course,
        })
      );
    },
    [dispatch, course]
  );

  const handleUserRemove = useCallback(
    (user: User) => {
      dispatch(
        removeCourseMemberAction({
          user,
          course: course as Course,
        })
      );
    },
    [dispatch, course]
  );

  return (
    <div className='modal-container'>
      <Modal overflow={true} backdrop={true} show={show} onHide={close}>
        <Modal.Header>
          <Modal.Title>Miembros del curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsersAutocomplete
            label='Agregar miembro'
            filter={(users: User[]) =>
              users.filter((x) => !course?.alumns?.find((a) => a._id === x._id) && x.type === 'alumn')
            }
            onSelect={handleUserAdd}
          />
          <Divider />
          <List style={{ display: loading ? 'none' : 'initial' }}>
            {course?.alumns?.map((x) => (
              <List.Item key={x._id}>
                <Member
                  user={x}
                  buttonIcon={<Icon icon='close' style={{ color: 'red' }} />}
                  onButtonClick={() => handleUserRemove(x)}
                ></Member>
              </List.Item>
            ))}
          </List>
          {loading ? <Loader /> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} appearance='primary'>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

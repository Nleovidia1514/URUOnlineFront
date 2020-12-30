import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Icon, IconButton, List } from 'rsuite';
import { User } from '../../../core/models/User.model';
import { AppState } from '../../../store/reducers';

import './CourseMembers.css';
import ManageMembersModal from './ManageMembersModal/ManageMembersModal';
import Member from './Member/Member';

export default () => {
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const [showMembersModal, setShowMembersModal] = useState(false);

  const closeMembersModal = useCallback(() => {
    setShowMembersModal(false);
  }, [setShowMembersModal]);

  return (
    <Container style={{ flex: 0 }}>
      <h3 style={{ color: 'white' }}>Profesor</h3>
      <Divider />
      <Member user={course?.professor as User}></Member>
      <br />
      <div>
        <h3 style={{ color: 'white', display: 'inline' }}>Alumnos </h3> &#8226;{' '}
        {course?.alumns?.length} estudiante (s)
        {currentUser?._id === (course?.professor as User)?._id ? (
          <>
            &nbsp; &#8226;{' '}
            <IconButton
              icon={<Icon icon='cog' />}
              circle
              onClick={() => setShowMembersModal(true)}
            />
          </>
        ) : null}
      </div>
      <br />
      {course?.alumns.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>Aun no hay alumnos en este curso</span>&nbsp;&nbsp;&nbsp;{' '}
          <Icon icon='frown-o' size='2x' />
        </div>
      ) : (
        <List>
          {course?.alumns?.map((x) => (
            <List.Item key={x._id}>
              <Member user={x}></Member>
            </List.Item>
          ))}
        </List>
      )}
      <ManageMembersModal
        show={showMembersModal}
        course={course}
        close={closeMembersModal}
      />
    </Container>
  );
};

import React, { useState } from 'react';
import { Avatar, Col, Container, Grid, IconButton } from 'rsuite';
import { User } from '../../../../core/models/User.model';

export interface MemberProps {
  user?: User;
  buttonIcon?: React.ReactElement;
  onButtonClick?: (args: any) => void;
}

export default ({ user, buttonIcon, onButtonClick }: MemberProps) => {
  const [avatarColor] = useState(
    '#' + Math.floor(Math.random() * 16777215).toString(16)
  );
  return (
    <Container style={{ width: '100%'}}>
      <Grid style={{ width: '100%' }}>
        <Col sm={2} md={2}>
          {user?.profileImg ? (
            <Avatar circle src={user?.profileImg}></Avatar>
          ) : (
            <Avatar circle style={{ background: avatarColor }}>
              {user?.name?.substr(0, 1).toUpperCase()}
              {user?.lastname?.substr(0, 1).toUpperCase()}
            </Avatar>
          )}
        </Col>
        <Col sm={1}/>
        <Col sm={19} md={19}>
          <h4>
            {user?.name} {user?.lastname}
          </h4>
        </Col>
        {buttonIcon ? (
          <Col sm={2} md={2}>
            <IconButton icon={buttonIcon} onClick={onButtonClick} />
          </Col>
        ) : null}
      </Grid>
    </Container>
  );
};

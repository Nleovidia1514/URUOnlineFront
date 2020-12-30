import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Panel, Tooltip, Whisper } from 'rsuite';
import { Course } from '../../../core/models/Course.model';
import { User } from '../../../core/models/User.model';

import './CourseSummary.css';

export interface CourseSummaryProps {
  course: Course;
}

export default ({ course }: CourseSummaryProps) => {
  const match = useRouteMatch();
  const history = useHistory();
  return (
    <Whisper
      placement='bottom'
      trigger='hover'
      speaker={<Tooltip>{course.name}</Tooltip>}
    >
      <Panel
        onClick={() => history.push(match.path + '/' + course._id + '/feed')}
        shaded
        bordered
        bodyFill
        style={{ display: 'inline-block', width: 300, cursor: 'pointer' }}
      >
        <img
          src={course.backgroundImg}
          height='240'
          alt='Course background'
        ></img>
        <Panel
          header={
            <h4
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 250,
              }}
            >
              {course.name}
            </h4>
          }
        >
          <p>Profesor: {(course.professor as User)?.name} {(course.professor as User)?.lastname}</p>
        </Panel>
      </Panel>
    </Whisper>
  );
};

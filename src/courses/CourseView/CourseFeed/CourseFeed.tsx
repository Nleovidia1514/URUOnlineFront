import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Input,
  List,
  Avatar,
  FlexboxGrid,
  Badge,
} from 'rsuite';
import { AppState } from '../../../store/reducers';
import moment from 'moment';
import { createCourseFeedAction } from '../../../store/actions/course.action';

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: AppState) => state.courses.loading);
  const course = useSelector((state: AppState) => state.courses.currentCourse);
  const [newComment, setNewComment] = useState('');

  const saveComment = useCallback(() => {
    dispatch(
      createCourseFeedAction({ course: course._id, content: newComment })
    );
  }, [dispatch, newComment, course]);

  return (
    <Container>
      <img
        style={{ width: '100%', height: 200, borderRadius: 5 }}
        alt='Banner'
        src={'https://image.freepik.com/free-photo/back-school-education-banner-background_8087-1192.jpg'}
      ></img>

      <div style={{ marginTop: 20 }}>
        <Input
          value={newComment}
          onChange={setNewComment}
          placeholder='Comparte algo con la clase...'
        ></Input>
        <Button
          color='blue'
          appearance='primary'
          style={{ marginTop: 20 }}
          block={false}
          onClick={saveComment}
          loading={loading}
        >
          Compartir
        </Button>
      </div>
      <Divider />
      <h3>Comentarios</h3>
      <List>
        {course?.feed
          .sort(
            (a, b) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          )
          .map((x) => (
            <List.Item key={x.createdDate}>
              <FlexboxGrid style={{ paddingLeft: '20px' }}>
                <FlexboxGrid.Item
                  colspan={4}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                  }}
                >
                  <Avatar src={x.owner?.profileImg} />
                  <span>
                    {x.owner?.name} - <Badge content={x.owner?.rating} />
                  </span>
                  <span>{moment(x.createdDate).fromNow()}</span>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  colspan={16}
                  style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                  }}
                >
                  <p>{x.content}</p>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
      </List>
    </Container>
  );
};

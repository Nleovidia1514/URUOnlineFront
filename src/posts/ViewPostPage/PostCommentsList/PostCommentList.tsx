import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'rsuite';
import { AppState } from '../../../store/reducers';
import PostComment from './PostComment/PostComment';

export default () => {
  const comments = useSelector(
    (state: AppState) => state.posts.currentPostComments
  );
  return (
    <Container>
      <h3>Comentarios</h3>
      {comments.map((com) => (
        <PostComment key={com._id} comment={com}></PostComment>
      ))}
    </Container>
  );
};

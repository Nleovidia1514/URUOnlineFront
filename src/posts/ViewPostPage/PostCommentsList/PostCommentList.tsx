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
    <>
      {comments.length >= 1 ? (
        <Container>
          <h4>Comentarios</h4>
          <br />
          {comments.map((com) => (
            <PostComment key={com._id} comment={com}></PostComment>
          ))}
        </Container>
      ) : <span>Nadie ha comentado aun, sé el primero en hacerlo!</span>}
    </>
  );
};

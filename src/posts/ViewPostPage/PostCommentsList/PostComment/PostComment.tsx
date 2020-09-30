import moment from 'moment';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Badge, Container, Divider, FlexboxGrid, Icon } from 'rsuite';
import { Comment } from '../../../../core/models/Comment.model';
import { postActions } from '../../../../store/actions';

interface PostCommentProps {
  comment: Comment;
}

export default ({ comment }: PostCommentProps) => {
  const dispatch = useDispatch();

  const upvote = useCallback(() => {
    dispatch(postActions.upvoteCommentAction(comment._id as string));
  }, [comment, dispatch]);

  const downvote = useCallback(() => {
    dispatch(postActions.downvoteCommentAction(comment._id as string));
  }, [comment, dispatch]);

  return (
    <Container>
      <FlexboxGrid>
        <FlexboxGrid.Item
          colspan={2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Icon
            icon='caret-up'
            style={{
              fontSize: '40px',
              cursor: 'pointer',
              color: comment?.voted ? 'cyan' : '',
            }}
            onClick={upvote}
          ></Icon>
          <h2>{comment?.votes}</h2>
          <Icon
            icon='caret-down'
            style={{ fontSize: '40px', cursor: 'pointer' }}
            onClick={downvote}
          ></Icon>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={18}>
          <div
            style={{ paddingTop: '20px' }}
            dangerouslySetInnerHTML={{
              __html: comment?.content ? comment?.content : '',
            }}
          ></div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Avatar src={comment.owner?.profileImg} />

          <span>
            {comment.owner?.name} - <Badge content={comment.owner?.rating} />
          </span>
          <span>{moment(comment.createdDate).fromNow()}</span>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Divider></Divider>
    </Container>
  );
};

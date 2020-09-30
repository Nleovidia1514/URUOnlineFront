import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Container,
  Divider,
  FlexboxGrid,
  Icon,
  Loader,
} from 'rsuite';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { postActions } from '../../store/actions';
import { AppState } from '../../store/reducers';
import AddComment from './AddComment/AddComment';
import PostCommentList from './PostCommentsList/PostCommentList';
import ViewPostHeader from './ViewPostHeader/ViewPostHeader';

export default () => {
  const { id } = useParams() as any;
  const dispatch = useDispatch();
  const { loading, currentPost: post } = useSelector(
    (state: AppState) => state.posts
  );
  useEffect(() => {
    dispatch(postActions.searchPostByIdAction(id));
    dispatch(postActions.searchCommentsAction(id));
  }, [id, dispatch]);

  const upvote = useCallback(() => {
    dispatch(postActions.upvotePostAction(id));
  }, [id, dispatch]);

  const downvote = useCallback(() => {
    dispatch(postActions.downvotePostAction(id));
  }, [id, dispatch]);

  return (
    <Container>
      {loading ? (
        <Loader content='Cargando Post...'></Loader>
      ) : (
        <>
          <ViewPostHeader post={post}></ViewPostHeader>
          <Divider></Divider>
          <FlexboxGrid>
            <FlexboxGridItem
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
                  color: post?.voted ? 'cyan' : '',
                }}
                onClick={upvote}
              ></Icon>
              <h2>{post?.votes}</h2>
              <Icon
                icon='caret-down'
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={downvote}
              ></Icon>
            </FlexboxGridItem>
            <FlexboxGridItem colspan={18}>
              <div
                dangerouslySetInnerHTML={{
                  __html: post?.content ? post?.content : '',
                }}
              ></div>
            </FlexboxGridItem>
            <FlexboxGrid.Item
              colspan={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Avatar src={post?.owner?.profileImg} />

              <span>
                {post?.owner?.name} - <Badge content={post?.owner?.rating} />
              </span>
              <span>{moment(post?.createdDate).fromNow()}</span>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider></Divider>
          <PostCommentList></PostCommentList>
          <AddComment></AddComment>
        </>
      )}
    </Container>
  );
};

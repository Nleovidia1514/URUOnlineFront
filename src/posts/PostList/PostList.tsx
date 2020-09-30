import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Content, Divider, List, Loader } from 'rsuite';
import { postActions } from '../../store/actions';
import { AppState } from '../../store/reducers';
import PostListFooter from './PostListFooter/PostListFooter';
import PostListHeader from './PostListHeader/PostListHeader';
import PostSummary from './PostSummary/PostSummary';

interface PostListProps {}

export default (props: RouteComponentProps<PostListProps>) => {
  const posts = useSelector((state: AppState) => state.posts.posts);
  const loading = useSelector((state: AppState) => state.posts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    let page = params.get('page');
    let filter = params.get('filter');
    if (!page) {
      props.history.push({
        pathname: props.location.pathname,
        search: '?page=1&filter=new',
      });
    } else {
      dispatch(
        postActions.searchPostsAction({
          page: parseInt(page),
          filter: filter as string,
        })
      );
    }
  }, [dispatch, props.location.search, props.location.pathname, props.history]);

  return (
    <div>
      <Container>
        <PostListHeader />
        <Divider />
        <Content>
          {loading ? (
            <Loader size='lg' content='Cargando...' />
          ) : (
            <List hover>
              {posts.map((item, index) => (
                <List.Item key={item['_id']} index={index}>
                  <PostSummary post={item} />
                </List.Item>
              ))}
            </List>
          )}
        </Content>
        <Divider></Divider>
        <PostListFooter></PostListFooter>
      </Container>
    </div>
  );
};

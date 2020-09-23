import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Content, Divider, Footer, List, Loader } from 'rsuite';
import { postActions } from '../../store/actions';
import { AppState } from '../../store/reducers';
import PostListHeader from './PostListHeader/PostListHeader';
import PostSummary from './PostSummary/PostSummary';

interface PostListProps {}

export default (props: RouteComponentProps<PostListProps>) => {
  const posts = useSelector((state: AppState) => state.posts.posts);
  const loading = useSelector((state: AppState) => state.posts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    let page = new URLSearchParams(props.location.search).get('page');
    if (!page) {
      props.history.push({
        pathname: props.location.pathname,
        search: '?page=1',
      });
    } else {
      dispatch(postActions.searchPostsAction(parseInt(page + '')));
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
        <Footer>Footer</Footer>
      </Container>
    </div>
  );
};

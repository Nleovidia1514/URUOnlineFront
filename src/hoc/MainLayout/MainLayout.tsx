import React from 'react';
import Navbar from './Navbar/Navbar';
import SideNav from './SideNav/SideNav';

import './MainLayout.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Redirect, Route, RouteComponentProps, Switch, useHistory } from 'react-router-dom';
import { Container, Sidebar } from 'rsuite';
import PostList from '../../posts/PostList/PostList';
import CreatePostPage from '../../posts/CreatePostPage/CreatePostPage';
import ViewPostPage from '../../posts/ViewPostPage/ViewPostPage';

interface MainLayoutProps {}

export default (props: RouteComponentProps<MainLayoutProps>) => {
  const history = useHistory();
  const handleSelect = (key: string) => {
    console.log(key)
    switch (key) {
      case '1':
        history.push('/')
        break;
    
      default:
        break;
    }
  };

  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  if (!currentUser) {
    history.push('/auth/login');
    return <></>;
  }
  return (
    <>
      <Navbar onSelect={handleSelect}></Navbar>
      <Container style={{ height: '92%' }}>
        <Sidebar style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <SideNav activeKey={'1'} handleSelect={handleSelect}></SideNav>
        </Sidebar>
        <Container style={{ padding: '20px', overflow: 'auto' }}>
          <Switch>
            <Route path={props.match.path + '/posts'} exact component={PostList}/>
            <Route path={props.match.path + '/posts/create'} exact component={CreatePostPage}/>
            <Route path={props.match.path + '/posts/:id'} exact component={ViewPostPage}/>
            <Route path={props.match.path + '/posts/:id/edit'} exact component={CreatePostPage}/>
            <Redirect from={props.match.path + '/'} to={props.match.path + '/posts'} />
          </Switch>
        </Container>
        <Container>ADS</Container>
      </Container>
    </>
  );
};

import React from 'react';
import Navbar from './Navbar/Navbar';
import SideNav from './SideNav/SideNav';

import './MainLayout.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Redirect, Route, RouteComponentProps, Switch, useHistory } from 'react-router-dom';
import { Container, Sidebar } from 'rsuite';
import PostList from '../../posts/PostList/PostList';

interface MainLayoutProps {}

export default (props: RouteComponentProps<MainLayoutProps>) => {
  const handleSelect = (key: string) => {};

  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  if (!currentUser) {
    const history = useHistory();
    history.push('/auth/login');
    return <></>;
  }
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Sidebar style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <SideNav activeKey={'1'} handleSelect={handleSelect}></SideNav>
        </Sidebar>
        <Container style={{ padding: '20px'}}>
          <Switch>
            <Route path={props.match.path + '/posts'} exact component={PostList}/>
            <Route path={props.match.path + '/posts/:id'} exact component={PostList}/>
            <Route path={props.match.path + '/posts/create'} exact component={PostList}/>
            <Redirect from={props.match.path + '/'} to={props.match.path + '/posts'} />
          </Switch>
        </Container>
        <Container>ADS</Container>
      </Container>
    </>
  );
};

import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import SideNav from './SideNav/SideNav';

import './MainLayout.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Sidebar } from 'rsuite';
import PostList from '../../posts/PostList/PostList';
import CreatePostPage from '../../posts/CreatePostPage/CreatePostPage';
import ViewPostPage from '../../posts/ViewPostPage/ViewPostPage';
import CoursesList from '../../courses/CoursesList/CoursesList';
import CourseView from '../../courses/CourseView/CourseView';
import ProfileView from '../../profile/ProfileView';
import ExamView from '../../exams/ExamView';

interface MainLayoutProps {}

export default (props: MainLayoutProps) => {
  const history = useHistory();
  const match = useRouteMatch();
  const [activeKey, setActiveKey] = useState('1');

  const handleSelect = (key: string) => {
    setActiveKey(key);
    switch (key) {
      case '1':
        history.push(match.path + '/');
        break;
      
      case '2':
        history.push(match.path + '/courses');
        break;
      
      case '3':
        history.push(match.path + '/exams/saved');
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
      <Container style={{ height: '89%' }}>
        <Sidebar style={{ flex: 0, minHeight: '100vh', width: 'auto' }}>
          <SideNav activeKey={activeKey} handleSelect={handleSelect}></SideNav>
        </Sidebar>
        <Container style={{ padding: '20px', overflow: 'auto' }}>
          <Switch>
            <Route path={match.path + '/posts'} exact component={PostList}/>
            <Route path={match.path + '/posts/create'} exact component={CreatePostPage}/>
            <Route path={match.path + '/posts/:id'} exact component={ViewPostPage}/>
            <Route path={match.path + '/posts/:id/edit'} exact component={CreatePostPage}/>
            <Route path={match.path + '/courses'} exact component={CoursesList} />
            <Route path={match.path + '/courses/:id'} component={CourseView} />
            <Route path={match.path + '/profile'} component={ProfileView} />
            <Route path={match.path + '/exams'} component={ExamView} />
            <Redirect from={match.path + '/'} to={match.path + '/posts'} />
          </Switch>
        </Container>
      </Container>
    </>
  );
};

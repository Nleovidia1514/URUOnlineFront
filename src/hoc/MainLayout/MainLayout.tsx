import React from 'react';
import Navbar from './Navbar/Navbar';
import SideNav from './SideNav/SideNav';

import './MainLayout.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { useHistory } from 'react-router-dom';

interface MainLayoutProps {}

export default (props: MainLayoutProps) => {
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
      <SideNav activeKey={'1'} handleSelect={handleSelect}></SideNav>
    </>
  );
};

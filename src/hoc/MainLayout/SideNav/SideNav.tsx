import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidenav, Nav, Icon } from 'rsuite';
import { AppState } from '../../../store/reducers';

import './SideNav.css';

interface SideNavProps {
  activeKey: string;
  handleSelect: (key: string) => void;
}

export default (props: SideNavProps) => {
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 1000) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1000) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    });
  }, []);
  return (
    <div style={{ height: '92%' }}>
      <Sidenav
        expanded={expanded}
        activeKey={props.activeKey}
        onSelect={props.handleSelect}
        className='sidenav'
      >
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey='1' icon={<Icon icon='dashboard' />}>
              Posts
            </Nav.Item>
            <Nav.Item eventKey='2' icon={<Icon icon='group' />}>
              Cursos
            </Nav.Item>
            {currentUser?.type === 'professor' ? (
              <Nav.Item eventKey='3' icon={<Icon icon='file-text' />}>
                Examenes
              </Nav.Item>
            ) : null}
            {/* <Dropdown
              placement='rightStart'
              eventKey='4'
              title='Settings'
              icon={<Icon icon='gear-circle' />}
            >
              <Dropdown.Item eventKey='4-1'>Applications</Dropdown.Item>
              <Dropdown.Item eventKey='4-2'>Channels</Dropdown.Item>
              <Dropdown.Item eventKey='4-3'>Versions</Dropdown.Item>
              <Dropdown.Menu eventKey='4-5' title='Custom Action'>
                <Dropdown.Item eventKey='4-5-1'>Action Name</Dropdown.Item>
                <Dropdown.Item eventKey='4-5-2'>Action Params</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
        </Sidenav.Body>
        {/* <IconButton
          className='collapse-btn'
          onClick={() => setExpanded(!expanded)}
          icon={
            <Icon
              icon={expanded ? 'angle-double-left' : 'angle-double-right'}
            />
          }
          size='lg'
        ></IconButton> */}
      </Sidenav>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Grid, Icon, Nav, Row } from 'rsuite';
import { getAllCourseAttachmentsAction } from '../../../store/actions/course.action';
import { AppState } from '../../../store/reducers';

const imageExtensions = ['png', 'jpg'];
const documentExtensions = ['pdf', 'docx', 'doc', '.rtf'];

export default () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('images');
  const currentAttachments = useSelector(
    (state: AppState) => state.courses.currentAttachments
  );
  const course = useSelector((state: AppState) => state.courses.currentCourse);

  useEffect(() => {
    if (!course) return;

    dispatch(getAllCourseAttachmentsAction(course._id));
  }, [dispatch, course]);

  let selectedAttachs = [];
  let component;
  switch (activeTab) {
    case 'images':
      selectedAttachs = currentAttachments.filter((x) =>
        imageExtensions.includes(x.extension.replace('.', ''))
      );
      component = selectedAttachs.map((x) => (
        <Col
          key={x._id}
          sm={8}
          style={{ height: 300, width: 300 }}
          onClick={() => window.open(x.url)}
        >
          <img
            src={x.url}
            alt={x.title}
            style={{ height: '100%', width: '100%', cursor: 'pointer' }}
          ></img>
        </Col>
      ));
      break;
    case 'documents':
      selectedAttachs = currentAttachments.filter((x) =>
        documentExtensions.includes(x.extension.replace('.', ''))
      );
      component = selectedAttachs.map((x) => (
        <Col
          key={x._id}
          sm={8}
          style={{
            padding: 20,
            borderRadius: 10,
            border: '1px solid gray',
            cursor: 'pointer',
          }}
          onClick={() => window.open(x.url)}
        >
          <Icon icon='file-text-o' size='4x' style={{ marginRight: 20 }} />
          <strong>{x.title}</strong>
        </Col>
      ));
      break;
    default:
      selectedAttachs = currentAttachments.filter(
        (x) =>
          !documentExtensions.includes(x.extension.replace('.', '')) &&
          !imageExtensions.includes(x.extension.replace('.', ''))
      );
      component = selectedAttachs.map((x) => (
        <Col
          key={x._id}
          sm={8}
          style={{
            padding: 20,
            borderRadius: 10,
            border: '1px solid gray',
            cursor: 'pointer',
          }}
          onClick={() => window.open(x.url)}
        >
          <Icon icon='file-o' size='4x' style={{ marginRight: 20 }} />
          <strong>{x.title}</strong>
        </Col>
      ));
      break;
  }

  return (
    <Container>
      <Nav
        justified
        appearance='tabs'
        activeKey={activeTab}
        onSelect={setActiveTab}
      >
        <Nav.Item key='images' eventKey='images'>
          Imagenes
        </Nav.Item>
        <Nav.Item key='documents' eventKey='documents'>
          Documentos
        </Nav.Item>
        <Nav.Item key='others' eventKey='others'>
          Otros
        </Nav.Item>
      </Nav>
      <Grid style={{ margin: 0, padding: 0 }}>
        <Row style={{ paddingTop: 20, paddingLeft: 0 }}>
          {selectedAttachs.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 600,
              }}
            >
              <span>No hay archivos que mostrar</span> &nbsp;&nbsp;&nbsp;
              <Icon icon='meh-o' size='2x' />
            </div>
          ) : (
            component
          )}
        </Row>
      </Grid>
    </Container>
  );
};

import React from 'react';
import { Col, Container, Grid, Icon, Row } from 'rsuite';
import moment from 'moment';
import { Assignation } from '../../../../core/models/Assignation.model';

export default ({ assignation }: { assignation: Assignation }) => {
  return (
    <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Grid>
        <Row>
          <Col md={16}>
            <Row>
              <Col md={24}>
                <h5>{assignation.title}</h5>
              </Col>
            </Row>
            <Row>
              <Col md={24}>{assignation.content}</Col>
            </Row>
          </Col>
          <Col md={3}>
            Para el dia:
            <br />
            {moment(assignation.dueDate).format('DD/MM/YYYY')}
          </Col>
          <Col md={3}>
            {assignation.attachments.length > 0 ? (
              <Icon icon='file-zip-o' size='5x'></Icon>
            ) : null}
          </Col>
          <Col md={2}>
            <Icon icon='chevron-right' size='4x'/>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

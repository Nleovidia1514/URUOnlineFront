import React from 'react';
import { Col, Container, Grid, Icon, IconButton, Row } from 'rsuite';
import Input from '../../../core/components/controls/Input';
import { ExamQuestion } from '../../../core/models/Exam.model';

interface ExamQuestionProps {
  question: ExamQuestion;
  editable: boolean;
  readonly: boolean;
}

export default ({ question, editable, readonly }: ExamQuestionProps) => {
  return (
    <Container style={{ marginBottom: 40 }}>
      <Grid>
        <Row>
          <Col sm={20}>
            <label>
              <h3>
                {question.order}. {question.label}
              </h3>
            </label>
          </Col>
          <Col sm={2} smOffset={2}>
            {editable ? (
              <div>
                <IconButton
                  icon={<Icon icon='pencil' style={{ color: 'white' }} />}
                  circle
                />

                <IconButton
                  icon={<Icon icon='trash-o' style={{ color: 'red' }} />}
                  circle
                />
              </div>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Input
            readonly={readonly}
            label='Respuesta'
            disableSearch={true}
            name={question.order.toString()}
            type={question.type as any}
            data={question.options.map((x) => ({ label: x, value: x }))}
          />
        </Row>
      </Grid>
    </Container>
  );
};

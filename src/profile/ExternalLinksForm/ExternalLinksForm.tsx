import React from 'react';
import { Col, Form, Grid, Row, Schema } from 'rsuite';
import Input from '../../core/components/controls/Input';

const { StringType } = Schema.Types;

const model = Schema.Model({
  githubLink: StringType('None'),
});

export interface ExternalLinksFormProps {
  value: {
    githubLink: string;
  };
  setValue: (formValue) => void;
}

export default ({ value, setValue }: ExternalLinksFormProps) => {
  return (
    <Form
      fluid
      onChange={(formValue) => setValue(formValue)}
      formValue={value}
      model={model}
    >
      <Grid fluid>
        <Row>
          <Col sm={24}>
            <Input name='githubLink' label='Github' />
          </Col>
        </Row>
      </Grid>
    </Form>
  );
};

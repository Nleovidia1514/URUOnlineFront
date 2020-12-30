import React from 'react';
import { Col, Form, Grid, Row, Schema } from 'rsuite';
import Input from '../../core/components/controls/Input';

const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isRequired('Este campo es obligatorio.')
    .isEmail('El formato no es correcto.')
    .maxLength(100),
  name: StringType()
    .isRequired('Este campo es obligatorio.')
    .minLength(3)
    .maxLength(100),
  lastname: StringType()
    .isRequired('Este campo es obligatorio.')
    .minLength(3)
    .maxLength(100),
  birthdate: DateType().isRequired('Este campo es obligatorio.'),
  phoneNumber: StringType('Por favor ingrese un numero valido')
    .isRequired('Este campo es obligatorio')
    .maxLength(100)
    .minLength(6)
    .addRule(
      (value: string) => value.startsWith('+'),
      'Por favor ingrese un codigo de pais valido.'
    ),
});

export interface BasicInfoFormProps {
  value: {
    email: string;
    name: string;
    lastname: string;
    birthdate: Date;
    phoneNumber: string;
  };
  setValue: (value) => void;
}

export default ({ value, setValue }: BasicInfoFormProps) => {
  return (
    <>
      <Form
        fluid
        onChange={(formValue) => setValue(formValue)}
        formValue={value}
        model={model}
      >
        <Grid fluid>
          <Row style={{ marginBottom: 20 }}>
            <Col sm={11}>
              <Input name='name' label='Nombre' />
            </Col>
            <Col smOffset={2} sm={11}>
              <Input name='lastname' label='Apellido' />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col sm={11}>
              <Input name='email' label='Correo electronico' />
            </Col>
            <Col smOffset={2} sm={11}>
              <Input name='birthdate' label='Fecha de nacimiento' type='date' />
            </Col>
          </Row>
          <Row>
            <Col sm={11}>
              <Input name='phoneNumber' label='Numero de telefono' />
            </Col>
          </Row>
        </Grid>
      </Form>
    </>
  );
};

import React, { useState } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  Icon,
  DatePicker,
} from 'rsuite';

interface InputProps {
  type?: 'text' | 'checkbox' | 'textarea' | 'select' | 'password' | 'date';
  label?: string;
  name: string;
  disabled?: boolean;
  readonly?: boolean;

  rows?: number;
  data?: any[];
}

export enum ControlTypesEnum {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  PASSWORD = 'password',
  DATE = 'date',
}

export default (props: InputProps) => {
  let component = null;
  switch (props.type) {
    case ControlTypesEnum.TEXTAREA:
      component = (
        <FormControl
          name={props.name}
          disabled={props.disabled}
          readOnly={props.disabled}
          rows={props.rows ? props.rows : 5}
          componentClass='textarea'
        />
      );
      break;
    case ControlTypesEnum.SELECT:
      component = (
        <FormControl
          name={props.name}
          data={props.data}
          disabled={props.disabled}
          readOnly={props.disabled}
        />
      );
      break;
    case ControlTypesEnum.PASSWORD:
      const [passwordVisible, setPasswordVisible] = useState(false);
      component = (
        <FormGroup>
          <InputGroup style={{ width: '100%' }} inside>
            <FormControl
              name={props.name}
              data={props.data}
              disabled={props.disabled}
              readOnly={props.disabled}
              type={passwordVisible ? 'text' : 'password'}
            />
            <InputGroup.Addon
              style={{ cursor: 'pointer' }}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <Icon icon={passwordVisible ? 'eye-slash' : 'eye'} />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      );
      break;
    case ControlTypesEnum.DATE:
      component = (
        <FormControl
          style={{ width: '100%' }}
          accepter={DatePicker}
          name={props.name}
          disabled={props.disabled}
          readOnly={props.disabled}
        />
      );
      break;
    case ControlTypesEnum.TEXT:
    default:
      component = (
        <FormControl
          name={props.name}
          disabled={props.disabled}
          readOnly={props.disabled}
        />
      );
      break;
  }
  return (
    <FormGroup>
      <ControlLabel>{props.label}</ControlLabel>
      {component}
    </FormGroup>
  );
};

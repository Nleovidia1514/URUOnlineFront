import React, { useState } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  Icon,
  DatePicker,
  InputNumber,
  SelectPicker,
  TagPicker,
} from 'rsuite';

interface InputProps {
  type?:
    | 'text'
    | 'checkbox'
    | 'textarea'
    | 'select'
    | 'password'
    | 'date'
    | 'number'
    | 'tags'
  label?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  max?: number;
  allowHour?: boolean;
  rows?: number;
  onChange?: (value: any) => void;
  disableSearch?: boolean;
  data?: any[];
  placeholder?: string;
}

export enum ControlTypesEnum {
  TEXT = 'text',
  TAGS = 'tags',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  PASSWORD = 'password',
  DATE = 'date',
  NUMBER = 'number',
}

export default (props: InputProps) => {
  let component = null;
  switch (props.type) {
    case ControlTypesEnum.TEXTAREA:
      component = (
        <FormControl
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readonly}
          style={{ width: '100%' }}
          rows={props.rows ? props.rows : 5}
          componentClass='textarea'
          placeholder={props.placeholder}
        />
      );
      break;
    case ControlTypesEnum.SELECT:
      component = (
        <FormControl
          name={props.name}
          data={props.data}
          style={{ width: '100%' }}
          accepter={SelectPicker}
          disabled={props.disabled}
          searchable={!props.disableSearch}
          readOnly={props.readonly}
          placeholder={props.placeholder}
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
              readOnly={props.readonly}
              type={passwordVisible ? 'text' : 'password'}
              placeholder={props.placeholder}
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
          format={props.allowHour ? 'DD/MM/YYYY HH:mm a' : 'DD/MM/YYYY'}
          showMeridian
          accepter={DatePicker}
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readonly}
          placeholder={props.placeholder}
        />
      );
      break;
    case ControlTypesEnum.NUMBER:
      component = (
        <FormControl
          style={{ width: '100%' }}
          accepter={InputNumber}
          min={props.min}
          max={props.max}
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readonly}
          placeholder={props.placeholder}
        />
      );
      break;
    case ControlTypesEnum.TAGS:
      component = (
        <FormControl
          style={{ width: '100%' }}
          accepter={TagPicker}
          data={props.data}
          creatable
          name={props.name}
          readOnly={props.readonly}
          placeholder={props.placeholder}
        />
      );
      break;
    case ControlTypesEnum.TEXT:
    default:
      component = (
        <FormControl
          style={{ width: '100%' }} 
          onChange={props.onChange}
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readonly}
          placeholder={props.placeholder}
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

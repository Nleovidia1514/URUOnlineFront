import React from 'react';
import { Table } from 'rsuite';
import { AlumnGrade } from '../../../../core/models/AlumnGrade.model';
import { CourseGrade } from '../../../../core/models/CourseGrade.model';

interface AlumnGradesTableProps {
  loading: boolean;
  grades: AlumnGrade[];
}

export default (props: AlumnGradesTableProps) => {
  return (
    <Table loading={props.loading} data={props.grades} height={500} width={1100}>
      <Table.Column width={500}>
        <Table.HeaderCell>Asignación</Table.HeaderCell>
        <Table.Cell>
          {(rowData: AlumnGrade) => {
            return (rowData.grade as CourseGrade).name;
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={200}>
        <Table.HeaderCell>Estado</Table.HeaderCell>
        <Table.Cell dataKey='state' />
      </Table.Column>

      <Table.Column width={200}>
        <Table.HeaderCell>Nota</Table.HeaderCell>
        <Table.Cell dataKey='value' />
      </Table.Column>
      <Table.Column>
        <Table.HeaderCell>Porcentaje</Table.HeaderCell>
        <Table.Cell>
          {(rowData: AlumnGrade) => {
            return (rowData.grade as CourseGrade).percentage + '%';
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

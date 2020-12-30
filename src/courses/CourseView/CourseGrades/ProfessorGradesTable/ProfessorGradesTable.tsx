import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'rsuite';
import { ProfessorGrade } from '../../../../core/models/ProfessorGrade.model';
import { AppState } from '../../../../store/reducers';

interface ProfessorGradesTableProps {
  loading: boolean;
  grades: ProfessorGrade[];
}

export default (props: ProfessorGradesTableProps) => {
  const courseGrades = useSelector(
    (state: AppState) => state.courses.currentCourseGrades
  );
  return (
    <Table
      loading={props.loading}
      data={props.grades.sort((a, b) => {
        if(a.alumn.name < b.alumn.name) { return -1; }
        if(a.alumn.name > b.alumn.name) { return 1; }
        else {
          if(a.alumn.lastname < b.alumn.lastname) { return -1; }
          if(a.alumn.lastname > b.alumn.lastname) { return 1; }
          return 0;
        }
      })}
      height={500}
      width={1000}
    >
      <Table.Column width={200}>
        <Table.HeaderCell>Alumno</Table.HeaderCell>
        <Table.Cell>
          {(rowData: ProfessorGrade) => `${rowData.alumn.name} ${rowData.alumn.lastname}`}
        </Table.Cell>
      </Table.Column>
      <Table.Column width={150}>
        <Table.HeaderCell>Cedula</Table.HeaderCell>
        <Table.Cell>
          {(rowData: ProfessorGrade) => rowData.alumn.identification}
        </Table.Cell>
      </Table.Column>

      {courseGrades.map((grade) => {
        return (
          <Table.Column width={200} key={grade._id} align='center'>
            <Table.HeaderCell>{grade.name} ({grade.percentage}%)</Table.HeaderCell>
            <Table.Cell>
              {(rowData: any) => rowData.grades[grade.name]}
            </Table.Cell>
          </Table.Column>
        );
      })}
    </Table>
  );
};

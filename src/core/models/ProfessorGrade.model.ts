import { User } from './User.model';

export interface ProfessorGrade {
  alumn: User;
  grades: { [key: string]: string };
}

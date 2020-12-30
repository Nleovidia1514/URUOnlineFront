import { Exam } from './Exam.model';
import { User } from './User.model';

export interface DeliveredExamAnswer {
  question: number;
  value: string;
}

export interface DeliveredExam {
  _id?: string;
  owner?: string | User;
  exam?: string | Exam;
  answers: DeliveredExamAnswer[];
}

import { User } from "./User.model";

export interface ExamQuestion {
    label: string;
    type: 'text' | 'select' | 'boolean' | string;
    options: string[];
    order: number;
    exam?: string;
}

export interface Exam {
    _id?: string;
    name: string;
    questions: ExamQuestion[];
    creator?: string | User;
}
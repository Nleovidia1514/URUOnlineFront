import { CourseGrade } from "./CourseGrade.model";
import { User } from "./User.model";

export interface AlumnGrade {
    _id?: string;
    alumn: string | User;
    grade: string | CourseGrade;
    value: string;
    state?: string;
}
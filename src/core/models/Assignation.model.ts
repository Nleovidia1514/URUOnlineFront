import { Attachment } from "./Attachment.model";
import { CourseGrade } from "./CourseGrade.model";
import { DeliveredAssignation } from "./DeliveredAssignation.model";
import { Exam } from "./Exam.model";

export interface Assignation {
    _id?: string;
    title: string;
    content: string;
    course: string;
    attachments: string[] | Attachment[];
    delivered: string[] | DeliveredAssignation[];
    dueDate: Date;
    grade: string | CourseGrade;
    exam?: string | Exam;
}
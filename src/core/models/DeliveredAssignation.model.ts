import { AlumnGrade } from "./AlumnGrade.model";
import { Attachment } from "./Attachment.model";
import { DeliveredExam } from "./DeliveredExam.model";
import { User } from "./User.model";

export interface DeliveredAssignation {
    _id?: string;
    attachments: Attachment[] | string[];
    owner?: User;
    comment: string;
    uploadedDate?: string;
    grade?: AlumnGrade;
    exam?: string | DeliveredExam;
}
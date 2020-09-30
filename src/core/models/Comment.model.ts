import { User } from "./User.model";

export interface Comment {
    _id?: string;
    postId: string;
    owner?: User;
    content: string;
    createdDate?: Date;
    votes?: number;
    voted?: boolean;
}
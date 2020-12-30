import { User } from "./User.model";

export interface CourseFeed {
    owner: User;
    content: string;
    createdDate?: string;
}

export interface Course {
    _id?: string;
    name: string;
    capacity: number;
    period: string;
    backgroundImg: string;
    professor: User | string;
    feed?: CourseFeed[];
    alumns?: User[];
}
import { User } from './User.model';

export interface Post {
  _id?: string;
  title: string;
  owner?: User;
  content: string;
  viewed?: number;
  createdDate?: Date;
  tags: string[];
  votes?: number;
  voted?: boolean;
  comments?: number;
}

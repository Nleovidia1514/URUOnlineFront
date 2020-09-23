import { Aggregator } from '../../core/models/Aggregator.model';
import { Post } from '../../core/models/Post.model';
import { postActions } from '../actions';
import { Action } from '../actions/action.model';

export interface PostsState {
  loading: boolean;
  posts: Post[];
}

const initialState: PostsState = {
  loading: false,
  posts: [],
};

export const postsReducer = (
  state: PostsState = initialState,
  action: Action
) => {
  switch (action.type) {
    case postActions.SEARCH_POSTS:
      return {
        ...state,
        loading: true,
      };
    case postActions.SEARCH_POSTS_SUCCESS:
      const payload: Aggregator<Post> = action.payload;
      return {
        ...state,
        loading: false,
        posts: payload.docs,
      };
    default:
      return state;
  }
};

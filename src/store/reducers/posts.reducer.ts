import { Aggregator } from '../../core/models/Aggregator.model';
import { Comment } from '../../core/models/Comment.model';
import { PagingInfo } from '../../core/models/PagingInfo.model';
import { Post } from '../../core/models/Post.model';
import { postActions } from '../actions';
import { Action } from '../actions/action.model';

export interface PostsState {
  loading: boolean;
  posts: Post[];
  currentPost: Post | null;
  currentPostComments: Comment[];
  paging: PagingInfo | null;
}

const initialState: PostsState = {
  loading: false,
  posts: [],
  currentPost: null,
  currentPostComments: [],
  paging: null,
};

export const postsReducer = (
  state: PostsState = initialState,
  action: Action
) => {
  switch (action.type) {
    case postActions.SEARCH_POSTS:
      return {
        ...state,
        posts: [],
        loading: true,
        paging: null,
      };
    case postActions.SEARCH_POSTS_SUCCESS:
      const payload: Aggregator<Post> = action.payload;
      return {
        ...state,
        loading: false,
        posts: payload.docs,
        paging: payload,
      };
    case postActions.SEARCH_POST_BY_ID:
      return {
        ...state,
        currentPost: null,
        loading: true,
      };
    case postActions.SEARCH_POST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPost: action.payload,
      };

    case postActions.CREATE_POST_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case postActions.UPVOTE_POST_SUCCESS:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          votes:
            typeof state.currentPost?.votes !== 'undefined'
              ? state.currentPost?.votes + 1
              : 0,
          voted: true,
        },
      };
    case postActions.DOWNVOTE_POST_SUCCESS:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          votes:
            typeof state.currentPost?.votes !== 'undefined'
              ? state.currentPost?.votes - 1
              : 0,
          voted: false,
        },
      };
    case postActions.SEARCH_COMMENTS:
      return {
        ...state,
        loading: true,
        currentPostComments: [],
      };
    case postActions.SEARCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPostComments: action.payload,
      };
    case postActions.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        currentPostComments: [
          ...state.currentPostComments,
          action.payload.payload,
        ],
      };
    case postActions.UPVOTE_COMMENT_SUCCESS:
      const index = state.currentPostComments.findIndex(
        (c) => c._id === action.payload.payload
      );
      const updatedComments = [...state.currentPostComments];
      updatedComments[index] = {
        ...updatedComments[index],
        votes: (updatedComments[index]?.votes as number) + 1,
        voted: true,
      };
      return {
        ...state,
        currentPostComments: updatedComments,
      };
    case postActions.DOWNVOTE_COMMENT_SUCCESS:
      const i = state.currentPostComments.findIndex(
        (c) => c._id === action.payload.payload
      );
      const updated = [...state.currentPostComments];
      updated[i] = {
        ...updated[i],
        votes: (updated[i]?.votes as number) - 1,
        voted: false,
      };
      console.log(i);
      console.log(updated);
      return {
        ...state,
        currentPostComments: updated,
      };
    default:
      return state;
  }
};

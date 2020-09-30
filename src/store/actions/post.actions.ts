import { Aggregator } from "../../core/models/Aggregator.model";
import { ApiError } from "../../core/models/ApiError.model";
import { ApiResponse } from "../../core/models/ApiResponse.model";
import { Comment } from "../../core/models/Comment.model";
import { Post } from "../../core/models/Post.model";
import { Action } from "./action.model";

export const SEARCH_POSTS = 'SEARCH_POSTS';
export const searchPostsAction = (payload: { page: number, filter: string } = { page: 1, filter: 'rated' }) => ({
  type: SEARCH_POSTS,
  payload,
});

export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const searchPostsSuccessAction = (payload: Aggregator<Post>) => ({
    type: SEARCH_POSTS_SUCCESS,
    payload
});

export const SEARCH_POST_BY_ID = 'SEARCH_POST_BY_ID';
export const searchPostByIdAction = (payload: string) => ({
    type: SEARCH_POST_BY_ID,
    payload
});

export const SEARCH_POST_BY_ID_SUCCESS = 'SEARCH_POST_BY_ID_SUCCESS';
export const searchPostByIdSuccessAction = (payload: Post) => ({
    type: SEARCH_POST_BY_ID_SUCCESS,
    payload
});

export const CREATE_POST = 'CREATE_POST';
export const createPostAction = (payload: Post) => ({
    type: CREATE_POST,
    payload
});

export const CREATE_POST_SUCESS = 'CREATE_POST_SUCCESS';
export const createPostSuccessAction = (payload: ApiResponse) => ({
    type: CREATE_POST_SUCESS,
    payload
});

export const UPDATE_POST = 'UPDATE_POST';
export const updatePostAction = (payload: Post) => ({
    type: UPDATE_POST,
    payload
});


export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCESS';
export const updatePostSuccessAction = (payload: ApiResponse) => ({
    type: UPDATE_POST_SUCCESS,
    payload
});

export const DELETE_POST = 'DELETE_POST';
export const deletePostAction = (payload: string) => ({
    type: DELETE_POST,
    payload
});

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const deletePostSuccessAction = (payload: ApiResponse) => ({
    type: DELETE_POST_SUCCESS,
    payload
});

export const UPVOTE_POST = 'UPVOTE_POST';
export const upvotePostAction = (payload: string) => ({
    type: UPVOTE_POST,
    payload
});

export const UPVOTE_POST_SUCCESS = 'UPVOTE_POST_SUCCESS';
export const upvotePostSuccessAction = (payload: ApiResponse) => ({
    type: UPVOTE_POST_SUCCESS,
    payload
});

export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const downvotePostAction = (payload: string) => ({
    type: DOWNVOTE_POST,
    payload
})

export const DOWNVOTE_POST_SUCCESS = 'DOWNVOTE_POST_SUCCESS';
export const downvotePostSuccessAction = (payload: ApiResponse) => ({
    type: DOWNVOTE_POST_SUCCESS,
    payload
});

export const SEARCH_COMMENTS = 'SEARCH_COMMENTS';
export const searchCommentsAction = (payload: string) => ({
    type: SEARCH_COMMENTS,
    payload
});

export const SEARCH_COMMENTS_SUCCESS = 'SEARCH_COMMENTS_SUCCESS';
export const searchCommentsSuccessAction = (payload: Comment[]) => ({
    type: SEARCH_COMMENTS_SUCCESS,
    payload
});

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const createCommentAction = (payload: Comment) => ({
    type: CREATE_COMMENT,
    payload
});

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const createCommentSuccessAction = (payload: ApiResponse) => ({
    type: CREATE_COMMENT_SUCCESS,
    payload
});

export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const upvoteCommentAction = (payload: string) => ({
    type: UPVOTE_COMMENT,
    payload
});

export const UPVOTE_COMMENT_SUCCESS = 'UPVOTE_COMMENT_SUCCESS';
export const upvoteCommentSuccessAction = (payload: ApiResponse) => ({
    type: UPVOTE_COMMENT_SUCCESS,
    payload
});

export const DOWNVOTE_COMMENT= 'DOWNVOTE_COMMENT';
export const downvoteCommentAction = (payload: string) => ({
    type: DOWNVOTE_COMMENT,
    payload
})

export const DOWNVOTE_COMMENT_SUCCESS = 'DOWNVOTE_COMMENT_SUCCESS';
export const downvoteCommentSuccessAction = (payload: ApiResponse) => ({
    type: DOWNVOTE_COMMENT_SUCCESS,
    payload
});

export const POST_ACTION_FAIL = 'POST_ACTION_FAIL';
export const postFailedAction = (error: ApiError): Action => ({
    type: POST_ACTION_FAIL,
    payload: error
});
import { Aggregator } from "../../core/models/Aggregator.model";
import { ApiError } from "../../core/models/ApiError.model";
import { ApiResponse } from "../../core/models/ApiResponse.model";
import { Post } from "../../core/models/Post.model";
import { Action } from "./action.model";

export const SEARCH_POSTS = 'SEARCH_POSTS';
export const searchPostsAction = (payload: number) => ({
  type: SEARCH_POSTS,
  payload,
});

export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const searchPostsSuccessAction = (payload: Aggregator<Post>) => ({
    type: SEARCH_POSTS_SUCCESS,
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

export const SEARCH_COMMENTS = 'SEARCH_COMMENTS';
export const searchCommentsAction = (payload: string) => ({
    type: SEARCH_COMMENTS,
    payload
});

export const SEARCH_COMMENTS_SUCCESS = 'SEARCH_COMMENTS_SUCCESS';
export const searchCommentsSuccessAction = (payload: string) => ({
    type: SEARCH_COMMENTS_SUCCESS,
    payload
});

export const POST_ACTION_FAIL = 'POST_ACTION_FAIL';
export const postFailedAction = (error: ApiError): Action => ({
    type: POST_ACTION_FAIL,
    payload: error
})
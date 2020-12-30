import { Attachment } from "../../core/models/Attachment.model";
import { Action } from "./action.model";

export const SET_REDIRECT = 'SET_REDIRECT';
export const setRedirectAction = (url: string): Action => ({
    type: SET_REDIRECT,
    payload: url
});

export const DELETE_ATTACHMENT = 'DELETE_ATTACHMENT';
export const deleteAttachmentAction = (payload: Attachment): Action => ({
    type: DELETE_ATTACHMENT,
    payload
});



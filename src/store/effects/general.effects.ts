import api from '../../core/axios';
import { Action } from '../actions/action.model';
import { DELETE_ATTACHMENT } from '../actions/core.actions';

export function* deleteAttachmentEffect(action: Action) {
  try {
    yield api.delete('/attachments', { data: action.payload });
  } catch (error) {}
}

const generalEffects = [
  {
    action: DELETE_ATTACHMENT,
    effect: deleteAttachmentEffect,
  },
];

export default generalEffects;

import { coreActions } from '../actions';
import { Action } from '../actions/action.model';

export interface GeneralState {
  redirectUrl: string;
}

const initialState: GeneralState = {
  redirectUrl: '',
};

export const generalReducer = (
  state: GeneralState = initialState,
  action: Action
) => {
  switch (action.type) {
    case coreActions.SET_REDIRECT:
      return {
        ...state,
        redirectUrl: action.payload,
      };
    default:
      return state;
  }
};

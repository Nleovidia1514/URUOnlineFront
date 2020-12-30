import { coreActions } from '../actions';
import { Action } from '../actions/action.model';

export interface GeneralState {
  redirectUrl: string;
  loading: boolean;
}

const initialState: GeneralState = {
  redirectUrl: '',
  loading: false,
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

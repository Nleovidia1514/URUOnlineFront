export const SET_REDIRECT = 'SET_REDIRECT';
export const setRedirectAction = (url: string) => ({
    type: SET_REDIRECT,
    payload: url
});
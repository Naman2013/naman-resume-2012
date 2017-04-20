export const SET_HELP_PAGE_ANCHOR = 'SET_HELP_PAGE_ANCHOR';

const setAnchor = anchor => ({
  type: SET_HELP_PAGE_ANCHOR,
  anchor,
});

export const setHelpPageAnchor = anchor => (dispatch) => {
  dispatch(setAnchor(anchor));
};
